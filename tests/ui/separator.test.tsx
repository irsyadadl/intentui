import { it, expect } from "vitest"
import { render, screen } from "../utils/render"
import { Separator } from "@/components/ui/separator"
it("Separator exposes its orientation", () => {
  const { rerender } = render(<Separator orientation="vertical" />)
  expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical")
  rerender(<Separator orientation="horizontal" />)
  expect(screen.getByRole("separator")).not.toHaveAttribute("aria-orientation", "vertical")
})
