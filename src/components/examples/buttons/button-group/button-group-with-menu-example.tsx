"use client"

import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid"
import {
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { MenuItem, Menu, MenuTrigger } from "@/components/ui/menu"

export default function ButtonGroupWithMenuDemo() {
  return (
    <ButtonGroup>
      <Button intent="secondary">
        <RocketLaunchIcon />
        Deploy
      </Button>
      <MenuTrigger>
        <Button intent="secondary">
          <EllipsisHorizontalIcon />
        </Button>
        <Menu placement="bottom end">
          <MenuItem href="#">
            <ArrowPathIcon />
            Redeploy
          </MenuItem>
          <MenuItem href="#">
            <ArrowUturnLeftIcon />
            Rollback
          </MenuItem>
          <MenuItem href="#">
            <DocumentTextIcon />
            View logs
          </MenuItem>
          <MenuItem href="#">
            <Cog6ToothIcon />
            Settings
          </MenuItem>
        </Menu>
      </MenuTrigger>
    </ButtonGroup>
  )
}
