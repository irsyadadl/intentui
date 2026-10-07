import { createMDX } from "fumadocs-mdx/next"
const withMDX = createMDX()
/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // devIndicators: false,
  experimental: {
    reactCompiler: true,
  },
  async redirects() {
    return [
      {
        source: "/twitter-image.png",
        destination: "/opengraph-image.png",
        permanent: true,
      },
      {
        source: "/",
        destination: "/docs/getting-started/introduction",
        permanent: true,
      },
      {
        source: "/icons",
        destination: "https://intentui.com/icons",
        permanent: true,
      },
      {
        source: "/colors",
        destination: "https://intentui.com/colors",
        permanent: true,
      },
      {
        source: "/showcase",
        destination: "https://intentui.com/showcase",
        permanent: true,
      },
      {
        source: "/docs/components/layouts/aside",
        destination: "/docs/components/layouts/sidebar",
        permanent: true,
      },
      {
        source: "/docs/components/charts/setup",
        destination: "/docs/components/charts/area-chart",
        permanent: true,
      },
      {
        source: "/docs/components/surfaces/chart",
        destination: "/docs/components/charts/area-chart",
        permanent: true,
      },
      {
        source: "/docs/components/collections/accordion",
        destination: "/docs/components/navigation/disclosure-group",
        permanent: true,
      },
    ]
  },
}

export default withMDX(config)
