"use client"

import { MenuTrigger, Menu, MenuItem, MenuSeparator, MenuShortcut } from "@/components/ui/menu"
import { Pressable } from "react-aria-components"

export default function MenuSeparatorDemo() {
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
      <Menu className="min-w-60">
        <MenuItem>Go to Definition</MenuItem>
        <MenuItem>Go to Type Definition</MenuItem>
        <MenuItem>Go to Source Definition</MenuItem>
        <MenuItem>Go to Implementations</MenuItem>
        <MenuItem>
          Go to References
          <MenuShortcut>⌘F12</MenuShortcut>
        </MenuItem>
        <MenuItem>
          Peek
          <MenuShortcut>⇧F12</MenuShortcut>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          Find All References
          <MenuShortcut>⌘⇧F</MenuShortcut>
        </MenuItem>
        <MenuItem>
          Find All Implementations
          <MenuShortcut>⌘⇧I</MenuShortcut>
        </MenuItem>
        <MenuItem>Show Call Hierarchy</MenuItem>
        <MenuSeparator />
        <MenuItem>Rename Symbol</MenuItem>
        <MenuItem>Change All Occurrences</MenuItem>
        <MenuItem>Format Document</MenuItem>
        <MenuItem>
          Refactor...
          <MenuShortcut>⌘⇧R</MenuShortcut>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
