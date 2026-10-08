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
  DialogCloseIcon,
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
    Pick<SheetContentPrimitiveProps, "aria-label" | "role" | "aria-labelledby" | "children"> {
  closeButton?: boolean
  isFloat?: boolean
  position?: SheetOverlayProps["position"]
  overlay?: Omit<SheetOverlayProps, "children" | "position">
}

const positionVariants = {
  top: "[--sheet-stack-y:24px] w-full rounded-b-2xl border-b data-[float=true]:mx-2 data-[float=true]:mt-2 data-[float=true]:w-[calc(100%-1rem)] data-[float=true]:border-b-0",
  bottom:
    "[--sheet-stack-y:-24px] w-full rounded-t-2xl border-t data-[float=true]:mx-2 data-[float=true]:mb-2 data-[float=true]:w-[calc(100%-1rem)] data-[float=true]:border-t-0",
  left: "[--sheet-stack-x:24px] h-dvh w-3/4 border-r sm:max-w-80 data-[float=true]:my-2 data-[float=true]:ml-2 data-[float=true]:h-[calc(100dvh-1rem)] data-[float=true]:border-r-0",
  right:
    "[--sheet-stack-x:-24px] h-dvh w-3/4 border-l sm:max-w-80 data-[float=true]:my-2 data-[float=true]:mr-2 data-[float=true]:h-[calc(100dvh-1rem)] data-[float=true]:border-l-0",
  center: "w-[calc(100%-2rem)] max-w-lg rounded-2xl border data-[float=true]:border-0",
}

const SheetContent = ({
  className,
  position = "bottom",
  role = "dialog",
  closeButton = true,
  isFloat = true,
  overlay,
  children,
  snapPoints,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  preventDismissal = role === "alertdialog",
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
  const isDismissable = !(overlay?.preventDismissal ?? preventDismissal)
  return (
    <SheetOverlay
      {...props}
      {...overlay}
      snapPoints={snapPoints}
      position={position}
      preventDismissal={!isDismissable}
      className={cx("z-50", overlay?.className)}
    >
      <SheetBackdrop
        swipeAnimation="sheet-backdrop"
        className="bg-black/15 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out entering:duration-300 exiting:duration-300"
        swipeAnimationRange={snapPoints ? { start: snapPoints.length - 1 } : undefined}
      />
      <SheetPrimitive
        stackAnimation="sheet-stack"
        data-float={isFloat}
        className={cx(
          "react-aria-sheet origin-top transition-transform motion-reduce:transition-none grid gap-4 [--sheet-gap:0px] data-[float=true]:[--sheet-gap:16px] border-fg/20 bg-overlay text-overlay-fg shadow-lg dark:border-border",
          "data-[float=true]:rounded-lg data-[float=true]:ring data-[float=true]:ring-fg/5 dark:data-[float=true]:ring-border",
          positionVariants[resolvedPosition],
          className
        )}
      >
        <SheetContentPrimitive
          data-slot="dialog"
          className="peer/dialog group/dialog relative flex max-h-[calc(var(--visual-viewport-height)-var(--sheet-gap))] flex-col overflow-hidden outline-hidden [--gutter:--spacing(6)]"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          role={role}
        >
          {(values) => (
            <>
              {typeof children === "function" ? children(values) : children}
              {closeButton && (
                <DialogCloseIcon className="end-2.5 top-2.5" isDismissable={isDismissable} />
              )}
            </>
          )}
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
