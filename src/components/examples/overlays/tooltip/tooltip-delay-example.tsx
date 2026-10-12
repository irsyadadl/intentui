"use client"

import { BrandXIcon } from "@/components/icons/brand-x-icon"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"

export default function TooltipDelayDemo() {
  return (
    <div className="flex gap-2">
      <TooltipTrigger delay={0}>
        <Button aria-label="Follow me" size="sq-sm" intent="outline">
          <BrandXIcon />
        </Button>
        <Tooltip>Follow me @intentui</Tooltip>
      </TooltipTrigger>
    </div>
  )
}
