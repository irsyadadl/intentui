# Verified component mappings

The mappings and complete before/after TSX examples below are self-contained for independent installation. Verify customized APIs against the source links at the end.

| Family       | v3 imports/composition                                                      | v4 imports/composition                                                                           | Prop/type/export change                                                                                                                | Safety and behavior                                                                                                                      |
| ------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Modal        | `modal`: Modal → Button + ModalContent, ModalHeader/Title/Body/Footer/Close | `dialog`: DialogTrigger → Button + Dialog, DialogHeader/Title/Body/Footer/Close                  | modal module removed; surface interface becomes exported DialogProps (v3 ModalContentProps was internal); move surface props to Dialog | structural conversion; preserve title/role/dismissal/open state/focus; customized source needs review                                    |
| Inner Dialog | `dialog`: Dialog around primitive content; DialogTrigger is a button        | `dialog`: Dialog includes modal overlay; DialogTrigger is a container                            | DialogProps now includes overlay/sizing props; old trigger button props belong on a Button                                             | not a safe global rename; check nested overlays and popovers                                                                             |
| Sheet        | Sheet → Button + SheetContent                                               | SheetTrigger → Button + Sheet                                                                    | SheetContent/SheetContentProps removed; SheetProps replaces surface type; `position`, not `side`                                       | isFloat default changes true → false; preserve explicitly if desired; gestures/snap points/focus need review                             |
| Menu         | Menu → button-like MenuTrigger + MenuContent                                | MenuTrigger → Button + Menu                                                                      | MenuContent/MenuContentProps/menuContentStyles removed; MenuProps/menuStyles replace them; old MenuTriggerProps removed                | move button props/onPress to Button, open state to wrapper, collection/action/selection props to Menu; keyboard/submenus require testing |
| Context Menu | context-menu: ContextMenu + ContextMenuContent/Item/etc.                    | menu: MenuTrigger trigger="contextMenu" + Menu/MenuItem/etc.                                     | entire context-menu module removed; ContextMenuSub maps to MenuSubMenu                                                                 | trigger must support contextual interaction; preserve offsets via Menu popover; test keyboard/right-click/long press                     |
| Popover      | Popover → Button + PopoverContent; PopoverTrigger button alias              | Popover is the floating surface, controlled trigger ref/state or verified React Aria composition | PopoverContent/PopoverContentProps/PopoverTrigger removed; PopoverProps includes surface arrow/ref options                             | old outer Popover cannot be replaced blindly; do not put the new modal Dialog inside it as an inner primitive                            |
| Tooltip      | Tooltip → trigger + TooltipContent                                          | same composition                                                                                 | semantic color variables updated                                                                                                       | retain delay, focusable trigger and description; verify source for local changes                                                         |

Modal child aliases generally map prefix `Modal` → `Dialog` (Header, Title, Description, Body, Footer, Close). `ModalTrigger` was a button alias, whereas v4 DialogTrigger is a container: replace old button usage with Button inside DialogTrigger. Do not rename that alias mechanically.

## Modal before (v3)

```tsx
import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalClose,
} from "@/components/ui/modal"

export function RenameProject() {
  return (
    <Modal>
      <Button>Rename</Button>
      <ModalContent size="md">
        <ModalHeader>
          <ModalTitle>Rename project</ModalTitle>
        </ModalHeader>
        <ModalBody>Project details</ModalBody>
        <ModalClose>Cancel</ModalClose>
      </ModalContent>
    </Modal>
  )
}
```

## Modal after (v4)

```tsx
import { Button } from "@/components/ui/button"
import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogClose,
} from "@/components/ui/dialog"

export function RenameProject() {
  return (
    <DialogTrigger>
      <Button>Rename</Button>
      <Dialog size="md">
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
        </DialogHeader>
        <DialogBody>Project details</DialogBody>
        <DialogClose>Cancel</DialogClose>
      </Dialog>
    </DialogTrigger>
  )
}
```

Keep controlled `isOpen`/`onOpenChange` on the trigger wrapper when originally controlled there. Keep size, role, closeButton, and dismissal settings on the surface. ModalContent defaults and v4 Dialog both suppress default outside dismissal for alertdialog; custom explicit settings still need review. Give dialogs an accessible title or name and test focus restoration.

## Sheet before (v3)

```tsx
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"

export function Filters() {
  return (
    <Sheet>
      <Button>Filters</Button>
      <SheetContent position="right" isFloat>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <SheetClose>Close</SheetClose>
      </SheetContent>
    </Sheet>
  )
}
```

