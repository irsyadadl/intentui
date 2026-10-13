"use client"

import { PageContainer } from "@/components/page-container"
import { buttonStyles } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { BookOpenIcon } from "@heroicons/react/24/outline"
import { BrandGithubIcon } from "@/components/icons/brand-github-icon"

export function Editor() {
  return (
    <section aria-labelledby="editor-title" className="border-page border-t">
      <PageContainer>
        <div className="border-page sm:border-x sm:px-6 py-12 sm:py-16">
          <div className="max-w-xl mx-auto text-center">
            <h2
              id="editor-title"
              className="max-w-xl font-medium text-3xl tracking-tight sm:text-4xl"
            >
              Meet Intent UI Editor{" "}
            </h2>
            <p className="mt-4 max-w-lg text-base text-muted-foreground leading-relaxed sm:text-lg">
              A fully open-source rich text editor powered by Lexical. Install it with a single
              command, customize it to fit your needs, and start building.
            </p>

            <pre className="mt-6 overflow-x-auto text-center text-sm/6">
              <code>
                npx shadcn@latest add{" "}
                <span className="bg-primary-subtle text-primary-subtle-foreground">
                  @intentui/editor
                </span>
              </code>
            </pre>
            <div className="mt-6 flex justify-center flex-wrap gap-2">
              <Link
                href="/editor"
                target="_blank"
                className={buttonStyles({ size: "lg", isCircle: true })}
              >
                <BookOpenIcon />
                Get started
              </Link>
              <Link
                href="https://github.com/intentui/editor"
                target="_blank"
                className={buttonStyles({ size: "lg", isCircle: true, intent: "secondary" })}
              >
                <BrandGithubIcon />
                View source
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
