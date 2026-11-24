"use client"

import { cn } from "cn"
import Image from "next/image"

export function Ads({ className }: { className?: string }) {
  return (
    <div className={cn("not-typeset", className)}>
      <a
        target="_blank"
        href="https://design.intentui.com/pricing?utm_source=intentui.com&utm_medium=docs&utm_campaign=black_friday_2026"
        className="not-typeset block border-page border-t bg-blue-600/20"
        rel="noopener"
      >
        <Image
          loading="eager"
          className="size-full"
          width="512"
          height="512"
          src="/images/ads/ads-design.png"
          alt="Design"
        />
      </a>
    </div>
  )
}
