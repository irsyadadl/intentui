"use client"

import { MenuItem, Menu, MenuTrigger } from "@/components/ui/menu"
import { Button } from "react-aria-components/Button"

export default function MenuBasicDemo() {
  return (
    <MenuTrigger>
      <Button>Open</Button>
      <Menu popover={{ placement: "bottom" }}>
        <MenuItem>Inbox</MenuItem>
        <MenuItem>Sent</MenuItem>
        <MenuItem>New Message</MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
