"use client"

import { Button } from "@/components/ui/button"
import { TooltipTrigger, Tooltip } from "@/components/ui/tooltip"

export default function TooltipExample() {
  return (
    <TooltipTrigger>
      <Button intent="outline">Duplicate</Button>
      <Tooltip>
        <strong className="font-semibold">Duplicate project</strong>
        <p className="mt-1 max-w-2xs text-pretty text-muted-foreground text-sm">
          This will create a copy of the current project including all files and settings.
        </p>
      </Tooltip>
    </TooltipTrigger>
  )
}
