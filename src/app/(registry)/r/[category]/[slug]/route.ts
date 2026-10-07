import { NextResponse } from "next/server"

const categories = new Set(["ui", "block", "lib", "hook", "page", "file", "style", "theme"])

export async function GET(
  req: Request,
  context: { params: Promise<{ category: string; slug: string }> },
) {
  const { category, slug } = await context.params
  if (!categories.has(category) || !/^[a-z0-9-]+$/.test(slug)) {
    return new NextResponse("Not found", { status: 404 })
  }

  const name = category === "style" || category === "theme" ? slug : `${category}-${slug}`
  return NextResponse.redirect(new URL(`/r/${name}.json`, req.url))
}
