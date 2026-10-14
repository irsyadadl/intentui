"use client"

import { BookOpenIcon, CubeIcon } from "@heroicons/react/24/outline"
import { PageContainer } from "@/components/page-container"
import { buttonStyles } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { app } from "@/config/app"
import { RotatingGradientBorder } from "@/components/rotating-gradient-border"
import { ChevronRightIcon } from "@heroicons/react/20/solid"

export function Hero() {
  return (
    <div>
      <PageContainer>
        <div className="border-page pt-6 pb-6 sm:border-x sm:p-6 sm:pt-32">
          <div className="text-left">
            <Link
              href="/blog/release-v4"
              className="group bg-background font-medium hover:bg-secondary relative isolate mb-2 rounded-full border px-2 py-1 text-sm shadow-xs inline-flex items-center gap-x-1.5"
            >
              Introducing Intent UI v4
              <RotatingGradientBorder />
              <ChevronRightIcon className="size-3.5 group-hover:translate-x-0.5 duration-300" />
            </Link>
            <h1 className="mt-4 mb-4 max-w-3xl pb-1 font-medium text-3xl text-foreground tracking-tight lg:mb-6 lg:text-5xl/14">
              Accessible React components to copy, customize, and make your own.
            </h1>
            <p className="block max-w-2xl text-base text-muted-foreground leading-relaxed md:leading-relaxed lg:text-xl [&_strong]:font-normal [&_strong]:text-foreground">
              <strong className="text-white">{app.name}</strong> is a set of accessible React
              components built with{" "}
              <strong className="text-foreground">React aria components</strong>, designed for fast
              copy and paste customization, and styled with{" "}
              <strong className="text-foreground">Tailwind CSS</strong>.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-x-2">
            <Link
              className={buttonStyles({
                size: "lg",
                isCircle: true,
                className: "inset-ring-white/10 shadow-none",
              })}
              href="/docs/getting-started/installation"
            >
              <BookOpenIcon />
              Get started
            </Link>
            <Link
              className={buttonStyles({
                size: "lg",
                isCircle: true,
                intent: "secondary",
                className: "shadow-none",
              })}
              href="/components"
            >
              <CubeIcon />
              Components
            </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
