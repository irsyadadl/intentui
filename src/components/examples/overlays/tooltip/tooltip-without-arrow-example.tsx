"use client"

import { Badge } from "@/components/ui/badge"
import { Description } from "@/components/ui/field"
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "react-aria-components/Button"

export default function TooltipWithoutArrowExample() {
  return (
    <TooltipTrigger>
      <Button aria-label="Fresh drop alert">
        <Badge isCircle>New</Badge>
      </Button>
      <Tooltip arrow={false}>
        <strong className="font-semibold">Fresh drop alert</strong> <br />
        <Description>Scope the newest addition to our stash.</Description>
      </Tooltip>
    </TooltipTrigger>
  )
}
