import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { parseDate } from "@internationalized/date"
import { RangeCalendar } from "@/components/ui/range-calendar"

describe("RangeCalendar", () => {
  it("selects start and end dates", async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(
      <RangeCalendar
        aria-label="Trip"
        defaultFocusedValue={parseDate("2026-09-18")}
        onChange={onChange}
      />
    )
    await user.click(screen.getByRole("button", { name: /September 20, 2026/ }))
    await user.click(screen.getByRole("button", { name: /September 23, 2026/ }))
    const range = onChange.mock.calls.at(-1)![0]
    expect(range.start.toString()).toBe("2026-09-20")
    expect(range.end.toString()).toBe("2026-09-23")
  })
  it("renders consecutive months for visibleDuration", () => {
    render(
      <RangeCalendar
        aria-label="Trip"
        defaultFocusedValue={parseDate("2026-09-18")}
        visibleDuration={{ months: 2 }}
      />
    )
    expect(screen.getAllByRole("grid")).toHaveLength(2)
    expect(screen.getAllByRole("grid")[0]).toHaveAccessibleName(/September/)
    expect(screen.getAllByRole("grid")[1]).toHaveAccessibleName(/October/)
  })
})
