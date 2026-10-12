"use client"

import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"

export default function TooltipIntentExample() {
  return (
    <TooltipTrigger>
      <Button aria-label="More information" intent="outline" size="sq-sm">
        <InformationCircleIcon />
      </Button>
      <Tooltip inverse>
        <div className="relative">
          <strong className="font-semibold">Attention</strong>
          <p>This is a warning message.</p>
        </div>
      </Tooltip>
    </TooltipTrigger>
  )
}
