"use client"

import { Link } from "@/components/ui/link"
import { tissueButton } from "@/lib/utils"
import { SectionDescription, SectionTitle } from "@/components/section-header"

export function Cta() {
  return (
    <section>
      <SectionTitle>Get your site featured</SectionTitle>
      <SectionDescription className="mt-2 max-w-lg">
        Showcase your product to the world and let people discover what you built with Intent UI.
      </SectionDescription>
      <div className="mt-6">
        <Link className={tissueButton} href="/sponsor">
          Get featured{" "}
        </Link>
      </div>
    </section>
  )
}
