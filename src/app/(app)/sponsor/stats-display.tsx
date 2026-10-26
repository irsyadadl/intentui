"use client"

import { useState } from "react"
import { Text } from "@/components/ui/text"

type Range = "24h" | "7d" | "30d"

export function StatsDisplay({ pageviews }: { pageviews: Record<Range, number | null> }) {
  const [range, setRange] = useState<Range>("7d")
  const count = pageviews[range]

  return (
    <div>
      <div className="mb-2 text-5xl tabular-nums" aria-live="polite" aria-atomic="true">
        {count === null ? (
          <span className="text-muted-fg text-sm">Stats temporarily unavailable</span>
        ) : (
          new Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 2,
          })
            .format(count)
            .toLowerCase()
        )}
      </div>
      <Text>
        <span className="relative mr-2 inline-block">
          <select
            aria-label="Pageviews date range"
            className="field-sizing-content appearance-none rounded-full bg-muted py-1 pr-8 pl-2"
            name="stats-range"
            value={range}
            onChange={(event) => setRange(event.target.value as Range)}
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>{" "}
        pageviews
      </Text>
    </div>
  )
}
