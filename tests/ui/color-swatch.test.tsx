import { describe, it, expect } from "vitest"
import { render, screen } from "../utils/render"
import { ColorSwatch } from "@/components/ui/color-swatch"

describe("ColorSwatch", () => {
  it("exposes the selected color to assistive technology", () => {
    const { rerender } = render(<ColorSwatch color="#ff0000" />)
    const swatch = screen.getByRole("img")
    expect(swatch).toHaveAccessibleName(/red/i)
    rerender(<ColorSwatch color="#0000ff" />)
    expect(screen.getByRole("img")).toHaveAccessibleName(/blue/i)
  })
})
