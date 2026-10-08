"use client"

import { MenuTrigger, Menu, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu"
import { Pressable } from "react-aria-components"

export default function MenuDisabledDemo() {
  return (
    <MenuTrigger trigger="contextMenu">
      <Pressable>
        <div
          role="button"
          className="flex aspect-video  w-56 items-center justify-center rounded-xl border border-dashed text-sm"
        >
          <span className="hidden pointer-fine:inline-block">Right click here</span>
          <span className="hidden pointer-coarse:inline-block">Long press here</span>
        </div>
      </Pressable>
      <Menu>
        <MenuItem>
          <MenuLabel>Copy</MenuLabel>
        </MenuItem>
        <MenuItem isDisabled>
          <MenuLabel>Paste</MenuLabel>
        </MenuItem>
        <MenuItem>
          <MenuLabel>Convert</MenuLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem isDisabled>
          <MenuLabel>Rename</MenuLabel>
        </MenuItem>
        <MenuItem>
          <MenuLabel>Refactor</MenuLabel>
        </MenuItem>
        <MenuItem>
          <MenuLabel>Generate</MenuLabel>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
