"use client"

import { Button } from "@/components/ui/button"

import { MenuItem, MenuLabel, Menu, MenuTrigger } from "@/components/ui/menu"

export default function MenuDisabledDemo() {
  return (
    <MenuTrigger>
      <Button intent="outline">Open</Button>
      <Menu popover={{ placement: "bottom" }}>
        <MenuItem id="view">
          <MenuLabel>View</MenuLabel>
        </MenuItem>
        <MenuItem id="edit">
          <MenuLabel>Edit</MenuLabel>
        </MenuItem>
        <MenuItem id="gsu" isDisabled>
          <MenuLabel>Generate Short URL</MenuLabel>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
