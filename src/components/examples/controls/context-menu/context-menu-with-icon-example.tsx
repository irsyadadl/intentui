"use client"

import {
  ArchiveBoxIcon,
  DocumentIcon,
  FolderOpenIcon,
  PencilSquareIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"

import {
  MenuTrigger,
  Menu,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuShortcut,
} from "@/components/ui/menu"
import { Pressable } from "react-aria-components"

export default function MenuWithIconDemo() {
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
      <Menu className="min-w-52">
        <MenuItem>
          <FolderOpenIcon />
          <MenuLabel>Open Folder</MenuLabel>
        </MenuItem>
        <MenuItem>
          <DocumentIcon />
          <MenuLabel>Open File</MenuLabel>
        </MenuItem>
        <MenuItem>
          <MenuLabel>Open with...</MenuLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <PencilSquareIcon />
          <MenuLabel>Rename</MenuLabel>
        </MenuItem>
        <MenuItem>
          <Square2StackIcon />
          <MenuLabel>Duplicate</MenuLabel>
        </MenuItem>
        <MenuItem>
          <MenuLabel>Share</MenuLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <TrashIcon />
          <MenuLabel>Delete</MenuLabel>
          <MenuShortcut>⌘←</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <ArchiveBoxIcon />
          <MenuLabel>Bin</MenuLabel>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
