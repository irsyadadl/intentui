"use client"

import { BellIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger } from "@/components/ui/popover"

export default function PopoverArrowDemo() {
  return (
    <PopoverTrigger>
      <Button intent="outline" size="sq-sm">
        <BellIcon />
      </Button>
      <Popover arrow className="p-4 sm:min-w-72">
        You have 3 new notifications.
      </Popover>
    </PopoverTrigger>
  )
}
