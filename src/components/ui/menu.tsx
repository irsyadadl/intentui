"use client"

import { CheckIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { Collection } from "react-aria-components/Collection"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { Header } from "react-aria-components/Header"
import type {
  MenuItemProps as MenuItemPrimitiveProps,
  MenuProps as MenuPrimitiveProps,
  MenuSectionProps as MenuSectionPrimitiveProps,
  MenuTriggerProps as MenuTriggerPrimitiveProps,
} from "react-aria-components/Menu"
import {
  Menu as MenuPrimitive,
  MenuItem as MenuItemPrimitive,
  MenuSection as MenuSectionPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  SubmenuTrigger as SubmenuTriggerPrimitive,
} from "react-aria-components/Menu"
import { cn } from "cn"
import { tv, type VariantProps } from "tailwind-variants"
import { cx } from "@/lib/primitive"
import {
  DropdownDescription,
  dropdownItemStyles,
  DropdownKeyboard,
  DropdownLabel,
  dropdownSectionStyles,
  DropdownSeparator,
} from "./dropdown"
import { Popover, type PopoverProps } from "./popover"

const MenuTrigger = (props: MenuTriggerPrimitiveProps) => <MenuTriggerPrimitive {...props} />

const MenuSubMenu = ({ delay = 0, ...props }) => (
  <SubmenuTriggerPrimitive {...props} delay={delay}>
    {props.children}
  </SubmenuTriggerPrimitive>
)

interface MenuProps<T> extends MenuPrimitiveProps<T>, Pick<PopoverProps, "placement"> {
  className?: string
  popover?: Pick<
    PopoverProps,
    | "arrow"
    | "className"
    | "placement"
    | "offset"
    | "crossOffset"
    | "arrowBoundaryOffset"
    | "triggerRef"
    | "isOpen"
    | "onOpenChange"
    | "shouldFlip"
    | "isNonModal"
    | "trigger"
    | "getTargetRect"
  >
}

const menuStyles = tv({
  base: "grid max-h-[inherit] grid-cols-[auto_minmax(0,1fr)] gap-y-1 overflow-y-auto overflow-x-hidden overscroll-contain p-1 outline-hidden [clip-path:inset(0_0_0_0_round_calc(var(--radius-xl)-(--spacing(1))))] [&>[data-slot=menu-section]+[data-slot=menu-section]:not([class*='mt-']):not([class*='my-'])]:mt-3",
})

const Menu = <T extends object>({ className, placement, popover, ...props }: MenuProps<T>) => {
  return (
    <Popover
      className={cx("min-w-32 *:data-[slot=popover-inner]:overflow-hidden", popover?.className)}
      placement={placement}
      {...popover}
    >
      <MenuPrimitive data-slot="menu-content" className={menuStyles({ className })} {...props} />
    </Popover>
  )
}

interface MenuItemProps extends MenuItemPrimitiveProps, VariantProps<typeof dropdownItemStyles> {}

const MenuItem = ({ className, intent, children, ...props }: MenuItemProps) => {
  const textValue = props.textValue || (typeof children === "string" ? children : undefined)
  return (
    <MenuItemPrimitive
      data-slot="menu-item"
      className={composeRenderProps(className, (className, { hasSubmenu, ...renderProps }) =>
        dropdownItemStyles({
          ...renderProps,
          intent,
          className: hasSubmenu
            ? cn(
                intent === "danger" && "open:bg-danger-subtle open:text-danger-subtle-foreground",
                intent === "warning" &&
                  "open:bg-warning-subtle open:text-warning-subtle-foreground",
                intent === undefined &&
                  "open:bg-accent open:text-accent-foreground open:*:[.text-muted-foreground]:text-accent-foreground open:*:[svg]:text-accent-foreground",
                className
              )
            : className,
        })
      )}
      textValue={textValue}
      {...props}
    >
      {(values) => (
        <>
          {values.isSelected && ["single", "multiple"].includes(values.selectionMode) && (
            <CheckIcon />
          )}

          {typeof children === "function" ? children(values) : children}

          {values.hasSubmenu && (
            <ChevronRightIcon
              data-slot="chevron"
              className="absolute end-0 size-4 -translate-y-1/2"
              style={{
                top: "calc(var(--spacing) * 3)",
              }}
            />
          )}
        </>
      )}
    </MenuItemPrimitive>
  )
}

export interface MenuHeaderProps extends React.ComponentProps<typeof Header> {
  separator?: boolean
}

const MenuHeader = ({ className, separator = false, ...props }: MenuHeaderProps) => (
  <Header
    className={cn(
      "col-span-full px-2.5 py-2 font-medium text-base sm:text-sm",
      separator && "-mx-1 border-b sm:px-3 sm:pb-2.5",
      className
    )}
    {...props}
  />
)

const { section, header } = dropdownSectionStyles()

interface MenuSectionProps<T> extends MenuSectionPrimitiveProps<T> {
  ref?: React.Ref<HTMLDivElement>
  label?: string
}

const MenuSection = <T extends object>({
  className,
  children,
  ref,
  ...props
}: MenuSectionProps<T>) => {
  return (
    <MenuSectionPrimitive
      data-slot="menu-section"
      ref={ref}
      className={section({ className })}
      {...props}
    >
      {"label" in props && <Header className={header()}>{props.label}</Header>}
      <Collection items={props.items}>{children}</Collection>
    </MenuSectionPrimitive>
  )
}

const MenuSeparator = DropdownSeparator
const MenuShortcut = DropdownKeyboard
const MenuLabel = DropdownLabel
const MenuDescription = DropdownDescription

export type { MenuProps, MenuItemProps, MenuSectionProps }
export {
  Menu,
  MenuDescription,
  MenuHeader,
  MenuItem,
  MenuLabel,
  MenuSection,
  MenuSeparator,
  MenuShortcut,
  MenuSubMenu,
  MenuTrigger,
  menuStyles,
}
