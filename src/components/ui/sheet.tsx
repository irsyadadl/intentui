"use client"

import {
  Sheet as SheetPrimitive,
  SheetBackdrop,
  SheetContent as SheetContentPrimitive,
  type SheetContentProps as SheetContentPrimitiveProps,
  SheetOverlay,
  type SheetOverlayProps,
  SheetTrigger as SheetTriggerPrimitive,
} from "react-aria-components/Sheet"
import { useLocale } from "@react-aria/i18n"
import { cx } from "@/lib/primitive"
import {
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

const Sheet = SheetTriggerPrimitive

interface SheetContentProps
  extends
    Omit<SheetOverlayProps, "children" | "position">,
    Pick<SheetContentPrimitiveProps, "children"> {
  isFloat?: boolean
  position?: SheetOverlayProps["position"]
  overlay?: Omit<SheetOverlayProps, "children" | "position">
}

const positionVariants = {
  top: "[--sheet-stack-y:8px] w-full max-w-[800px] rounded-b-2xl border-b data-[float=true]:mx-2 data-[float=true]:mt-2 data-[float=true]:w-[calc(100%-1rem)] data-[float=true]:border-b-0",
  bottom:
    "[--sheet-stack-y:-8px] w-full max-w-[800px] rounded-t-2xl border-t data-[float=true]:mx-2 data-[float=true]:mb-2 data-[float=true]:w-[calc(100%-1rem)] data-[float=true]:border-t-0",
  left: "[--sheet-stack-x:8px] h-dvh w-3/4 border-r sm:max-w-80 data-[float=true]:my-2 data-[float=true]:ml-2 data-[float=true]:h-[calc(100dvh-1rem)] data-[float=true]:border-r-0",
  right:
    "[--sheet-stack-x:-8px] h-dvh w-3/4 border-l sm:max-w-80 data-[float=true]:my-2 data-[float=true]:mr-2 data-[float=true]:h-[calc(100dvh-1rem)] data-[float=true]:border-l-0",
  center: "w-[calc(100%-2rem)] max-w-lg rounded-2xl border data-[float=true]:border-0",
}

const SheetContent = ({
  className,
  position = "bottom",
  isFloat = true,
  overlay,
  children,
  snapPoints,
  preventDismissal,
  ...props
}: SheetContentProps) => {
  const { direction } = useLocale()
  const resolvedPosition =
    position === "start"
      ? direction === "rtl"
        ? "right"
        : "left"
      : position === "end"
        ? direction === "rtl"
          ? "left"
          : "right"
        : position
  return (
    <SheetOverlay
      {...props}
      {...overlay}
      snapPoints={snapPoints}
      position={position}
      preventDismissal={preventDismissal}
      className={cx("z-50", overlay?.className)}
    >
      <SheetBackdrop
        swipeAnimation="sheet-backdrop"
        className="data-[stack-index='0']:bg-black/15"
        swipeAnimationRange={snapPoints ? { start: snapPoints.length - 1 } : undefined}
      />
      <SheetPrimitive
        stackAnimation="sheet-scale-back"
        data-float={isFloat}
        className={cx(
          "react-aria-sheet relative origin-top transition-transform motion-reduce:transition-none [--sheet-gap:0px] data-[float=true]:[--sheet-gap:16px] border-fg/20 bg-overlay text-overlay-fg shadow-lg dark:border-border",
          "data-[float=true]:rounded-lg data-[float=true]:ring data-[float=true]:ring-fg/5 dark:data-[float=true]:ring-border",
          positionVariants[resolvedPosition],
          className
        )}
      >
        {!preventDismissal && position === "bottom" && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-fg/30"
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

const SheetTrigger = DialogTrigger
const SheetFooter = DialogFooter
const SheetHeader = DialogHeader
const SheetTitle = DialogTitle
const SheetDescription = DialogDescription
const SheetBody = DialogBody
const SheetClose = DialogClose

export type { SheetContentProps }
export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
}
