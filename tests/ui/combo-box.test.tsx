import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { User } from "@react-aria/test-utils"
import { ComboBox, ComboBoxInput, ComboBoxContent, ComboBoxItem } from "@/components/ui/combo-box"
const ariaUser = new User({ interactionType: "mouse" })
const items = [
  { id: "apple", name: "Apple" },
  { id: "pear", name: "Pear" },
]
describe("ComboBox", () => {
  it.each(["mouse", "keyboard"] as const)("selects an option via %s", async (interactionType) => {
    const onChange = vi.fn()
    render(
      <ComboBox data-testid="combo" aria-label="Fruit" onChange={onChange}>
        <ComboBoxInput />
        <ComboBoxContent>
          <ComboBoxItem id="apple">Apple</ComboBoxItem>
          <ComboBoxItem id="pear">Pear</ComboBoxItem>
        </ComboBoxContent>
      </ComboBox>
    )
    const tester = ariaUser.createTester("ComboBox", {
      root: screen.getByTestId("combo"),
      interactionType,
    })
    await tester.toggleOptionSelection({ option: "Pear" })
    expect(tester.getCombobox()).toHaveValue("Pear")
    expect(onChange).toHaveBeenLastCalledWith("pear")
  })
  it("filters dynamic items as the user types", async () => {
    render(
      <ComboBox aria-label="Fruit" defaultItems={items}>
        <ComboBoxInput />
        <ComboBoxContent>
          {(item: (typeof items)[number]) => <ComboBoxItem id={item.id}>{item.name}</ComboBoxItem>}
        </ComboBoxContent>
      </ComboBox>
    )
    await userEvent.setup().type(screen.getByRole("combobox"), "Pe")
    expect(screen.getByRole("option", { name: "Pear" })).toBeInTheDocument()
    expect(screen.queryByRole("option", { name: "Apple" })).not.toBeInTheDocument()
  })
})
