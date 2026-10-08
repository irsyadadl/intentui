"use client"

import { Pressable } from "react-aria-components"

import {
  MenuTrigger,
  Menu,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuShortcut,
  MenuSubMenu,
} from "@/components/ui/menu"

export default function MenuSubMenuExample() {
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
        <MenuItem>
          Copy
          <MenuShortcut>⌘C</MenuShortcut>
        </MenuItem>
        <MenuItem>
          Cut
          <MenuShortcut>⌘X</MenuShortcut>
        </MenuItem>
        <MenuSubMenu>
          <MenuItem>More Tools</MenuItem>
          <Menu>
            <MenuSection>
              <MenuItem>Save Page...</MenuItem>
              <MenuItem>Create Shortcut...</MenuItem>
              <MenuItem>Name Window...</MenuItem>
            </MenuSection>
            <MenuSeparator />
            <MenuSection>
              <MenuItem>Developer Tools</MenuItem>
            </MenuSection>
            <MenuSeparator />
            <MenuSection>
              <MenuItem>Delete</MenuItem>
            </MenuSection>
          </Menu>
        </MenuSubMenu>
      </Menu>
    </MenuTrigger>
  )
}
