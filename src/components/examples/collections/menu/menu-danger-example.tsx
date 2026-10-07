"use client"

import { Button } from "@/components/ui/button"

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { MenuItem, MenuLabel, MenuSeparator, Menu, MenuTrigger } from "@/components/ui/menu"

export default function MenuDangerDemo() {
  return (
    <MenuTrigger>
      <Button intent="outline">Open</Button>
      <Menu popover={{ placement: "bottom" }}>
        <MenuItem>
          <MenuLabel>View</MenuLabel>
        </MenuItem>
        <MenuItem>
          <PencilSquareIcon />
          <MenuLabel>Edit</MenuLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem intent="danger">
          <TrashIcon />
          <MenuLabel>Delete</MenuLabel>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
