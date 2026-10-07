"use client"

import { useRef, useState } from "react"
import { BellIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { Popover } from "@/components/ui/popover"

export default function PopoverArrowDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button
        aria-label="Notifications"
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onPress={() => setIsOpen(true)}
        intent="outline"
        size="sq-sm"
      >
        <BellIcon />
      </Button>
      <Popover
        aria-label="Notifications"
        triggerRef={triggerRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        arrow
        className="p-4 sm:min-w-72"
      >
        You have 3 new notifications.
      </Popover>
    </>
  )
}
