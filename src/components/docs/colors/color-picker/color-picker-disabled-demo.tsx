"use client"

import { useState } from "react"

import { ColorPicker } from "@/components/ui/color-picker"
import { parseColor } from "react-aria-components"

export default function ColorPickerDisabledDemo() {
  const [color, setColor] = useState(parseColor("hsl(216, 98%, 52%)"))
  return <ColorPicker isDisabled label="Color Picker" value={color} onChange={setColor} />
}
