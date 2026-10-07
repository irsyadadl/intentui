"use client"

import { useRef, useState } from "react"
import { parseColor } from "react-aria-components/ColorArea"
import { ControlledValues } from "@/components/examples/colors/controlled-values"
import { Button } from "@/components/ui/button"
import { ColorArea } from "@/components/ui/color-area"
import { ColorField } from "@/components/ui/color-field"
import { ColorPicker } from "@/components/ui/color-picker"
import { ColorSlider, ColorSliderTrack } from "@/components/ui/color-slider"
import { ColorSwatch } from "@/components/ui/color-swatch"
import { ColorThumb } from "@/components/ui/color-thumb"
import { Input } from "@/components/ui/input"
import { Popover, PopoverBody } from "@/components/ui/popover"

export default function ColorPickerControlledDemo() {
  const [color, setColor] = useState(parseColor("hsl(216, 98%, 52%)"))

  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
      <ColorPicker value={color} onChange={setColor} defaultValue="rgb(120,140,200)">
        <Button
          ref={triggerRef}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onPress={() => setIsOpen(true)}
          intent="plain"
          data-slot="control"
        >
          <ColorSwatch />
          Select color
        </Button>
        <Popover
          aria-label="Choose color"
          triggerRef={triggerRef}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          className="[--gutter:--spacing(1)]"
        >
          <PopoverBody>
            <div className="space-y-(--gutter)">
              <ColorArea
                colorSpace="rgb"
                defaultValue="rgb(120,140,200)"
                xChannel="red"
                yChannel="green"
                xName="red"
                yName="green"
              />
              <ColorSlider colorSpace="hsb" channel="hue">
                <ColorSliderTrack>
                  <ColorThumb />
                </ColorSliderTrack>
              </ColorSlider>
              <ColorField aria-label="Color">
                <Input />
              </ColorField>
            </div>
          </PopoverBody>
        </Popover>
      </ColorPicker>
      <ControlledValues color={color} />
    </div>
  )
}
