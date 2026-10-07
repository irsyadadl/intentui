"use client"

import {
  OverlayArrow,
  Popover as PopoverPrimitive,
  type PopoverProps as PopoverPrimitiveProps,
} from "react-aria-components/Popover"
import { cx } from "@/lib/primitive"
import {
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"

const PopoverTitle = DialogTitle
const PopoverHeader = DialogHeader
const PopoverBody = DialogBody
const PopoverFooter = DialogFooter

interface PopoverProps extends PopoverPrimitiveProps {
  arrow?: boolean
  ref?: React.Ref<HTMLDivElement>
}

const Popover = ({ children, arrow = false, className, ref, ...props }: PopoverProps) => {
  const offset = props.offset ?? (arrow ? 12 : 8)
  return (
    <PopoverPrimitive
      ref={ref}
      offset={offset}
      className={cx(
        "[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:32px]",
        "max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)*2)]",
        "group/popover min-w-(--trigger-width) max-w-xs origin-(--trigger-anchor-point) rounded-(--popover-radius) bg-overlay text-overlay-foreground shadow-xs outline-hidden ring ring-muted-foreground/20 drop-shadow-xl transition-transform [--gutter:--spacing(6)] [--popover-radius:var(--radius-lg)] sm:text-sm dark:ring-border dark:backdrop-saturate-200 **:[[role=dialog]]:[--gutter:--spacing(6)]",
        "entering:fade-in exiting:fade-out entering:animate-in exiting:animate-out",
        "placement-left:entering:slide-in-from-right-1 placement-right:entering:slide-in-from-left-1 placement-top:entering:slide-in-from-bottom-1 placement-bottom:entering:slide-in-from-top-1",
        "placement-left:exiting:slide-out-to-right-1 placement-right:exiting:slide-out-to-left-1 placement-top:exiting:slide-out-to-bottom-1 placement-bottom:exiting:slide-out-to-top-1",
        "forced-colors:bg-[Canvas]",
        className
      )}
      {...props}
    >
      {(values) => (
        <>
          {arrow && (
            <OverlayArrow className="group">
              <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                className="block fill-overlay stroke-border group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
              >
                <path d="M0 0 L6 6 L12 0" />
              </svg>
            </OverlayArrow>
          )}
          <div data-slot="popover-inner" className="max-h-[inherit] overflow-y-auto flex flex-col">
            {typeof children === "function" ? children(values) : children}
          </div>
        </>
      )}
    </PopoverPrimitive>
  )
}

const PopoverClose = DialogClose
const PopoverDescription = DialogDescription

export type { PopoverProps }
export {
  PopoverBody,
  PopoverClose,
  Popover,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
}
