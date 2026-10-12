# v3 overlays

`Modal` wraps a trigger and `ModalContent`; the separate `Dialog` is the inner dialog. `Sheet` wraps a trigger and `SheetContent position="right"` (not `side`). The audited Sheet defaults to `position="bottom"`, `isFloat=true`; it uses React Aria Sheet, not the old motion Drawer API. `Menu` wraps a button-like `MenuTrigger` and `MenuContent`; dynamic items belong on MenuContent. `Popover` wraps a trigger and `PopoverContent`. Context Menu has its own module.

## Modal

Source: [3.x example](https://github.com/irsyadadl/intentui/blob/3.x/src/components/examples/overlays/modal/modal-example.tsx). Resolve these example aliases to the consuming project.

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal"
import { TextField } from "@/components/ui/text-field"

export default function ModalDemo() {
  return (
    <Modal>
      <Button intent="outline">Rename</Button>
      <ModalContent>
        {({ close }) => (
          <>
            <ModalHeader>
              <ModalTitle>Rename project</ModalTitle>
              <ModalDescription>
                Change how this project will appear across the dashboard.
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <TextField aria-label="Name">
                <Input placeholder="Enter a name" />
              </TextField>
            </ModalBody>
            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button onPress={close} intent="primary">
                Save changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
```

## Sheet

Source: [3.x example](https://github.com/irsyadadl/intentui/blob/3.x/src/components/examples/overlays/sheet/sheet-example.tsx). Resolve these example aliases to the consuming project.

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
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { TextField } from "@/components/ui/text-field"

export default function SheetDemo() {
  return (
    <Sheet>
      <Button intent="outline">Edit Settings</Button>
      <SheetContent>
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
      </SheetContent>
    </Sheet>
  )
}
```

## Menu

Source: [3.x example](https://github.com/irsyadadl/intentui/blob/3.x/src/components/examples/collections/menu/menu-basic-example.tsx). Resolve these example aliases to the consuming project.

```tsx
"use client"

import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu"

export default function MenuBasicDemo() {
  return (
    <Menu>
      <MenuTrigger>Open</MenuTrigger>
      <MenuContent popover={{ placement: "bottom" }}>
        <MenuItem>Inbox</MenuItem>
        <MenuItem>Sent</MenuItem>
        <MenuItem>New Message</MenuItem>
      </MenuContent>
    </Menu>
  )
}
```

## Context menu

Source: [3.x example](https://github.com/irsyadadl/intentui/blob/3.x/src/components/examples/controls/context-menu/context-menu-example.tsx). Resolve these example aliases to the consuming project.

```tsx
"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "@/components/ui/context-menu"
import { Pressable } from "react-aria-components"

export default function ContextMenuDemo() {
  return (
    <ContextMenu>
      <Pressable>
        <div
          role="button"
          className="flex aspect-video w-56 items-center justify-center rounded-xl border border-dashed text-sm"
        >
          <span className="hidden pointer-fine:inline-block">Right click here</span>
          <span className="hidden pointer-coarse:inline-block">Long press here</span>
        </div>
      </Pressable>
      <ContextMenuContent className="min-w-56">
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem isDisabled>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Bookmark</ContextMenuItem>
        <ContextMenuItem>Save as</ContextMenuItem>
        <ContextMenuItem>
          Select all
          <ContextMenuShortcut>⌘A</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>View source</ContextMenuItem>
        <ContextMenuItem>Inspect Accessibility</ContextMenuItem>
        <ContextMenuItem>Inspect</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

## Popover

Source: [3.x example](https://github.com/irsyadadl/intentui/blob/3.x/src/components/examples/overlays/popover/popover-example.tsx). Resolve these example aliases to the consuming project.

```tsx
"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover"

export default function PopoverDemo() {
  return (
    <Popover>
      <Button intent="outline">What’s this?</Button>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>This is the title of the popover.</PopoverTitle>
          <PopoverDescription>This is the description of the popover.</PopoverDescription>
        </PopoverHeader>
        <PopoverBody>This is the body of the popover.</PopoverBody>
        <PopoverFooter>This is the footer of the popover.</PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
```

## Tooltip

Source: [3.x example](https://github.com/irsyadadl/intentui/blob/3.x/src/components/examples/overlays/tooltip/tooltip-example.tsx). Resolve these example aliases to the consuming project.

```tsx
"use client"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent } from "@/components/ui/tooltip"

export default function TooltipDemo() {
  return (
    <Tooltip>
      <Button intent="outline">Duplicate</Button>
      <TooltipContent>
        <strong className="font-semibold">Duplicate project</strong>
        <p className="mt-1 max-w-2xs text-pretty text-muted-fg text-sm">
          This will create a copy of the current project including all files and settings.
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
```
