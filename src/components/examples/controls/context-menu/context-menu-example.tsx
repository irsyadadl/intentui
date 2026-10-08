"use client"

import { MenuTrigger, Menu, MenuItem, MenuSeparator, MenuShortcut } from "@/components/ui/menu"
import { Pressable } from "react-aria-components"

export default function MenuDemo() {
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
      <Menu className="min-w-56">
        <MenuItem>Back</MenuItem>
        <MenuItem isDisabled>Forward</MenuItem>
        <MenuItem>Reload</MenuItem>
        <MenuSeparator />
        <MenuItem>Bookmark</MenuItem>
        <MenuItem>Save as</MenuItem>
        <MenuItem>
          Select all
          <MenuShortcut>⌘A</MenuShortcut>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>View source</MenuItem>
        <MenuItem>Inspect Accessibility</MenuItem>
        <MenuItem>Inspect</MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
