import { describe, it, expect } from "vitest"
import { render, screen } from "../utils/render"
import { ProgressBar, ProgressBarTrack, ProgressBarValue } from "@/components/ui/progress-bar"

describe("ProgressBar", () => {
  it("exposes its label, range and current value", () => {
    const { rerender } = render(
      <ProgressBar aria-label="Upload" value={25}>
        <ProgressBarTrack />
        <ProgressBarValue />
      </ProgressBar>
    )
    const control = screen.getByRole("progressbar", { name: "Upload" })
    expect(control).toHaveAttribute("aria-valuenow", "25")
    expect(control).toHaveAttribute("aria-valuemin", "0")
    expect(control).toHaveAttribute("aria-valuemax", "100")
    rerender(
      <ProgressBar aria-label="Upload" value={75}>
        <ProgressBarTrack />
        <ProgressBarValue />
      </ProgressBar>
    )
    expect(control).toHaveAttribute("aria-valuenow", "75")
    expect(screen.getByText("75%")).toBeInTheDocument()
  })
})

it("ProgressBar omits a numeric value when indeterminate", () => {
  render(
    <ProgressBar aria-label="Loading" isIndeterminate>
      <ProgressBarTrack />
      <ProgressBarValue />
    </ProgressBar>
  )
  expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow")
})
