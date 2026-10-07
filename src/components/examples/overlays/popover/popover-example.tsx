"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  PopoverBody,
  Popover,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover"

export default function PopoverDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onPress={() => setIsOpen(true)}
        intent="outline"
      >
        What’s this?
      </Button>
      <Popover
        aria-label="Project details"
        triggerRef={triggerRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverHeader>
          <PopoverTitle>This is the title of the popover.</PopoverTitle>
          <PopoverDescription>This is the description of the popover.</PopoverDescription>
        </PopoverHeader>
        <PopoverBody>This is the body of the popover.</PopoverBody>
        <PopoverFooter>This is the footer of the popover.</PopoverFooter>
      </Popover>
    </>
  )
}
