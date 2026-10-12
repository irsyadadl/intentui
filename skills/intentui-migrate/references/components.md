# Verified component mappings

The mappings and complete before/after TSX examples below are self-contained for independent installation. Verify customized APIs against the source links at the end.

| Family       | v3 imports/composition                                                      | v4 imports/composition                                                                           | Prop/type/export change                                                                                                                | Safety and behavior                                                                                                                                |
| ------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Modal        | `modal`: Modal → Button + ModalContent, ModalHeader/Title/Body/Footer/Close | `dialog`: DialogTrigger → Button + Dialog, DialogHeader/Title/Body/Footer/Close                  | modal module removed; surface interface becomes exported DialogProps (v3 ModalContentProps was internal); move surface props to Dialog | structural conversion; preserve title/role/dismissal/open state/focus; customized source needs review                                              |
| Inner Dialog | `dialog`: Dialog around primitive content; DialogTrigger is a button        | `dialog`: Dialog includes modal overlay; DialogTrigger is a container                            | DialogProps now includes overlay/sizing props; old trigger button props belong on a Button                                             | not a safe global rename; check nested overlays and popovers                                                                                       |
| Sheet        | Sheet → Button + SheetContent                                               | SheetTrigger → Button + Sheet                                                                    | SheetContent/SheetContentProps removed; SheetProps replaces surface type; `position`, not `side`                                       | isFloat default changes true → false; preserve explicitly if desired; gestures/snap points/focus need review                                       |
| Menu         | Menu → button-like MenuTrigger + MenuContent                                | MenuTrigger → Button + Menu                                                                      | MenuContent/MenuContentProps/menuContentStyles removed; MenuProps/menuStyles replace them; old MenuTriggerProps removed                | move button props/onPress to Button, open state to wrapper, collection/action/selection props to Menu; keyboard/submenus require testing           |
| Context Menu | context-menu: ContextMenu + ContextMenuContent/Item/etc.                    | menu: MenuTrigger trigger="contextMenu" + Menu/MenuItem/etc.                                     | entire context-menu module removed; ContextMenuSub maps to MenuSubMenu                                                                 | trigger must support contextual interaction; preserve offsets via Menu popover; test keyboard/right-click/long press                               |
| Popover      | Popover → Button + PopoverContent; PopoverTrigger button alias              | Popover is the floating surface, controlled trigger ref/state or verified React Aria composition | PopoverContent/PopoverContentProps/PopoverTrigger removed; PopoverProps includes surface arrow/ref options                             | old outer Popover cannot be replaced blindly; do not put the new modal Dialog inside it as an inner primitive                                      |
| Tooltip      | tooltip: Tooltip → trigger + TooltipContent                                 | tooltip: TooltipTrigger → trigger + Tooltip                                                      | TooltipContent removed; TooltipProps is the content type                                                                               | Move timing/open-state props to TooltipTrigger; positioning/appearance to Tooltip; preserve focusable/nameable trigger and test hover/focus/Escape |

Modal child aliases generally map prefix `Modal` → `Dialog` (Header, Title, Description, Body, Footer, Close). `ModalTrigger` was a button alias, whereas v4 DialogTrigger is a container: replace old button usage with Button inside DialogTrigger. Do not rename that alias mechanically.

## Replacing v3 button-like triggers

Apply this rule to every migrated use of `ModalTrigger`, `DialogTrigger`, `SheetTrigger`, `MenuTrigger`, `PopoverTrigger`, or `TooltipTrigger` that renders a button in the installed v3 source. Resolve aliased imports and local re-exports too: the component's implementation determines its role, not its name alone.

- Replace the old button element with `Button` imported from the exact subpath `react-aria-components/Button`. Do not import the replacement from `@/components/ui/button`, another configured UI alias, or the React Aria root barrel. The Intent UI Button can introduce default styling that the old trigger did not have.
- Compose the React Aria Button with the appropriate v4 trigger wrapper and overlay. A v4 `MenuTrigger` or `DialogTrigger` is a wrapper, not the clickable button; never put the old button children/props directly on that wrapper.
- Move button attributes, `className`, `style`, `isDisabled`, `onPress`, accessible names, refs and render-function children to the React Aria Button. Keep overlay open state on the wrapper. Preserve existing styles and interaction handlers.
- React Aria Button does not accept Intent UI styling props such as `intent` or `size`. If a customized old trigger supports them, resolve their styling through the project's existing button style helper/classes and apply it to the React Aria Button; do not forward unsupported props or silently discard their appearance.
- If the file also uses an existing Intent UI Button, keep that import for those existing buttons and alias the new primitive: `import { Button as AriaButton } from "react-aria-components/Button"`. Use `<AriaButton>` only for the replaced trigger. Remove obsolete trigger imports and update affected button types to `ButtonProps` from the same React Aria subpath.

Examples below that already use an Intent UI Button in v3 preserve it in v4. That is different from replacing an old button-like trigger: a v3 `<MenuTrigger>` must become the React Aria Button shown in the Menu example. Apply the same replacement rule to old button-like triggers in the other families even when their examples use an existing UI Button.

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
import { Button } from "react-aria-components/Button"
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

## Tooltip before (v3)

```tsx
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent } from "@/components/ui/tooltip"

export function DuplicateHint() {
  return (
    <Tooltip delay={0}>
      <Button intent="outline">Duplicate</Button>
      <TooltipContent placement="top" arrow>
        Duplicate project
      </TooltipContent>
    </Tooltip>
  )
}
```

## Tooltip after (v4)

```tsx
import { Button } from "@/components/ui/button"
import { TooltipTrigger, Tooltip } from "@/components/ui/tooltip"

export function DuplicateHint() {
  return (
    <TooltipTrigger delay={0}>
      <Button intent="outline">Duplicate</Button>
      <Tooltip placement="top" arrow>
        Duplicate project
      </Tooltip>
    </TooltipTrigger>
  )
}
```

Change wrapper and surface imports/JSX together. Wrapper state/timing remains on TooltipTrigger; placement/arrow/inverse/offset remains on the Tooltip surface. Earlier v4 copies may still expose TooltipContent: read installed source first. A local customized Tooltip must preserve behavior and styles; this change is manual, not included in the Modal codemod. Inspect dependent wrappers such as Sidebar and Tracker for old usage. Never globally replace every Tooltip identifier.
