"use client"

import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid"
import { Button as PrimitiveButton, type ButtonProps } from "react-aria-components/Button"
import { type InputProps } from "react-aria-components/Input"
import {
  NumberField as NumberFieldPrimitive,
  type NumberFieldProps,
} from "react-aria-components/NumberField"
import { Input, InputGroup } from "@/components/ui/input"
import { cx } from "@/lib/primitive"
import { fieldStyles } from "./field"

export function NumberField({ className, ...props }: NumberFieldProps) {
  return (
    <NumberFieldPrimitive {...props} data-slot="control" className={cx(fieldStyles(), className)} />
  )
}

export function NumberInput({ className, ...props }: InputProps) {
  return (
    <InputGroup className="[--input-gutter-end:--spacing(20)]">
      <Input className={cx("tabular-nums", className)} {...props} />
      <div
        data-slot="text"
        className="pointer-events-auto end-0 p-px in-disabled:pointer-events-none in-disabled:opacity-50"
      >
        <div className="flex h-full items-center divide-x overflow-hidden rounded-e-[calc(var(--radius-lg)-1px)] border-s">
          <StepperButton slot="decrement" />
          <StepperButton slot="increment" />
        </div>
      </div>
    </InputGroup>
  )
}

export interface StepperButtonProps extends ButtonProps {
  slot: "increment" | "decrement"
  className?: string
}

export function StepperButton({ slot, className, ...props }: StepperButtonProps) {
  return (
    <PrimitiveButton
      className={cx(
        "pressed:text-foreground text-muted-foreground enabled:hover:text-foreground inline-grid place-content-center",
        "bg-input/20 pressed:bg-input/60 size-full min-w-11 grow sm:min-w-8.5",
        "*:data-[slot=stepper-icon]:size-5 sm:*:data-[slot=stepper-icon]:size-4",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      slot={slot}
      {...props}
    >
      {slot === "increment" ? (
        <PlusIcon data-slot="stepper-icon" />
      ) : (
        <MinusIcon data-slot="stepper-icon" />
      )}
    </PrimitiveButton>
  )
}
