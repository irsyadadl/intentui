import { describe, it, expect } from "vitest"
import { render, screen } from "../utils/render"
import { Loader } from "@/components/ui/loader"

describe("Loader", () => {
  it.each(["ring", "spin"] as const)("announces indeterminate progress for %s", (variant) => {
    render(<Loader variant={variant} aria-label="Saving" />)
    expect(screen.getByRole("progressbar", { name: "Saving" })).not.toHaveAttribute("aria-valuenow")
  })
})
