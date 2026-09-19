import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { ColorArea } from "@/components/ui/color-area"

describe("ColorArea", () => {
  it("changes the color channel using the keyboard", async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(
      <ColorArea
        aria-label="Color"
        defaultValue="hsl(120, 50%, 50%)"
        xChannel="saturation"
        yChannel="lightness"
        onChange={onChange}
      />
    )
    await user.tab()
    await user.keyboard("[ArrowRight]")
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls.at(-1)![0].getChannelValue("saturation")).toBe(51)
  })
  it("disables its color input", () => {
    const onChange = vi.fn()
    render(
      <ColorArea
        isDisabled
        aria-label="Color"
        defaultValue="hsl(120, 50%, 50%)"
        xChannel="saturation"
        yChannel="lightness"
        onChange={onChange}
      />
    )
    for (const slider of screen.getAllByRole("slider")) expect(slider).toBeDisabled()
  })
})