## Sheet after (v4)

```tsx
import { Button } from "@/components/ui/button"
import { SheetTrigger, Sheet, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"

export function Filters() {
  return (
    <SheetTrigger>
      <Button>Filters</Button>
      <Sheet position="right" isFloat>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <SheetClose>Close</SheetClose>
      </Sheet>
    </SheetTrigger>
  )
}
```

Preserve explicitly chosen floating appearance and snapPoints/preventDismissal. Verify logical start/end positioning, RTL, scroll/overscroll, stack animation and close controls. The target exports SheetProps; it is not a Drawer migration mapping.

## Menu before (v3)

```tsx
import { Menu, MenuTrigger, MenuContent, MenuItem } from "@/components/ui/menu"

export function Actions() {
  return (
    <Menu>
      <MenuTrigger>Actions</MenuTrigger>
      <MenuContent popover={{ placement: "bottom" }}>
        <MenuItem id="rename">Rename</MenuItem>
      </MenuContent>
    </Menu>
  )
}
```

## Menu after (v4)

```tsx
import { Button } from "@/components/ui/button"
import { MenuTrigger, Menu, MenuItem } from "@/components/ui/menu"

export function Actions() {
  return (
    <MenuTrigger>
      <Button>Actions</Button>
      <Menu popover={{ placement: "bottom" }}>
        <MenuItem id="rename">Rename</MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
```

Move dynamic `items`/render-function children and selectedKeys/onSelectionChange from MenuContent to Menu. Move old MenuTrigger className/isDisabled/onPress to the Button. Keep wrapper isOpen/onOpenChange on new MenuTrigger. Preserve MenuItem IDs, textValue, onAction and accessible names.

## Context menu before (v3)

```tsx
import { Button } from "@/components/ui/button"
import { ContextMenu, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu"

export function ContextActions() {
  return (
    <ContextMenu>
      <Button>Project actions</Button>
      <ContextMenuContent>
        <ContextMenuItem id="rename">Rename</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

## Context menu after (v4)

```tsx
import { Button } from "@/components/ui/button"
import { MenuTrigger, Menu, MenuItem } from "@/components/ui/menu"

export function ContextActions() {
  return (
    <MenuTrigger trigger="contextMenu">
      <Button>Project actions</Button>
      <Menu>
        <MenuItem id="rename">Rename</MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
```

Map ContextMenuHeader/Label/Description/Section/Separator/Shortcut/Item to corresponding Menu exports; ContextMenuSub → MenuSubMenu. Move ContextMenuContent's placement/offset/crossOffset to the new Menu's `popover` object according to local types. A custom contextual region may use React Aria Pressable; make it keyboard reachable and named. Test all interaction modes.

## Popover before (v3)

```tsx
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverBody,
} from "@/components/ui/popover"

export function Details() {
  return (
    <Popover>
      <Button>Details</Button>
      <PopoverContent aria-label="Details">
        <PopoverHeader>
          <PopoverTitle>Details</PopoverTitle>
        </PopoverHeader>
        <PopoverBody>Project</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
```

## Popover after (v4)

```tsx
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverHeader, PopoverTitle, PopoverBody } from "@/components/ui/popover"

export function Details() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onPress={() => setIsOpen(true)}
      >
        Details
      </Button>
      <Popover
        triggerRef={triggerRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        aria-label="Details"
      >
        <PopoverHeader>
          <PopoverTitle>Details</PopoverTitle>
        </PopoverHeader>
        <PopoverBody>Project</PopoverBody>
      </Popover>
    </>
  )
}
```

Use the installed Popover implementation's content semantics. Explicitly test accessible role, focus entry/return and dismissal for controlled floating content; typechecking does not prove these interactions. Preserve placement/arrow/offset and the actual trigger element.

Sources: [v3 modal](https://github.com/irsyadadl/intentui/blob/3.x/src/components/ui/modal.tsx), [v4 dialog](https://github.com/irsyadadl/intentui/blob/4.x/src/components/ui/dialog.tsx), [v3 sheet](https://github.com/irsyadadl/intentui/blob/3.x/src/components/ui/sheet.tsx), [v4 sheet](https://github.com/irsyadadl/intentui/blob/4.x/src/components/ui/sheet.tsx), [v4 menu](https://github.com/irsyadadl/intentui/blob/4.x/src/components/ui/menu.tsx), [v4 popover](https://github.com/irsyadadl/intentui/blob/4.x/src/components/ui/popover.tsx).
