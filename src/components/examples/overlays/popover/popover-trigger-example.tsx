"use client"

import { useRef, useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover"

export default function PopoverCustomTriggerDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button
        ref={triggerRef}
        aria-label="Open account details"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onPress={() => setIsOpen(true)}
        intent="plain"
        size="sq-md"
        className="rounded-full"
      >
        <Avatar alt="cobain" src="https://intentui.com/images/avatar/cobain.jpg" />
      </Button>
      <Popover
        aria-label="Account details"
        triggerRef={triggerRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="min-w-72"
      >
        <PopoverHeader>
          <PopoverTitle>Email</PopoverTitle>
          <PopoverDescription>We'll send you an email to log in.</PopoverDescription>
        </PopoverHeader>
        <PopoverFooter>
          <Button>Send Login Link</Button>
        </PopoverFooter>
      </Popover>
    </>
  )
}
