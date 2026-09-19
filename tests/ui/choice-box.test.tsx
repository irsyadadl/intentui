import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { User } from "@react-aria/test-utils"
import { ChoiceBox, ChoiceBoxItem } from "@/components/ui/choice-box"
const ariaUser = new User({ interactionType: "mouse" })
describe("ChoiceBox", () => {
  it.each(["mouse", "keyboard"] as const)(
    "selects a collection item via %s",
    async (interactionType) => {
      const onSelectionChange = vi.fn()
      render(
        <ChoiceBox aria-label="Fruit" selectionMode="single" onSelectionChange={onSelectionChange}>
          <ChoiceBoxItem id="apple" textValue="Apple">
            Apple
          </ChoiceBoxItem>
          <ChoiceBoxItem id="pear" textValue="Pear">
            Pear
          </ChoiceBoxItem>
        </ChoiceBox>
      )
      const tester = ariaUser.createTester("GridList", {
        root: screen.getByRole("grid"),
        interactionType,
      })
      await tester.toggleRowSelection({ row: "Pear" })
      expect(tester.getSelectedRows()).toHaveLength(1)
      expect(tester.getSelectedRows()[0]).toHaveTextContent("Pear")
      expect(Array.from(onSelectionChange.mock.calls.at(-1)![0])).toEqual(["pear"])
    }
  )
  it("preserves controlled selection when clicking a disabled item", async () => {
    const onSelectionChange = vi.fn()
    render(
      <ChoiceBox
        aria-label="Fruit"
        selectionMode="single"
        selectedKeys={["apple"]}
        disabledKeys={["pear"]}
        onSelectionChange={onSelectionChange}
      >
        <ChoiceBoxItem id="apple" textValue="Apple">
          Apple
        </ChoiceBoxItem>
        <ChoiceBoxItem id="pear" textValue="Pear">
          Pear
        </ChoiceBoxItem>
      </ChoiceBox>
    )
    await userEvent.setup().click(screen.getByRole("row", { name: "Pear" }))
    expect(onSelectionChange).not.toHaveBeenCalled()
    expect(screen.getByRole("row", { name: "Apple" })).toHaveAttribute("aria-selected", "true")
  })
})
