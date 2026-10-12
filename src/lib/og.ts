export function ogImage(params: { title: string; description?: string }): string {
  if (process.env.CLOUDFLARE_PAGES_BUILD === "1") return "/images/opengraph-image.png"
  const title = params.title.trim()
  const normalizedTitle = title ? title[0].toUpperCase() + title.slice(1).toLowerCase() : ""

  const search = new URLSearchParams({ title: normalizedTitle })

  if (params.description) {
    const s = params.description.trim()
    const i = s.indexOf(".")
    const description = (i === -1 ? s : s.slice(0, i + 1)).trim()
    if (description) search.set("description", description)
  }

  return `/og?${search.toString()}`
}
