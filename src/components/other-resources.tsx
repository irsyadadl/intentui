"use client"

import { Link } from "@/components/ui/link"
import { buttonStyles } from "@/components/ui/button"
import { PageContainer } from "@/components/page-container"
import { SectionDescription, SectionHeader, SectionTitle } from "@/components/section-header"
import { tissueButton } from "@/lib/utils"

export function OtherResources() {
  return (
    <>
      <div className="border-page border-y">
        <PageContainer>
          <SectionHeader className="bg-background">
            <SectionTitle>More than just components.</SectionTitle>
            <SectionDescription>
              Take your projects further with ready-made blocks, templates, and a fully open-source
              editor. Everything you need to build more with Intent UI.
            </SectionDescription>
          </SectionHeader>
        </PageContainer>
      </div>
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 border-page border-x p-2 gap-2 bg-muted">
          <div className="p-6 sm:p-10 flex rounded-2xl bg-background border-page border flex-col gap-y-1.5">
            <SectionTitle level={3}>
              Launch faster with ready-made blocks and templates
            </SectionTitle>
            <SectionDescription className="max-w-none">
              Build modern web apps faster with 1000+ resources across components, blocks, patterns,
              templates, and starter kits.
            </SectionDescription>
            <div className="flex gap-x-2 mt-6">
              <Link
                className={tissueButton}
                href="https://design.intentui.com/blocks?utm_source=intentui.com&utm_medium=referral&utm_campaign=cta"
              >
                Browse blocks
              </Link>
              <Link
                className={buttonStyles({
                  size: "lg",
                  isCircle: true,
                  intent: "outline",
                })}
                href="https://design.intentui.com/templates?utm_source=intentui.com&utm_medium=referral&utm_campaign=cta"
              >
                Get templates
              </Link>
            </div>
          </div>
          <div className="p-6 sm:p-10 flex rounded-2xl bg-background border-page border flex-col gap-y-1.5">
            <SectionTitle level={3}>Meet Intent UI Editor</SectionTitle>
            <SectionDescription className="max-w-none">
              A fully open-source rich text editor powered by Lexical. Install it with a single
              command, customize it to fit your needs, and start building.
            </SectionDescription>
            <div className="flex gap-x-2 mt-6">
              <Link href="/editor" target="_blank" className={tissueButton}>
                Get started
              </Link>
              <Link
                href="https://github.com/intentui/editor"
                target="_blank"
                className={buttonStyles({ size: "lg", isCircle: true, intent: "outline" })}
              >
                View source
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  )
}
