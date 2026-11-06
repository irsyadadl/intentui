"use client"

import { ProgressCircle } from "@/components/ui/progress-circle"

export default function ProgressCircleColorDemo() {
  return (
    <div className="flex gap-2">
      <ProgressCircle aria-label="Loading" isIndeterminate className="text-red-500" />
      <ProgressCircle aria-label="Loading" isIndeterminate className="text-blue-500" />
      <ProgressCircle aria-label="Loading" isIndeterminate className="text-warning" />
    </div>
  )
}
