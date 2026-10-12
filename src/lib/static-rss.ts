import { execFileSync } from "node:child_process"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { app } from "@/config/app"

const escapeXml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!
  )

export async function generateStaticRss(
  docs: { title: string; description?: string; info: { path: string } }[]
) {
  const registry = JSON.parse(await readFile(path.resolve("registry.json"), "utf8")) as {
    items: { name: string; type: string; files?: { path: string }[] }[]
  }
  const items = registry.items.flatMap((item) => {
    if (item.type !== "registry:ui" && item.type !== "registry:component") return []
    const doc = docs.find((doc) => path.basename(doc.info.path, ".mdx") === item.name)
    if (!doc) return []
    const url = `${app.url}/docs/${doc.info.path.replace(/\.mdx$/, "")}`
    let pubDate = ""
    try {
      const date = execFileSync(
        "git",
        [
          "log",
          "-1",
          "--format=%cI",
          "--",
          item.files?.[0]?.path || `src/content/docs/${doc.info.path}`,
        ],
        { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
      ).trim()
      if (date) pubDate = `<pubDate>${new Date(date).toUTCString()}</pubDate>`
    } catch {
      // Upload builds may have no Git checkout. RSS dates are optional.
    }
    return [
      `<item><title>${escapeXml(doc.title)}</title><link>${escapeXml(url)}</link><guid>${escapeXml(url)}</guid><description>${escapeXml(doc.description || "")}</description>${pubDate}</item>`,
    ]
  })
  if (!items.length) throw new Error("Static RSS has no component entries")
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>@intentui</title><link>${app.url}</link><description>Subscribe to @intentui updates</description>
<atom:link href="${app.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items.join("\n")}
</channel></rss>`
}
