"use client"

import {
  Sheet as SheetPrimitive,
  SheetBackdrop,
  SheetContent as SheetContentPrimitive,
  SheetOverlay,
  type SheetOverlayProps,
  type SheetProps as SheetPrimitiveProps,
  SheetTrigger as SheetTriggerPrimitive,
} from "react-aria-components/Sheet"
import { cx } from "@/lib/primitive"
import {
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { type DialogProps } from "react-aria-components/Dialog"

const SheetTrigger = SheetTriggerPrimitive

const positionVariants = {
  top: "[--sheet-stack-y:8px] w-full max-w-[800px] rounded-b-4xl border-b data-[float=false]:border-x data-[float=true]:mx-2 data-[float=true]:mt-2 data-[float=true]:w-[calc(100%-1rem)] data-[float=true]:border-b-0",
  bottom:
    "[--sheet-stack-y:-8px] w-full max-w-[800px] rounded-t-4xl border-t data-[float=false]:border-x data-[float=true]:mx-2 data-[float=true]:mb-2 data-[float=true]:w-[calc(100%-1rem)] data-[float=true]:border-t-0",
  left: "[--sheet-stack-x:8px] h-dvh w-3/4 border-r sm:max-w-80 data-[float=true]:my-2 data-[float=true]:ml-2 data-[float=true]:h-[calc(100dvh-1rem)] data-[float=true]:border-r-0",
  right:
    "[--sheet-stack-x:-8px] h-dvh w-3/4 border-l sm:max-w-80 data-[float=true]:my-2 data-[float=true]:mr-2 data-[float=true]:h-[calc(100dvh-1rem)] data-[float=true]:border-l-0",
  start:
    "[--sheet-stack-x:8px] rtl:[--sheet-stack-x:-8px] h-dvh w-3/4 border-e sm:max-w-80 data-[float=true]:my-2 data-[float=true]:ms-2 data-[float=true]:h-[calc(100dvh-1rem)] data-[float=true]:border-e-0",
  end: "[--sheet-stack-x:-8px] rtl:[--sheet-stack-x:8px] h-dvh w-3/4 border-s sm:max-w-80 data-[float=true]:my-2 data-[float=true]:me-2 data-[float=true]:h-[calc(100dvh-1rem)] data-[float=true]:border-s-0",
  center: "w-[calc(100%-2rem)] max-w-lg rounded-2xl border data-[float=true]:border-0",
}

interface SheetProps
  extends
    Omit<SheetOverlayProps, "children">,
    Pick<SheetPrimitiveProps, "swipeAnimation" | "swipeAnimationRange"> {
  isFloat?: boolean
  children?: DialogProps["children"]
  overlay?: Omit<SheetOverlayProps, "children" | "position">
  overscrollPadding?: boolean
}

const Sheet = ({
  className,
  position = "bottom",
  isFloat = false,
  overlay,
  children,
  snapPoints,
  preventDismissal,
  ...props
}: SheetProps) => {
  return (
    <SheetOverlay
      {...props}
      {...overlay}
      position={position}
      snapPoints={snapPoints}
      preventDismissal={preventDismissal}
      className={cx("z-50", overlay?.className)}
    >
      <SheetBackdrop
        swipeAnimation="sheet-backdrop"
        className="bg-black/15 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out entering:duration-300 exiting:duration-300"
        swipeAnimationRange={snapPoints ? { start: snapPoints.length - 1 } : undefined}
      />
      <SheetPrimitive
        overscrollPadding={isFloat ? false : (props.overscrollPadding ?? true)}
        stackAnimation="sheet-scale-back"
        data-float={isFloat}
        className={cx(
          "react-aria-sheet relative box-content shrink-0 origin-top transition-transform motion-reduce:transition-none [--sheet-gap:0px] data-[float=true]:[--sheet-gap:16px] border-foreground/20 bg-overlay text-overlay-foreground shadow-lg dark:border-border",
          "data-[float=true]:rounded-lg data-[float=true]:ring data-[float=true]:ring-foreground/5 dark:data-[float=true]:ring-border",
          positionVariants[position],
          className
        )}
      >
        {!preventDismissal && position === "bottom" && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-foreground/30"
          />
        )}
        <SheetContentPrimitive
          data-slot="dialog"
          className="peer/dialog group/dialog relative flex max-h-[calc(var(--visual-viewport-height)-var(--sheet-gap))] flex-col overflow-hidden outline-hidden [--gutter:--spacing(6)]"
        >
          {children}
        </SheetContentPrimitive>
      </SheetPrimitive>
    </SheetOverlay>
  )
}

const SheetFooter = DialogFooter
const SheetHeader = DialogHeader
const SheetTitle = DialogTitle
const SheetDescription = DialogDescription
const SheetBody = DialogBody
const SheetClose = DialogClose

export type { SheetProps }
export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
}
