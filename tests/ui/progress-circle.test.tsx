import { describe, it, expect } from "vitest"
import { render, screen } from "../utils/render"
import { ProgressCircle } from "@/components/ui/progress-circle"

describe("ProgressCircle", () => {
  it("exposes its label, range and current value", () => {
    const { rerender } = render(<ProgressCircle aria-label="Upload" value={25}></ProgressCircle>)
    const control = screen.getByRole("progressbar", { name: "Upload" })
    expect(control).toHaveAttribute("aria-valuenow", "25")
    expect(control).toHaveAttribute("aria-valuemin", "0")
    expect(control).toHaveAttribute("aria-valuemax", "100")
    rerender(<ProgressCircle aria-label="Upload" value={75}></ProgressCircle>)
    expect(control).toHaveAttribute("aria-valuenow", "75")
    expect(control).toHaveAttribute("aria-valuetext", "75%")
  })
})

it("ProgressCircle omits a numeric value when indeterminate", () => {
  render(<ProgressCircle aria-label="Loading" isIndeterminate></ProgressCircle>)
  expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow")
})
