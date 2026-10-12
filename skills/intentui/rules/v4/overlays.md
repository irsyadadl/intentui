# v4 overlays

`DialogTrigger` wraps a Button and `Dialog`; `SheetTrigger` wraps a Button and `Sheet position="right"`; `MenuTrigger` wraps a Button and `Menu`. `DialogTrigger` and `MenuTrigger` are containers, not button replacements. Sheet defaults to `position="bottom"`, `isFloat=false`. Context menus use `MenuTrigger trigger="contextMenu"` and Menu from the menu module; inspect Pressable keyboard/long-press behavior. Popover is the floating content itself; the upstream example uses controlled state and a triggerRef. Do not nest the v4 modal Dialog inside a Popover as though it were the v3 inner primitive.

## Dialog

Source: [4.x example](https://github.com/irsyadadl/intentui/blob/4.x/src/components/examples/overlays/dialog/dialog-example.tsx). Resolve these example aliases to the consuming project.

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TextField } from "@/components/ui/text-field"

export default function DialogDemo() {
  return (
    <DialogTrigger>
      <Button intent="outline">Rename</Button>
      <Dialog>
        {({ close }) => (
          <>
            <DialogHeader>
              <DialogTitle>Rename project</DialogTitle>
              <DialogDescription>
                Change how this project will appear across the dashboard.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <TextField aria-label="Name">
                <Input placeholder="Enter a name" />
              </TextField>
            </DialogBody>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <Button onPress={close} intent="primary">
                Save changes
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </DialogTrigger>
  )
}
```

## Sheet

Source: [4.x example](https://github.com/irsyadadl/intentui/blob/4.x/src/components/examples/overlays/sheet/sheet-example.tsx). Resolve these example aliases to the consuming project.

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Checkbox, CheckboxField } from "@/components/ui/checkbox"
import { Description, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TextField } from "@/components/ui/text-field"

export default function SheetDemo() {
  return (
    <SheetTrigger>
      <Button intent="outline">Edit Settings</Button>
      <Sheet>
        {({ close }) => (
          <>
            <SheetHeader>
              <SheetTitle>Update User Settings</SheetTitle>
              <SheetDescription>Adjust your preferences and configurations here.</SheetDescription>
            </SheetHeader>
            <SheetBody className="space-y-4">
              <TextField>
                <Label>Username</Label>
                <Input type="text" placeholder="Enter your username" />
              </TextField>
              <TextField>
                <Label>Email</Label>
                <Input type="email" placeholder="Enter your email address" />
              </TextField>
              <CheckboxField>
                <Checkbox>Enable notifications</Checkbox>
                <Description>Receive updates and alerts via email.</Description>
              </CheckboxField>
            </SheetBody>
            <SheetFooter>
              <SheetClose>Cancel</SheetClose>
              <Button onPress={close} intent="primary" type="submit">
                Save
              </Button>
            </SheetFooter>
          </>
        )}
      </Sheet>
    </SheetTrigger>
  )
}
```

## Menu

Source: [4.x example](https://github.com/irsyadadl/intentui/blob/4.x/src/components/examples/collections/menu/menu-basic-example.tsx). Resolve these example aliases to the consuming project.

```tsx
"use client"

import { MenuItem, Menu, MenuTrigger } from "@/components/ui/menu"
import { Button } from "react-aria-components/Button"

export default function MenuBasicDemo() {
  return (
    <MenuTrigger>
      <Button>Open</Button>
      <Menu popover={{ placement: "bottom" }}>
        <MenuItem>Inbox</MenuItem>
        <MenuItem>Sent</MenuItem>
        <MenuItem>New Message</MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
```

## Context menu

Source: [4.x example](https://github.com/irsyadadl/intentui/blob/4.x/src/components/examples/controls/context-menu/context-menu-example.tsx). Resolve these example aliases to the consuming project.

```tsx
"use client"

import { MenuTrigger, Menu, MenuItem, MenuSeparator, MenuShortcut } from "@/components/ui/menu"
import { Pressable } from "react-aria-components"

export default function MenuDemo() {
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
      <Menu className="min-w-56">
        <MenuItem>Back</MenuItem>
        <MenuItem isDisabled>Forward</MenuItem>
        <MenuItem>Reload</MenuItem>
        <MenuSeparator />
        <MenuItem>Bookmark</MenuItem>
        <MenuItem>Save as</MenuItem>
        <MenuItem>
          Select all
          <MenuShortcut>⌘A</MenuShortcut>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>View source</MenuItem>
        <MenuItem>Inspect Accessibility</MenuItem>
        <MenuItem>Inspect</MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
```

## Popover

Source: [4.x example](https://github.com/irsyadadl/intentui/blob/4.x/src/components/examples/overlays/popover/popover-example.tsx). Resolve these example aliases to the consuming project.

```tsx
"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  PopoverBody,
  Popover,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover"

export default function PopoverDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onPress={() => setIsOpen(true)}
        intent="outline"
      >
        What’s this?
      </Button>
      <Popover
        aria-label="Project details"
        triggerRef={triggerRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverHeader>
          <PopoverTitle>This is the title of the popover.</PopoverTitle>
          <PopoverDescription>This is the description of the popover.</PopoverDescription>
        </PopoverHeader>
        <PopoverBody>This is the body of the popover.</PopoverBody>
        <PopoverFooter>This is the footer of the popover.</PopoverFooter>
      </Popover>
    </>
  )
}
```

## Tooltip

Current v4 source exports `TooltipTrigger`, `Tooltip`, and `TooltipProps`; it does not export `TooltipContent`. `TooltipTrigger` is the React Aria trigger wrapper, and `Tooltip` renders the floating content. Put `delay`, `closeDelay`, `isDisabled`, `isOpen`, `defaultOpen`, and `onOpenChange` on TooltipTrigger. Put `placement`, `offset`, `arrow`, `inverse`, and content className on Tooltip. Defaults in the installed implementation: offset=10, arrow=true, inverse=false.

Use a focusable trigger, with an accessible name for icon-only actions. Tooltips supply supplemental descriptions, not essential interactive content. Check hover/focus timing and Escape behavior. Source: [current v4 Tooltip](https://github.com/irsyadadl/intentui/blob/4.x/src/components/ui/tooltip.tsx); inspect installed exports because earlier v4 snapshots used the old API.

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { TooltipTrigger, Tooltip } from "@/components/ui/tooltip"

export default function TooltipExample() {
  return (
    <TooltipTrigger>
      <Button intent="outline">Duplicate</Button>
      <Tooltip>
        <strong className="font-semibold">Duplicate project</strong>
        <p className="mt-1 max-w-2xs text-pretty text-muted-foreground text-sm">
          This will create a copy of the current project including all files and settings.
        </p>
      </Tooltip>
    </TooltipTrigger>
  )
}
```
