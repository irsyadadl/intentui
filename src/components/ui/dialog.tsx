"use client"

import { XMarkIcon } from "@heroicons/react/20/solid"
import { Button as PrimitiveButton } from "react-aria-components/Button"
import {
  DialogTrigger as DialogTriggerPrimitive,
  Dialog as PrimitiveDialog,
  type DialogProps as DialogPrimitiveProps,
} from "react-aria-components/Dialog"
import { Heading, type HeadingProps } from "react-aria-components/Heading"
import type { TextProps } from "react-aria-components/Text"
import { cn } from "cn"
import { cx } from "@/lib/primitive"
import { Button, type ButtonProps } from "./button"
import { Modal, ModalOverlay, type ModalOverlayProps } from "react-aria-components/Modal"

export const DialogTrigger = DialogTriggerPrimitive

const sizes = {
  "2xs": "sm:max-w-2xs",
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
  fullscreen: "",
}

interface DialogProps
  extends
    Omit<ModalOverlayProps, "children">,
    Pick<DialogPrimitiveProps, "aria-label" | "aria-labelledby" | "role" | "children"> {
  size?: keyof typeof sizes
  closeButton?: boolean
  overlay?: Pick<ModalOverlayProps, "className">
}
const Dialog = ({
  className,
  isDismissable: isDismissableInternal,
  children,
  overlay,
  size = "md",
  role = "dialog",
  closeButton = true,
  ...props
}: DialogProps) => {
  const isDismissable = isDismissableInternal ?? role !== "alertdialog"
  return (
    <ModalOverlay
      data-slot="dialog-overlay"
      isDismissable={isDismissable}
      className={cx(
        "fixed start-0 top-0 z-50 h-(--visual-viewport-height,100vh) w-screen",
        "bg-background/15 backdrop-blur-[1px] motion-reduce:backdrop-blur-none",
        "grid grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr]",
        "entering:fade-in entering:animate-in entering:duration-300 entering:ease-out",
        "exiting:fade-out exiting:animate-out exiting:ease-in",
        size === "fullscreen" ? "md:p-3" : "md:p-4",
        overlay?.className
      )}
      {...props}
    >
      <Modal
        data-slot="dialog-content"
        className={cx(
          "row-start-2 w-full text-start align-middle",
          "[--visual-viewport-vertical-padding:16px]",
          size === "fullscreen"
            ? "**:data-[slot=dialog-body]:min-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height)-var(--dialog-footer-height))] sm:[--visual-viewport-vertical-padding:16px]"
            : "sm:[--visual-viewport-vertical-padding:32px]",
          "relative overflow-hidden bg-overlay text-overlay-foreground",
          "inset-shadow-xs rounded-t-2xl ring ring-muted-foreground/25 drop-shadow-xl sm:rounded-2xl dark:ring-border",
          sizes[size],
          "entering:slide-in-from-bottom sm:entering:zoom-in-95 sm:entering:slide-in-from-bottom-0 entering:animate-in entering:duration-300 entering:ease-out",
          "exiting:slide-out-to-bottom sm:exiting:zoom-out-95 sm:exiting:slide-out-to-bottom-0 exiting:animate-out exiting:ease-in",
          className
        )}
      >
        <PrimitiveDialog
          aria-label={props["aria-label"] ?? undefined}
          aria-labelledby={props["aria-labelledby"]}
          data-slot="dialog"
          role={role}
          className={cn(
            "peer/dialog group/dialog relative flex max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding))] flex-col overflow-hidden outline-hidden [--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]",
            className
          )}
        >
          {(values) => (
            <>
              {typeof children === "function" ? children(values) : children}
              {closeButton && <DialogCloseIcon isDismissable={isDismissable} />}
            </>
          )}
        </PrimitiveDialog>
      </Modal>
    </ModalOverlay>
  )
}

interface DialogHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: string
  description?: string
}

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "relative space-y-1 p-(--gutter) pb-[calc(var(--gutter)---spacing(3))]",
        className
      )}
    >
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      {props.description && <DialogDescription>{props.description}</DialogDescription>}
      {!props.title && typeof props.children === "string" ? (
        <DialogTitle>{props.children}</DialogTitle>
      ) : (
        props.children
      )}
    </div>
  )
}

interface DialogTitleProps extends HeadingProps {
  ref?: React.Ref<HTMLHeadingElement>
}
const DialogTitle = ({ className, ref, ...props }: DialogTitleProps) => (
  <Heading
    slot="title"
    ref={ref}
    className={cn("text-balance font-semibold text-foreground text-lg/6 sm:text-base/6", className)}
    {...props}
  />
)

interface DialogDescriptionProps extends TextProps {
  ref?: React.Ref<HTMLDivElement>
}
const DialogDescription = ({ className, ref, ...props }: DialogDescriptionProps) => (
  <p
    data-slot="description"
    className={cn(
      "text-pretty text-base/6 text-muted-foreground group-disabled:opacity-50 sm:text-sm/6",
      className
    )}
    ref={ref}
    {...props}
  />
)

interface DialogBodyProps extends React.ComponentProps<"div"> {}
const DialogBody = ({ className, ...props }: DialogBodyProps) => (
  <div
    data-slot="dialog-body"
    className={cn(
      "isolate flex min-h-0 flex-1 flex-col overflow-auto px-(--gutter) py-1",
      "**:data-[slot=dialog-footer]:px-0 **:data-[slot=dialog-footer]:pt-0",
      className
    )}
    {...props}
  />
)

interface DialogFooterProps extends React.ComponentProps<"div"> {}
const DialogFooter = ({ className, ...props }: DialogFooterProps) => {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "isolate mt-auto flex flex-col-reverse justify-end gap-3 p-(--gutter) pt-[calc(var(--gutter)---spacing(2))] group-not-has-data-[slot=dialog-body]/dialog:pt-0 group-not-has-data-[slot=dialog-body]/popover:pt-0 sm:flex-row",
        className
      )}
      {...props}
    />
  )
}

const DialogClose = ({ intent = "plain", ref, ...props }: ButtonProps) => {
  return <Button slot="close" ref={ref} intent={intent} {...props} />
}

interface CloseButtonIndicatorProps extends Omit<ButtonProps, "children"> {
  className?: string
  isDismissable?: boolean | undefined
}

const DialogCloseIcon = ({ className, ...props }: CloseButtonIndicatorProps) => {
  return props.isDismissable ? (
    <PrimitiveButton
      aria-label="Close dialog"
      slot="close"
      className={cx(
        "close absolute end-1 top-1 z-50 grid size-8 place-content-center rounded-xl hover:bg-secondary focus:bg-secondary focus:outline-hidden focus-visible:ring-1 focus-visible:ring-primary sm:end-2 sm:top-2 sm:size-7 sm:rounded-md",
        className
      )}
    >
      <XMarkIcon className="size-4" />
    </PrimitiveButton>
  ) : null
}

export type {
  CloseButtonIndicatorProps,
  DialogProps,
  DialogBodyProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogTitleProps,
}
export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseIcon,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
}
