import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { Button } from "@/components/ui/button"

describe("Button", () => {
  it.each(["mouse", "keyboard"])("activates with %s", async (interaction) => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Button onPress={onChange}>Save</Button>)
    const button = screen.getByRole("button", { name: "Save" })
    if (interaction === "mouse") await user.click(button)
    else {
      await user.tab()
      await user.keyboard("[Enter]")
    }
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(button).toHaveFocus()
  })
  it("blocks activation when disabled", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Button isDisabled onPress={onChange}>
        Save
      </Button>
    )
    await user.click(screen.getByRole("button", { name: "Save" }))
    expect(onChange).not.toHaveBeenCalled()
  })
})
