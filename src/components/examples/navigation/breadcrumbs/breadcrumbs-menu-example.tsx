"use client"

import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid"
import { Bars3BottomLeftIcon, WindowIcon } from "@heroicons/react/24/outline"
import { Breadcrumbs, BreadcrumbsItem } from "@/components/ui/breadcrumbs"
import { Button } from "@/components/ui/button"
import { MenuItem, MenuLabel, Menu, MenuTrigger } from "@/components/ui/menu"

export default function BreadcrumbsMenuDemo() {
  return (
    <Breadcrumbs>
      <BreadcrumbsItem href="#">Home</BreadcrumbsItem>

      <BreadcrumbsItem>
        <MenuTrigger>
          <Button intent="plain" size="sq-sm" className="-mx-1 h-6">
            <EllipsisHorizontalIcon />
          </Button>
          <Menu popover={{ placement: "bottom" }}>
            <MenuItem href="/docs/components/layouts/sidebar">
              <Bars3BottomLeftIcon /> <MenuLabel>Sidebar</MenuLabel>
            </MenuItem>
            <MenuItem href="/docs/components/layouts/navbar">
              <MenuLabel>Navbar</MenuLabel>
            </MenuItem>
            <MenuItem href="/docs/components/overlays/dialog">
              <WindowIcon /> <MenuLabel>Dialog</MenuLabel>
            </MenuItem>
            <MenuItem href="/docs/components/collections/menu">
              <MenuLabel>Menu</MenuLabel>
            </MenuItem>
            <MenuItem href="/docs/components/charts/setting-up">
              <MenuLabel>Chart</MenuLabel>
            </MenuItem>
            <MenuItem href="/docs/components/collections/table">
              <MenuLabel>Table</MenuLabel>
            </MenuItem>
          </Menu>
        </MenuTrigger>
      </BreadcrumbsItem>

      <BreadcrumbsItem>Navbar</BreadcrumbsItem>
    </Breadcrumbs>
  )
}
