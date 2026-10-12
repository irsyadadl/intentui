"use client"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function PopoverCustomTriggerDemo() {
  return (
    <PopoverTrigger>
      <Button
        aria-label="Open account details"
        intent="plain"
        size="sq-md"
        className="rounded-full"
      >
        <Avatar alt="cobain" src="https://intentui.com/images/avatar/cobain.jpg" />
      </Button>
      <Popover aria-labelledby="" aria-label="Account details" className="min-w-72">
        <PopoverHeader>
          <PopoverTitle>Email</PopoverTitle>
          <PopoverDescription>We'll send you an email to log in.</PopoverDescription>
        </PopoverHeader>
        <PopoverFooter>
          <Button>Send Login Link</Button>
        </PopoverFooter>
      </Popover>
    </PopoverTrigger>
  )
}
