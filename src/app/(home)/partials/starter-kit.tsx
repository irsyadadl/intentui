"use client"

import { IconBrandTanstack, IconBrandVite } from "@/components/docs/framework-guides"
import { BrandLaravelIcon } from "@/components/icons/brand-laravel-icon"
import { BrandNextjsIcon } from "@/components/icons/brand-nextjs-icon"
import { PageContainer } from "@/components/page-container"
import { Link } from "@/components/ui/link"
import { Text } from "@/components/ui/text"
import { SectionDescription, SectionHeader, SectionTitle } from "@/components/section-header"

export const starterKits = [
  {
    icon: BrandNextjsIcon,
    name: "Next.js",
    url: `/docs/getting-started/nextjs`,
    description: "A full-featured starter with routing, layouts, and authentication built in.",
  },
  {
    icon: BrandLaravelIcon,
    name: "Laravel",
    url: `/docs/getting-started/laravel`,
    description: "Server-driven starter with routing, auth, and front-end integration ready to go.",
  },
  {
    icon: IconBrandTanstack,
    name: "Tanstack Router",
    url: `/docs/getting-started/tanstack-router`,
    description: "Opinionated setup with routing, layouts, and auth, ready for modern apps.",
  },
  {
    icon: IconBrandVite,
    name: "Vite",
    url: `/docs/getting-started/vite`,
    description: "The simple way to start Vite with Intent UI installed.",
    label: "Starter Kit",
  },
]

export function StarterKit() {
  return (
    <>
      <div className="border-page border-y">
        <PageContainer>
          <SectionHeader>
            <SectionTitle>Starter kit</SectionTitle>
            <SectionDescription>
              A preconfigured project setup that includes everything you need to start building and
              shipping faster with Intent UI.
            </SectionDescription>
          </SectionHeader>
        </PageContainer>
      </div>
      <PageContainer>
        <div className="border-page border-x">
          <div className="grid grid-cols-1 divide-x divide-y divide-page *:p-6 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {starterKits.map((item) => (
              <Link
                className="flex flex-col gap-y-4 hover:bg-secondary/50"
                href={item.url}
                key={item.name}
              >
                <div className="flex gap-x-3">
                  <item.icon className="size-6 shrink-0" />
                  <span>{item.name}</span>
                </div>
                <Text>{item.description}</Text>
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </>
  )
}
