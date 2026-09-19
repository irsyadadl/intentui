import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { User } from "@react-aria/test-utils"
import { GridList, GridListItem } from "@/components/ui/grid-list"
const ariaUser = new User({ interactionType: "mouse" })
describe("GridList", () => {
  it.each(["mouse", "keyboard"] as const)(
    "selects a collection item via %s",
    async (interactionType) => {
      const onSelectionChange = vi.fn()
      render(
        <GridList aria-label="Fruit" selectionMode="single" onSelectionChange={onSelectionChange}>
          <GridListItem id="apple" textValue="Apple">
            Apple
          </GridListItem>
          <GridListItem id="pear" textValue="Pear">
            Pear
          </GridListItem>
        </GridList>
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
      <GridList
        aria-label="Fruit"
        selectionMode="single"
        selectedKeys={["apple"]}
        disabledKeys={["pear"]}
        onSelectionChange={onSelectionChange}
      >
        <GridListItem id="apple" textValue="Apple">
          Apple
        </GridListItem>
        <GridListItem id="pear" textValue="Pear">
          Pear
        </GridListItem>
      </GridList>
    )
    await userEvent.setup().click(screen.getByRole("row", { name: "Pear" }))
    expect(onSelectionChange).not.toHaveBeenCalled()
    expect(screen.getByRole("row", { name: "Apple" })).toHaveAttribute("aria-selected", "true")
  })
})
