import { Blocks } from "@/app/(home)/partials/blocks"
import { Components } from "@/app/(home)/partials/components"
import { Cta } from "@/app/(home)/partials/cta"
import { StarterKit } from "@/app/(home)/partials/starter-kit"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { PageContainer } from "@/components/page-container"
import { createMetadata } from "@/lib/metadata"
import { Hero } from "./partials/hero"
import { OpenSource } from "./partials/open-source"
import { OtherResources } from "@/components/other-resources"

export const metadata = createMetadata({
  title: "Intent UI",
  description:
    "Copy and paste accessible React components built on React Aria and Tailwind CSS. 87+ production-ready components for Next.js and Laravel.",
  path: "/",
  image: null,
  keywords: [
    "react components",
    "ui library",
    "react aria",
    "tailwind css",
    "accessible components",
    "next.js ui",
    "laravel ui",
    "intent ui",
    "intentui",
  ],
})
export default function Page() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-clip">
      <Navigation />
      <div className="relative isolate overflow-hidden border-page border-b">
        <Hero />
      </div>
      <div className="border-page border-b">
        <Blocks />
      </div>
      <>
        <div className="border-page sm:border-x">
          <Components />
          <OtherResources />

          <StarterKit />
          <Cta />

          <div className="border-page border-t">
            <PageContainer>
              <div className="border-page border-x">
                <OpenSource />
              </div>
            </PageContainer>
          </div>
        </div>
      </>
      <Footer />
    </div>
  )
}
