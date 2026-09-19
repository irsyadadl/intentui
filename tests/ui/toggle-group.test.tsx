import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

describe("ToggleGroup", () => {
  it("changes single selection and reports selected keys", async () => {
    const onSelectionChange = vi.fn()
    render(
      <ToggleGroup
        aria-label="Alignment"
        defaultSelectedKeys={["left"]}
        onSelectionChange={onSelectionChange}
      >
        <ToggleGroupItem id="left">Left</ToggleGroupItem>
        <ToggleGroupItem id="right">Right</ToggleGroupItem>
      </ToggleGroup>
    )
    await userEvent.setup().click(screen.getByRole("radio", { name: "Right" }))
    expect(screen.getByRole("radio", { name: "Right" })).toBeChecked()
    expect(screen.getByRole("radio", { name: "Left" })).not.toBeChecked()
    expect(Array.from(onSelectionChange.mock.calls.at(-1)![0])).toEqual(["right"])
  })
  it("allows independent selections in multiple mode", async () => {
    const user = userEvent.setup()
    render(
      <ToggleGroup aria-label="Format" selectionMode="multiple">
        <ToggleGroupItem id="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem id="italic">Italic</ToggleGroupItem>
      </ToggleGroup>
    )
    await user.click(screen.getByRole("button", { name: "Bold" }))
    await user.click(screen.getByRole("button", { name: "Italic" }))
    for (const button of screen.getAllByRole("button"))
      expect(button).toHaveAttribute("aria-pressed", "true")
  })
})
