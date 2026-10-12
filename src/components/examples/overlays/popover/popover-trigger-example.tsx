"use client"

import { Avatar } from "@/components/ui/avatar"
import {
  Popover,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Pressable } from "react-aria-components/Pressable"
import { Button } from "@/components/ui/button"

export default function PopoverCustomTriggerDemo() {
  return (
    <PopoverTrigger>
      <Pressable>
        <Avatar role="button" alt="cobain" src="https://intentui.com/images/avatar/cobain.jpg" />
      </Pressable>
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
