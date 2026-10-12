import { notFound, redirect } from "next/navigation"
import { docs } from "#site/content"

export function generateStaticParams() {
  return Array.from(
    new Set(
      docs.map((doc) =>
        doc.info.path
          .split("/")
          .at(-1)
          ?.replace(/\.mdx$/, "")
      )
    )
  )
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page(props: PageProps) {
  const params = await props.params

  const originalUrl = docs
    .map((i) => i.info.path)
    .find((i) => i?.split("/").at(-1)?.split(".")[0] === params.slug)
    ?.replace(".mdx", "")

  if (!originalUrl) {
    notFound()
  }

  return redirect(`/docs/${originalUrl.toLowerCase()}`)
}
