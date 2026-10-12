import { generateRegistryRssFeed, type UrlResolverByItem } from "@wandry/analytics-sdk"
import { docs } from "#site/content"
import { app } from "@/config/app"
import { generateStaticRss } from "@/lib/static-rss"

export const dynamic = "force-static"

export async function GET() {
  if (process.env.CLOUDFLARE_PAGES_BUILD === "1") {
    return new Response(await generateStaticRss(docs), {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    })
  }
  const baseUrl = app.url

  const rssXml = await generateRegistryRssFeed({
    baseUrl,
    componentsUrl: ((item) => {
      const originalUrl = docs
        .map((i) => i.info.path)
        .find((i) => i?.split("/").at(-1)?.split(".")[0] === item.title)
        ?.replace(".mdx", "")
      return `/docs/${originalUrl?.toLowerCase()}`
    }) as UrlResolverByItem,

    excludeItemTypes: [
      "registry:style",
      "registry:block",
      "registry:page",
      "registry:hook",
      "registry:lib",
    ],
    rss: {
      title: "@intentui",
      description: "Subscribe to @intentui updates",
      link: app.url,
      pubDateStrategy: "githubLastEdit",
    },
    github: {
      owner: app.repo.url.split("/").slice(-2, -1)[0] || "intentui",
      repo: app.repo.url.split("/").slice(-1)[0] || "intentui",
      token: process.env.GITHUB_TOKEN,
    },
  })

  if (!rssXml) {
    return new Response("RSS feed not available", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    })
  }

  const rssXmlFiltered = rssXml.replace(/<item>[\s\S]*?<\/item>/g, (itemXml) => {
    const link = itemXml.match(/<link>([^<]+)<\/link>/)?.[1] ?? ""
    if (/\/items\/all?\/?$/.test(link)) return ""
    return itemXml
  })
  return new Response(rssXmlFiltered, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
