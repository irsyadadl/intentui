import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { Slider, SliderTrack, SliderOutput } from "@/components/ui/slider"
import { Label } from "@/components/ui/field"

describe("Slider", () => {
  it("increments by the configured step and updates output", async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(
      <Slider defaultValue={20} step={5} onChange={onChange}>
        <Label>Volume</Label>
        <SliderOutput />
        <SliderTrack />
      </Slider>
    )
    await user.tab()
    await user.keyboard("[ArrowRight]")
    expect(screen.getByRole("slider", { name: "Volume" })).toHaveValue("25")
    expect(onChange).toHaveBeenLastCalledWith(25)
    expect(screen.getByText("25")).toBeInTheDocument()
  })
  it("disables its default thumb", () => {
    render(
      <Slider aria-label="Volume" isDisabled defaultValue={20}>
        <SliderTrack />
      </Slider>
    )
    expect(screen.getByRole("slider")).toBeDisabled()
  })
})
