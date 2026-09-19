import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { NumberField, NumberInput } from "@/components/ui/number-field"
import { Label } from "@/components/ui/field"

describe("NumberField", () => {
  it("wires both stepper buttons and respects bounds", async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(
      <NumberField defaultValue={1} minValue={0} maxValue={2} onChange={onChange}>
        <Label>Quantity</Label>
        <NumberInput />
      </NumberField>
    )
    await user.click(screen.getByRole("button", { name: /increase/i }))
    expect(screen.getByRole("textbox", { name: "Quantity" })).toHaveValue("2")
    expect(onChange).toHaveBeenLastCalledWith(2)
    expect(screen.getByRole("button", { name: /increase/i })).toBeDisabled()
    await user.click(screen.getByRole("button", { name: /decrease/i }))
    expect(onChange).toHaveBeenLastCalledWith(1)
  })
  it("disables input and steppers together", () => {
    render(
      <NumberField aria-label="Quantity" isDisabled>
        <NumberInput />
      </NumberField>
    )
    expect(screen.getByRole("textbox")).toBeDisabled()
    for (const button of screen.getAllByRole("button")) expect(button).toBeDisabled()
  })
})
