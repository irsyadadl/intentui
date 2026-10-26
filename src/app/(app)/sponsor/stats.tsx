import { app } from "@/config/app"
import { unstable_cache } from "next/cache"
import { StatsDisplay } from "./stats-display"

async function getPageviews(range: "24h" | "7d" | "30d"): Promise<number | null> {
  const apiKey = process.env.ODS

  if (!apiKey) return null

  try {
    const response = await fetch("https://api.onedollarstats.com/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        site_id: new URL(app.url).hostname,
        metrics: ["pageviews"],
        date_range:
          range === "24h"
            ? [new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), new Date().toISOString()]
            : range,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) return null

    const data = (await response.json()) as { results?: { metrics?: unknown[] }[] }
    const pageviews = data.results?.[0]?.metrics?.[0]

    return typeof pageviews === "number" && Number.isInteger(pageviews) && pageviews >= 0
      ? pageviews
      : null
  } catch {
    return null
  }
}

const getCachedPageviews = unstable_cache(getPageviews, ["sponsor-pageviews"], {
  revalidate: 3600,
})

export async function Stats() {
  const [day, week, month] = await Promise.all([
    getCachedPageviews("24h"),
    getCachedPageviews("7d"),
    getCachedPageviews("30d"),
  ])

  return <StatsDisplay pageviews={{ "24h": day, "7d": week, "30d": month }} />
}
