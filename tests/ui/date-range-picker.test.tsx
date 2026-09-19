import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { parseDate } from "@internationalized/date"
import { DateRangePicker, DateRangePickerTrigger } from "@/components/ui/date-range-picker"
import { Label } from "@/components/ui/field"

describe("DateRangePicker", () => {
  it("opens its calendar and dismisses with Escape", async () => {
    const user = userEvent.setup()
    render(
      <DateRangePicker
        defaultValue={{ start: parseDate("2026-09-18"), end: parseDate("2026-09-23") }}
      >
        <Label>Trip</Label>
        <DateRangePickerTrigger />
      </DateRangePicker>
    )
    await user.click(screen.getByRole("button"))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("grid")).toHaveAccessibleName(/September 2026/)
    await user.keyboard("[Escape]")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
  it("does not open when disabled", async () => {
    render(
      <DateRangePicker aria-label="Trip" isDisabled>
        <DateRangePickerTrigger />
      </DateRangePicker>
    )
    const trigger = screen.getByRole("button")
    await userEvent.setup().click(trigger)
    expect(trigger).toBeDisabled()
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})
