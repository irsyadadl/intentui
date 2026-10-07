"use client"

import { Pressable } from "react-aria-components"

import {
  ContextMenuTrigger,
  ContextMenu,
  ContextMenuItem,
  ContextMenuSection,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
} from "@/components/ui/context-menu"

export default function ContextMenuSubExample() {
  return (
    <ContextMenuTrigger>
      <Pressable>
        <div
          role="button"
          className="flex aspect-video w-56 items-center justify-center rounded-xl border border-dashed text-sm"
        >
          <span className="hidden pointer-fine:inline-block">Right click here</span>
          <span className="hidden pointer-coarse:inline-block">Long press here</span>
        </div>
      </Pressable>
      <ContextMenu>
        <ContextMenuItem>
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuItem>More Tools</ContextMenuItem>
          <ContextMenu>
            <ContextMenuSection>
              <ContextMenuItem>Save Page...</ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
            </ContextMenuSection>
            <ContextMenuSeparator />
            <ContextMenuSection>
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSection>
            <ContextMenuSeparator />
            <ContextMenuSection>
              <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuSection>
          </ContextMenu>
        </ContextMenuSub>
      </ContextMenu>
    </ContextMenuTrigger>
  )
}
