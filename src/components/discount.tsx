"use client"

import { useSelectedLayoutSegment } from "next/navigation"
import { useEffect } from "react"
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

  useEffect(() => {
    if (isBlockPreview) return

    const timeout = window.setTimeout(() => {
      try {
        const dismissedUntil = Number(window.localStorage.getItem(DISCOUNT_DISMISSED_UNTIL_KEY))
        if (Date.now() < dismissedUntil) return
      } catch {}

      toast.custom(
        () => (
          <Note className="rounded-xl bg-background">
            <strong>Black Friday</strong>
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
    }, 2_000)

    return () => {
      window.clearTimeout(timeout)
      toast.dismiss(DISCOUNT_TOAST_ID)
    }
  }, [isBlockPreview])

  if (isBlockPreview) return null

  return (
    <a
      href={`${PRICING_URL}&utm_content=top_banner`}
      className="block w-full border-muted-foreground/10 border-b bg-muted px-3 py-2 text-center text-sm/6 text-pretty hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:py-3"
      onClick={dismissDiscountToast}
    >
      Black Friday is here! {DISCOUNT_COPY}{" "}
      <span className="whitespace-nowrap">
        <code className="font-bold">{DISCOUNT_CODE}</code>.
      </span>
    </a>
  )
}
