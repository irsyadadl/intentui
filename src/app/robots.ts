import type { MetadataRoute } from "next"
import { app } from "@/config/app"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${app.url}/sitemap.xml`,
  }
}
