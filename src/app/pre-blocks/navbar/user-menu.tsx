"use client"

import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline"
import { Avatar } from "@/components/ui/avatar"
import {
  MenuHeader,
  MenuItem,
  MenuSection,
  MenuSeparator,
  Menu,
  MenuTrigger,
} from "@/components/ui/menu"
import { Button } from "react-aria-components/Button"

export function UserMenu() {
  return (
    <MenuTrigger>
      <Button aria-label="Open Menu">
        <Avatar
          alt="cobain"
          size="md"
          isSquare
          src="https://intentui.com/images/avatar/cobain.jpg"
        />
      </Button>
      <Menu placement="bottom right" className="min-w-60 sm:min-w-56">
        <MenuSection>
          <MenuHeader separator>
            <span className="block">Kurt Cobain</span>
            <span className="font-normal text-muted-foreground">@cobain</span>
          </MenuHeader>
        </MenuSection>

        <MenuItem href="#dashboard">
          <Squares2X2Icon />
          Dashboard
        </MenuItem>
        <MenuItem href="#settings">
          <Cog6ToothIcon />
          Settings
        </MenuItem>
        <MenuItem href="#security">
          <ShieldCheckIcon />
          Security
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <CommandLineIcon />
          Command Menu
        </MenuItem>

        <MenuItem href="#contact">
          <LifebuoyIcon />
          Customer Support
        </MenuItem>
        <MenuSeparator />
        <MenuItem href="#logout">
          <ArrowRightStartOnRectangleIcon />
          Log out
        </MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
