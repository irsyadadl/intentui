"use client"

import {
  MenuDescription,
  MenuHeader,
  MenuItem,
  MenuLabel,
  MenuSection,
  MenuSeparator,
  MenuShortcut,
  MenuSubMenu,
  Menu,
} from "./menu"
import { MenuTrigger, type MenuTriggerProps } from "react-aria-components/Menu"
import { type PopoverProps } from "@/components/ui/popover"

function ContextMenuTrigger(props: Omit<MenuTriggerProps, "trigger">) {
  return <MenuTrigger trigger="contextMenu" {...props} />
}

function ContextMenu({
  placement = "bottom start",
  offset = 4,
  crossOffset = 0,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Menu<object>>, "children"> &
  Pick<PopoverProps, "placement" | "offset" | "crossOffset"> & {
    children?: React.ReactNode
  }) {
  return (
    <Menu
      popover={{
        placement,
        offset,
        crossOffset,
      }}
      {...props}
    >
      {children}
    </Menu>
  )
}

const ContextMenuItem = MenuItem
const ContextMenuSeparator = MenuSeparator
const ContextMenuDescription = MenuDescription
const ContextMenuSection = MenuSection
const ContextMenuHeader = MenuHeader
const ContextMenuShortcut = MenuShortcut
const ContextMenuLabel = MenuLabel
const ContextMenuSub = MenuSubMenu

export {
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenu,
  ContextMenuDescription,
  ContextMenuHeader,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSection,
  ContextMenuSeparator,
  ContextMenuShortcut,
}
