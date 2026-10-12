import { copyFile, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises"
import path from "node:path"

async function main() {
  // Read the original routing rules; Next.js cannot apply them to a static export.
  process.env.CLOUDFLARE_PAGES_BUILD = "0"
  const { default: nextConfig } = await import("../../next.config.mjs")
  const outDir = path.resolve("out")

  async function walk(dir: string): Promise<string[]> {
    const entries = await readdir(dir, { withFileTypes: true })
    const files = await Promise.all(
      entries.map((entry) => {
        const filename = path.join(dir, entry.name)
        return entry.isDirectory() ? walk(filename) : [filename]
      })
    )
    return files.flat()
  }

  // Keep /docs/<slug>.md URLs as real files rather than a wildcard rewrite.
  for (const file of await walk(path.join(outDir, "llm"))) {
    if (file.endsWith(".meta") || file.endsWith(".html") || file.endsWith(".txt")) continue
    const target = path.join(outDir, "docs", `${path.relative(path.join(outDir, "llm"), file)}.md`)
    await mkdir(path.dirname(target), { recursive: true })
    await copyFile(file, target)
  }

  const redirects = (await nextConfig.redirects!())
    .sort((a, b) => Number(a.source.includes("*")) - Number(b.source.includes("*")))
    .map((rule) => {
      const source = rule.source.replace(/:[\w]+\*/g, "*")
      const destination = rule.destination.replace(/:[\w]+\*/g, ":splat")
      return `${source} ${destination} ${rule.permanent ? 308 : 307}`
    })

  const rewrites = (await nextConfig.rewrites!()) as { source: string; destination: string }[]
  for (const rule of rewrites) {
    if (rule.source.endsWith(".md")) continue
    // Pages rewrites run before files. A /r/:slug rewrite would also capture
    // /r/button.json and rewrite it to /r/button.json.json, so create aliases instead.
    if (rule.destination === "/r/:slug.json") {
      for (const filename of await readdir(path.join(outDir, "r"))) {
        if (!filename.endsWith(".json")) continue
        const slug = filename.slice(0, -5)
        const target = path.join(outDir, rule.source.replace(":slug", slug))
        await mkdir(path.dirname(target), { recursive: true })
        await copyFile(path.join(outDir, "r", filename), target)
      }
    } else {
      throw new Error(`Unsupported static rewrite: ${rule.source}`)
    }
  }
  await writeFile(path.join(outDir, "_redirects"), `${redirects.join("\n")}\n`)
  await writeFile(
    path.join(outDir, "_headers"),
    "/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n/r/*\n  Content-Type: application/json; charset=utf-8\n  Access-Control-Allow-Origin: *\n/registry/*\n  Access-Control-Allow-Origin: *\n/llm/*\n  Content-Type: text/markdown; charset=utf-8\n/og\n  Content-Type: image/png\n/rss.xml\n  Content-Type: application/rss+xml; charset=utf-8\n"
  )

  // A top-level 404.html prevents Pages from treating this site as a SPA.
  await stat(path.join(outDir, "404.html"))
  const files = await walk(outDir)
  if (files.length > 20_000)
    throw new Error(`Pages Free allows 20,000 files; found ${files.length}`)
  for (const file of files) {
    if ((await stat(file)).size > 25 * 1024 * 1024) {
      throw new Error(`Pages asset exceeds 25 MiB: ${path.relative(outDir, file)}`)
    }
  }
  await readFile(path.join(outDir, "index.html"))
  console.log(`Cloudflare Pages export ready: ${files.length} files, no Worker required.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
