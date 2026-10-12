"use client"

import type { TooltipProps } from "react-aria-components/Tooltip"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger } from "@/components/ui/popover"

type Placement = Pick<TooltipProps, "placement">["placement"]
const placements: Placement[] = ["bottom", "top", "left", "start", "right", "end"]
function PlacementPopover({ placement }: { placement: Placement }) {
  return (
    <PopoverTrigger>
      <Button className="mx-auto" size="sm" intent="outline">
        {placement}
      </Button>
      <Popover
        aria-labelledby=""
        aria-label={`${placement} popover`}
        className="p-4"
        placement={placement}
      >
        Popover shown at {placement}.
      </Popover>
    </PopoverTrigger>
  )
}

export default function PopoverPlacementDemo() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {placements.map((placement) => (
        <PlacementPopover key={placement} placement={placement} />
      ))}
    </div>
  )
}
