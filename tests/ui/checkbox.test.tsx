import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { Checkbox, CheckboxField } from "@/components/ui/checkbox"

describe("Checkbox", () => {
  it.each(["mouse", "keyboard"])("toggles with %s and reports the value", async (interaction) => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <CheckboxField onChange={onChange}>
        <Checkbox>Notifications</Checkbox>
      </CheckboxField>
    )
    const control = screen.getByRole("checkbox", { name: "Notifications" })
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
      <CheckboxField isDisabled isSelected onChange={onChange}>
        <Checkbox>Notifications</Checkbox>
      </CheckboxField>
    )
    await userEvent.setup().click(screen.getByRole("checkbox"))
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getByRole("checkbox")).toBeChecked()
    rerender(
      <CheckboxField isSelected={false}>
        <Checkbox>Notifications</Checkbox>
      </CheckboxField>
    )
    expect(screen.getByRole("checkbox")).not.toBeChecked()
  })
})

import { User } from "@react-aria/test-utils"
import { Label } from "@/components/ui/field"
import { CheckboxGroup } from "@/components/ui/checkbox"
const ariaUser = new User({ interactionType: "mouse" })
it("CheckboxGroup keeps independent selections and reports values", async () => {
  const onChange = vi.fn()
  render(
    <CheckboxGroup onChange={onChange}>
      <Label>Topics</Label>
      <CheckboxField value="react">
        <Checkbox>React</Checkbox>
      </CheckboxField>
      <CheckboxField value="css">
        <Checkbox>CSS</Checkbox>
      </CheckboxField>
    </CheckboxGroup>
  )
  const tester = ariaUser.createTester("CheckboxGroup", {
    root: screen.getByRole("group", { name: "Topics" }),
  })
  await tester.toggleCheckbox({ checkbox: "React" })
  await tester.toggleCheckbox({ checkbox: "CSS" })
  expect(tester.getSelectedCheckboxes()).toHaveLength(2)
  expect(onChange).toHaveBeenLastCalledWith(["react", "css"])
})
