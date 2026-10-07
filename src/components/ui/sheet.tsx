"use client"

import { useLocale } from "react-aria-components/I18nProvider"
import { type DialogProps, Dialog, DialogTrigger } from "react-aria-components/Dialog"
import { Modal, ModalOverlay, type ModalOverlayProps } from "react-aria-components/Modal"
import { cx } from "@/lib/primitive"
import {
  DialogBody,
  DialogClose,
  DialogCloseIcon,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { cn } from "cn"

const SheetTrigger = DialogTrigger

interface SheetProps
  extends
    Omit<ModalOverlayProps, "children">,
    Pick<DialogProps, "aria-label" | "role" | "aria-labelledby" | "children"> {
  closeButton?: boolean
  isFloat?: boolean
  position?: "bottom" | "top" | "left" | "right" | "start" | "end" | "center"
  overlay?: Omit<ModalOverlayProps, "children">
}

const positionVariants: Record<
  Exclude<NonNullable<SheetProps["position"]>, "start" | "end">,
  string
> = {
  top: "entering:slide-in-from-top exiting:slide-out-to-top inset-x-0 top-0 rounded-b-2xl border-b data-[float=true]:inset-x-2 data-[float=true]:top-2 data-[float=true]:border-b-0",
  bottom:
    "entering:slide-in-from-bottom exiting:slide-out-to-bottom inset-x-0 bottom-0 rounded-t-2xl border-t data-[float=true]:inset-x-2 data-[float=true]:bottom-2 data-[float=true]:border-t-0",
  left: "entering:slide-in-from-left exiting:slide-out-to-left-80 inset-y-0 left-0 h-auto w-3/4 overflow-y-auto border-r sm:max-w-80 data-[float=true]:inset-y-2 data-[float=true]:left-2 data-[float=true]:border-r-0",
  right:
    "entering:slide-in-from-right exiting:slide-out-to-right-80 inset-y-0 right-0 h-auto w-3/4 overflow-y-auto border-l sm:max-w-80 data-[float=true]:inset-y-2 data-[float=true]:right-2 data-[float=true]:border-l-0",
  center:
    "entering:zoom-in-95 exiting:zoom-out-95 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-var(--spacing)*4)] max-w-lg rounded-2xl border data-[float=true]:border-0",
}

const Sheet = ({
  className,
  isDismissable: isDismissableInternal,
  position = "right",
  role = "dialog",
  closeButton = true,
  isFloat = true,
  overlay,
  children,
  ...props
}: SheetProps) => {
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
  const isDismissable = isDismissableInternal ?? role !== "alertdialog"
  return (
    <ModalOverlay
      isDismissable={isDismissable}
      className={cx(
        "entering:fade-in exiting:fade-out fixed start-0 top-0 z-50 size-full entering:animate-in exiting:animate-out overflow-hidden bg-black/15 entering:duration-500 exiting:duration-300",
        overlay?.className
      )}
      {...props}
    >
      <Modal
        data-float={isFloat}
        className={cx(
          "fixed z-50 grid gap-4 border-muted-foreground/20 bg-overlay text-overlay-foreground shadow-lg dark:border-border",
          "transform-gpu transition ease-in-out will-change-transform [--visual-viewport-vertical-padding:16px]",
          "data-[float=true]:rounded-lg data-[float=true]:ring data-[float=true]:ring-foreground/5 dark:data-[float=true]:ring-border",
          "border-foreground/20 dark:border-border",
          "entering:fade-in entering:animate-in entering:duration-500",
          "exiting:fade-out exiting:animate-out exiting:duration-300",
          positionVariants[resolvedPosition],
          className
        )}
      >
        <Dialog
          aria-label={props["aria-label"] ?? undefined}
          aria-labelledby={props["aria-labelledby"]}
          data-slot="dialog"
          role={role}
          className={cn(
            "peer/dialog group/dialog relative flex max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))] flex-col overflow-hidden outline-hidden [--gutter:--spacing(6)]",
            className
          )}
        >
          {(values) => (
            <>
              {typeof children === "function" ? children(values) : children}
              {closeButton && (
                <DialogCloseIcon className="end-2.5 top-2.5" isDismissable={isDismissable} />
              )}
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
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
  SheetTrigger,
  SheetBody,
  SheetClose,
  Sheet,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
}
