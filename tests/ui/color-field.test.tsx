import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { ColorField } from "@/components/ui/color-field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/field"

describe("ColorField", () => {
  it("parses a typed hex color on blur", async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(
      <ColorField defaultValue="#ff0000" onChange={onChange}>
        <Label>Color</Label>
        <Input />
      </ColorField>
    )
    const input = screen.getByRole("textbox", { name: "Color" })
    await user.clear(input)
    await user.type(input, "#00ff00")
    await user.tab()
    expect(onChange.mock.calls.at(-1)![0].toString("hex")).toBe("#00FF00")
    expect(input).toHaveValue("#00FF00")
  })
  it("inherits disabled state", () => {
    render(
      <ColorField aria-label="Color" isDisabled>
        <Input />
      </ColorField>
    )
    expect(screen.getByRole("textbox")).toBeDisabled()
  })
})
