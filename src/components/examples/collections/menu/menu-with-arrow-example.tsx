"use client"

import { Button } from "react-aria-components/Button"

import { PlusIcon } from "@heroicons/react/20/solid"
import {
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  HashtagIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline"
import { Avatar } from "@/components/ui/avatar"
import {
  MenuHeader,
  MenuItem,
  MenuLabel,
  MenuSection,
  MenuSeparator,
  MenuShortcut,
  Menu,
  MenuTrigger,
} from "@/components/ui/menu"

export default function MenuWithArrowDemo() {
  return (
    <MenuTrigger>
      <Button aria-label="Open Menu">
        <Avatar src="https://intentui.com/images/avatar/cobain.jpg" />
      </Button>
      <Menu popover={{ arrow: true, placement: "top" }} className="min-w-54">
        <MenuSection>
          <MenuHeader separator>
            <span className="block">Irsyad A. Panjaitan</span>
            <span className="font-normal text-muted-foreground">@irsyadadl</span>
          </MenuHeader>
        </MenuSection>
        <MenuItem>
          <Cog6ToothIcon />
          <MenuLabel>Settings</MenuLabel>
        </MenuItem>
        <MenuItem href="#">
          <PlusIcon />
          <MenuLabel>Create Team</MenuLabel>
        </MenuItem>
        <MenuItem href="#">
          <HashtagIcon />
          <MenuLabel>Command Menu</MenuLabel>
          <MenuShortcut>⌘K</MenuShortcut>
        </MenuItem>
        <MenuSeparator />
        <MenuItem href="#">
          <LifebuoyIcon />
          <MenuLabel>Contact Support</MenuLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <ArrowLeftStartOnRectangleIcon />
          <MenuLabel>Log out</MenuLabel>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
