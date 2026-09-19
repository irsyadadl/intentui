import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { parseDate } from "@internationalized/date"
import { within } from "../utils/render"
import { Calendar } from "@/components/ui/calendar"

describe("Calendar", () => {
  it("selects a day and reports its date", async () => {
    const onChange = vi.fn()
    render(
      <Calendar
        aria-label="Appointment"
        defaultValue={parseDate("2026-09-18")}
        onChange={onChange}
      />
    )
    await userEvent.setup().click(screen.getByRole("button", { name: /September 20, 2026/ }))
    expect(onChange.mock.calls.at(-1)![0].toString()).toBe("2026-09-20")
    expect(
      screen.getByRole("button", { name: /September 20, 2026/ }).closest("td")
    ).toHaveAttribute("aria-selected", "true")
  })
  it("navigates months using header buttons", async () => {
    render(<Calendar aria-label="Appointment" defaultValue={parseDate("2026-09-18")} />)
    await userEvent
      .setup()
      .click(within(screen.getByRole("banner")).getByRole("button", { name: "Next" }))
    expect(screen.getByRole("grid")).toHaveAccessibleName(/October 2026/)
  })
  it("exposes unavailable days without selecting them", async () => {
    const onChange = vi.fn()
    render(
      <Calendar
        aria-label="Appointment"
        defaultValue={parseDate("2026-09-18")}
        isDateUnavailable={(date) => date.day === 20}
        onChange={onChange}
      />
    )
    const day = screen.getByRole("button", { name: /September 20, 2026/ })
    await userEvent.setup().click(day)
    expect(onChange).not.toHaveBeenCalled()
    expect(day).toHaveAttribute("aria-disabled", "true")
  })
})
