import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { Toggle } from "@/components/ui/toggle"

describe("Toggle", () => {
  it.each(["mouse", "keyboard"])("activates with %s", async (interaction) => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Toggle onChange={onChange}>Save</Toggle>)
    const button = screen.getByRole("button", { name: "Save" })
    if (interaction === "mouse") await user.click(button)
    else {
      await user.tab()
      await user.keyboard("[Enter]")
    }
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(button).toHaveAttribute("aria-pressed", "true")
  })
  it("blocks activation when disabled", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Toggle isDisabled onChange={onChange}>
        Save
      </Toggle>
    )
    await user.click(screen.getByRole("button", { name: "Save" }))
    expect(onChange).not.toHaveBeenCalled()
  })
})
