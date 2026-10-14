"use client"

import { PageContainer } from "@/components/page-container"
import { Link } from "@/components/ui/link"
import menus from "@/components-search.json"
import type { Component } from "@/types/search"
import { SectionDescription, SectionHeader, SectionTitle } from "@/components/section-header"

const components = menus[3] as Component
export function Components() {
  return (
    <>
      <div className="border-page border-b">
        <PageContainer>
          <SectionHeader className="bg-background">
            <SectionTitle>Components</SectionTitle>
            <SectionDescription>
              Browse a complete set of UI components, built for flexibility and ready to drop into
              your project.
            </SectionDescription>
          </SectionHeader>
        </PageContainer>
      </div>
      <PageContainer>
        <div className="border-page py-6 sm:border-x sm:p-6 bg-background">
          <div className="mask-b-from-80% sm:mask-b-from-80% max-h-120 sm:max-h-140">
            <div className="columns-2 gap-6 md:columns-3 lg:columns-4">
              {components?.children?.slice(1, 20).map((item) => (
                <div
                  className="mb-12 flex break-inside-avoid flex-col gap-y-2"
                  key={item.subsection}
                >
                  <h3 className="font-semibold text-foreground text-sm">{item?.subsection}</h3>
                  <ul>
                    {item?.children?.map((item) => (
                      <li key={item.slug}>
                        <Link
                          className="block py-2 text-muted-foreground text-sm hover:text-foreground focus:text-foreground"
                          href={item.slug}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
      <Link
        href="/components"
        className="group flex items-center justify-center border-page border-t text-xl"
      >
        <PageContainer className="w-full">
          <div className="w-full border-page relative bg-background border-x p-6 text-center group-hover:bg-muted">
            View all
          </div>
        </PageContainer>
      </Link>
    </>
  )
}
