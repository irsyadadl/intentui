import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { parseDate } from "@internationalized/date"
import { DatePicker, DatePickerTrigger } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/field"

describe("DatePicker", () => {
  it("opens its calendar and dismisses with Escape", async () => {
    const user = userEvent.setup()
    render(
      <DatePicker defaultValue={parseDate("2026-09-18")}>
        <Label>Trip</Label>
        <DatePickerTrigger />
      </DatePicker>
    )
    await user.click(screen.getByRole("button"))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("grid")).toHaveAccessibleName(/September 2026/)
    await user.keyboard("[Escape]")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
  it("does not open when disabled", async () => {
    render(
      <DatePicker aria-label="Trip" isDisabled>
        <DatePickerTrigger />
      </DatePicker>
    )
    const trigger = screen.getByRole("button")
    await userEvent.setup().click(trigger)
    expect(trigger).toBeDisabled()
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})
