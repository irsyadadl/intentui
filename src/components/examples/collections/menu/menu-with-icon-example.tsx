"use client"

import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  MoonIcon,
  Squares2X2Icon,
  SunIcon,
} from "@heroicons/react/24/outline"
import { Avatar } from "@/components/ui/avatar"
import {
  MenuHeader,
  MenuItem,
  MenuLabel,
  MenuSection,
  MenuSeparator,
  MenuSubMenu,
  Menu,
  MenuTrigger,
} from "@/components/ui/menu"
import { Pressable } from "react-aria-components/Pressable"

export default function MenuWithIconDemo() {
  return (
    <MenuTrigger>
      <Pressable>
        <Avatar
          role="button"
          alt="kurt cobain"
          src="https://intentui.com/images/avatar/cobain.jpg"
        />
      </Pressable>
      <Menu popover={{ placement: "bottom" }} className="min-w-48">
        <MenuHeader separator>
          <span className="block">Kurt Cobain</span>
          <span className="font-normal text-muted-foreground">@cobain</span>
        </MenuHeader>

        <MenuSection>
          <MenuItem href="#dashboard">
            <Squares2X2Icon />
            <MenuLabel>Dashboard</MenuLabel>
          </MenuItem>
          <MenuItem href="#settings">
            <Cog6ToothIcon />
            <MenuLabel>Settings</MenuLabel>
          </MenuItem>
        </MenuSection>
        <MenuSeparator />
        <MenuItem>
          <CommandLineIcon />
          <MenuLabel>Command Menu</MenuLabel>
        </MenuItem>
        <MenuSubMenu>
          <MenuItem>
            <ComputerDesktopIcon />
            <MenuLabel>Switch theme</MenuLabel>
          </MenuItem>
          <Menu>
            <MenuItem>
              <ComputerDesktopIcon /> System
            </MenuItem>
            <MenuItem>
              <MoonIcon /> Dark
            </MenuItem>
            <MenuItem>
              <SunIcon /> Light
            </MenuItem>
          </Menu>
        </MenuSubMenu>
        <MenuSeparator />
        <MenuItem href="#contact-s">
          <MenuLabel>Contact Support</MenuLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem href="#logout">
          <ArrowRightStartOnRectangleIcon />
          <MenuLabel>Log out</MenuLabel>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
