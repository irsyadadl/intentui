import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"

const typeToCategoryMap: Record<string, string> = {
  "registry:component": "ui",
  "registry:block": "block",
  "registry:lib": "lib",
  "registry:hook": "hook",
  "registry:ui": "ui",
  "registry:page": "page",
  "registry:file": "file",
  "registry:style": "style",
  "registry:theme": "theme",
}

export const dynamic = "force-static"

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "public", "r")
  const params: { category: string; slug: string }[] = []
  for (const file of await readdir(dir)) {
    if (!file.endsWith(".json")) continue
    const item = JSON.parse(await readFile(path.join(dir, file), "utf8"))
    const category = typeToCategoryMap[item.type]
    if (!category || typeof item.name !== "string") continue
    const slug = item.name.startsWith(`${category}-`)
      ? item.name.slice(category.length + 1)
      : item.name
    params.push({ category, slug })
  }
  return params
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ category: string; slug: string }> }
) {
  const { category, slug } = await context.params
  const dir = path.join(process.cwd(), "public", "r")
  const files = await readdir(dir)

  for (const file of files) {
    if (!file.endsWith(".json")) continue

    const fullPath = path.join(dir, file)
    const content = await readFile(fullPath, "utf8")
    const json = JSON.parse(content)

    const type = json.type
    const mappedCategory = typeToCategoryMap[type]

    if (!mappedCategory) continue

    const inferredSlug = json.name?.startsWith(`${mappedCategory}-`)
      ? json.name.split("-").slice(1).join("-")
      : json.name

    if (mappedCategory === category && inferredSlug === slug) {
      return new NextResponse(content, {
        headers: { "Content-Type": "application/json" },
      })
    }
  }

  return new NextResponse("Not found", { status: 404 })
}
