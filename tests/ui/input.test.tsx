import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { Input } from "@/components/ui/input"
import { TextField } from "@/components/ui/text-field"
import { Label } from "@/components/ui/field"

describe("Input", () => {
  it("connects its label and forwards user input", async () => {
    const onChange = vi.fn()
    render(
      <TextField onChange={onChange}>
        <Label>Message</Label>
        <Input />
      </TextField>
    )
    await userEvent.setup().type(screen.getByRole("textbox", { name: "Message" }), "Hello")
    expect(screen.getByRole("textbox")).toHaveValue("Hello")
    expect(onChange).toHaveBeenLastCalledWith("Hello")
  })
  it("inherits read-only state from the field", async () => {
    render(
      <TextField isReadOnly defaultValue="Saved">
        <Label>Message</Label>
        <Input />
      </TextField>
    )
    await userEvent.setup().type(screen.getByRole("textbox"), "edit")
    expect(screen.getByRole("textbox")).toHaveValue("Saved")
  })
})
