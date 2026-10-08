"use client"

import { MenuTrigger, Menu, MenuItem, MenuSeparator } from "@/components/ui/menu"
import { Pressable } from "react-aria-components"

export default function MenuDangerDemo() {
  return (
    <MenuTrigger trigger="contextMenu">
      <Pressable>
        <div
          role="button"
          className="flex aspect-video w-56 items-center justify-center rounded-xl border border-dashed text-sm"
        >
          <span className="hidden pointer-fine:inline-block">Right click here</span>
          <span className="hidden pointer-coarse:inline-block">Long press here</span>
        </div>
      </Pressable>
      <Menu>
        <MenuItem>Open</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem>Share</MenuItem>
        <MenuSeparator />
        <MenuItem intent="danger">Delete</MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
