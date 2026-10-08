"use client"

import { MenuTrigger, Menu, MenuDescription, MenuItem, MenuLabel } from "@/components/ui/menu"
import { Pressable } from "react-aria-components"

export default function MenuDetailDescriptionDemo() {
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
        {roles.map((item) => (
          <MenuItem key={item.id} textValue={item.name}>
            <MenuLabel>{item.name}</MenuLabel>
            <MenuDescription>{item.description}</MenuDescription>
          </MenuItem>
        ))}
      </Menu>
    </MenuTrigger>
  )
}

const roles = [
  {
    id: 1,
    name: "Admin",
    description: "Has full access to all resources",
  },
  {
    id: 2,
    name: "Editor",
    description: "Can edit content but has limited access to settings",
  },
  {
    id: 3,
    name: "Viewer",
    description: "Can view content but cannot make changes",
  },
  {
    id: 4,
    name: "Contributor",
    description: "Can contribute content for review",
  },
  {
    id: 5,
    name: "Guest",
    description: "Limited access, mostly for viewing purposes",
  },
]
