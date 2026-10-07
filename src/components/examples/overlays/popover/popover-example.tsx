"use client"

import { Button } from "@/components/ui/button"
import {
  PopoverBody,
  Popover,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function PopoverDemo() {
  return (
    <PopoverTrigger>
      <Button intent="outline">What’s this?</Button>
      <Popover>
        <PopoverHeader>
          <PopoverTitle>This is the title of the popover.</PopoverTitle>
          <PopoverDescription>This is the description of the popover.</PopoverDescription>
        </PopoverHeader>
        <PopoverBody>This is the body of the popover.</PopoverBody>
        <PopoverFooter>This is the footer of the popover.</PopoverFooter>
      </Popover>
    </PopoverTrigger>
  )
}
