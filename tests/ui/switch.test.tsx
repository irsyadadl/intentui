import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { Switch, SwitchField } from "@/components/ui/switch"

describe("Switch", () => {
  it.each(["mouse", "keyboard"])("toggles with %s and reports the value", async (interaction) => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <SwitchField onChange={onChange}>
        <Switch>Notifications</Switch>
      </SwitchField>
    )
    const control = screen.getByRole("switch", { name: "Notifications" })
    expect(control).not.toBeChecked()
    if (interaction === "mouse") await user.click(control)
    else {
      await user.tab()
      await user.keyboard("[Space]")
    }
    expect(control).toBeChecked()
    expect(onChange).toHaveBeenLastCalledWith(true)
    await user.click(control)
    expect(control).not.toBeChecked()
  })
  it("honors disabled and controlled state", async () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <SwitchField isDisabled isSelected onChange={onChange}>
        <Switch>Notifications</Switch>
      </SwitchField>
    )
    await userEvent.setup().click(screen.getByRole("switch"))
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getByRole("switch")).toBeChecked()
    rerender(
      <SwitchField isSelected={false}>
        <Switch>Notifications</Switch>
      </SwitchField>
    )
    expect(screen.getByRole("switch")).not.toBeChecked()
  })
})
