"use client"

import { useSelectedLayoutSegment } from "next/navigation"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { Button, buttonStyles } from "@/components/ui/button"
import { Note } from "@/components/ui/note"
import { Code } from "@/components/ui/text"

const PRICING_URL =
  "https://design.intentui.com/pricing?utm_source=intentui.com&utm_medium=referral&utm_campaign=black_friday"
const DISCOUNT_CODE = "UI2026"
const DISCOUNT_COPY = "Get 40% off all licenses with code"
const DISCOUNT_TOAST_ID = "intentui-design-discount"
const DISCOUNT_DISMISSED_UNTIL_KEY = "intentui-black-friday-dismissed-until"
const DISCOUNT_DISMISS_DURATION_MS = 5 * 24 * 60 * 60 * 1000

function dismissDiscountToast() {
  try {
    window.localStorage.setItem(
      DISCOUNT_DISMISSED_UNTIL_KEY,
      String(Date.now() + DISCOUNT_DISMISS_DURATION_MS)
    )
  } catch {}

  toast.dismiss(DISCOUNT_TOAST_ID)
}

export function DiscountBanner() {
  const isBlockPreview = useSelectedLayoutSegment() === "pre-blocks"
  const bannerRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const banner = bannerRef.current
    if (isBlockPreview || !banner) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry || entry.isIntersecting || entry.boundingClientRect.bottom > 0) {
        toast.dismiss(DISCOUNT_TOAST_ID)
        return
      }

      try {
        const dismissedUntil = Number(window.localStorage.getItem(DISCOUNT_DISMISSED_UNTIL_KEY))
        if (Date.now() < dismissedUntil) return
      } catch {}

      toast.custom(
        () => (
          <Note className="rounded-xl bg-background">
            <div className="mb-2 flex items-center gap-x-1">
              <AppDiscountIcon className="size-4 shrink-0 rotate-6" />
              <strong>Black friday</strong>
            </div>
            <p>
              {DISCOUNT_COPY} <Code className="text-foreground">{DISCOUNT_CODE}</Code>.
            </p>
            <div className="mt-4 flex items-center gap-x-1">
              <a
                href={`${PRICING_URL}&utm_content=popup`}
                className={buttonStyles({
                  intent: "primary",
                  size: "sm",
                  isCircle: true,
                  className:
                    "dark:border-white/10 bg-foreground dark:bg-zinc-700 dark:pressed:bg-zinc-600 dark:hover:bg-zinc-600 dark:text-white hover:bg-foreground/90 pressed:bg-foreground/80 text-background",
                })}
                onClick={dismissDiscountToast}
              >
                Upgrade now
              </a>
              <Button isCircle intent="plain" size="sm" onPress={dismissDiscountToast}>
                Dismiss
              </Button>
            </div>
          </Note>
        ),
        { id: DISCOUNT_TOAST_ID, duration: Infinity, position: "bottom-center" }
      )
    })
    observer.observe(banner)

    return () => {
      observer.disconnect()
      toast.dismiss(DISCOUNT_TOAST_ID)
    }
  }, [isBlockPreview])

  if (isBlockPreview) return null

  return (
    <a
      ref={bannerRef}
      href={`${PRICING_URL}&utm_content=top_banner`}
      className="text-center text-pretty md:flex md:items-center md:justify-center md:gap-x-2 w-full border-muted-foreground/10 border-b bg-background px-3 py-2 text-sm/6 hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:py-3"
      onClick={dismissDiscountToast}
    >
      <AppDiscountIcon className="hidden size-5 rotate-6 md:block" />
      Black Friday is here! {DISCOUNT_COPY}{" "}
      <span className="whitespace-nowrap">
        <code className="font-bold">{DISCOUNT_CODE}</code>.
      </span>
    </a>
  )
}

export function AppDiscountIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 2C5.23122 2 4 3.23122 4 4.75V21.25C4 21.544 4.17175 21.8108 4.43931 21.9326C4.70687 22.0544 5.02091 22.0086 5.24259 21.8156L7.30756 20.017L9.14606 21.7899C9.4366 22.07 9.89674 22.07 10.1873 21.7899L12 20.0419L13.8127 21.7899C14.1033 22.07 14.5634 22.07 14.8539 21.7899L16.6924 20.017L18.7574 21.8156C18.9791 22.0086 19.2931 22.0544 19.5607 21.9326C19.8283 21.8108 20 21.544 20 21.25V4.75C20 3.23122 18.7688 2 17.25 2H6.75ZM15.792 8.28033C16.0849 7.98744 16.0849 7.51256 15.792 7.21967C15.4992 6.92678 15.0243 6.92678 14.7314 7.21967L8.23139 13.7197C7.9385 14.0126 7.9385 14.4874 8.23139 14.7803C8.52428 15.0732 8.99916 15.0732 9.29205 14.7803L15.792 8.28033ZM9 9C8.44772 9 8 8.55228 8 8C8 7.44772 8.44772 7 9 7C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9ZM14 14C14 14.5523 14.4477 15 15 15C15.5523 15 16 14.5523 16 14C16 13.4477 15.5523 13 15 13C14.4477 13 14 13.4477 14 14Z"
        fill="currentColor"
      />
    </svg>
  )
}
