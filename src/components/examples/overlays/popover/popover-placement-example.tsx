"use client"

import { useRef, useState } from "react"
import type { TooltipProps } from "react-aria-components/Tooltip"
import { Button } from "@/components/ui/button"
import { Popover } from "@/components/ui/popover"

type Placement = Pick<TooltipProps, "placement">["placement"]
const placements: Placement[] = ["bottom", "top", "left", "start", "right", "end"]
function PlacementPopover({ placement }: { placement: Placement }) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onPress={() => setIsOpen(true)}
        className="mx-auto"
        size="sm"
        intent="outline"
      >
        {placement}
      </Button>
      <Popover
        triggerRef={triggerRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        aria-label={`${placement} popover`}
        className="p-4"
        placement={placement}
      >
        Popover shown at {placement}.
      </Popover>
    </>
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
