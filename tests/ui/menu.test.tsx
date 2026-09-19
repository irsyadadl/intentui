import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { User } from "@react-aria/test-utils"
import { Menu, MenuTrigger, MenuContent, MenuItem } from "@/components/ui/menu"
const ariaUser = new User({ interactionType: "mouse" })
describe("Menu", () => {
  it.each(["mouse", "keyboard"] as const)(
    "opens and performs an action via %s",
    async (interactionType) => {
      const onAction = vi.fn()
      render(
        <Menu>
          <MenuTrigger>Actions</MenuTrigger>
          <MenuContent onAction={onAction}>
            <MenuItem id="edit">Edit</MenuItem>
            <MenuItem id="delete" isDisabled>
              Delete
            </MenuItem>
          </MenuContent>
        </Menu>
      )
      const tester = ariaUser.createTester("Menu", {
        root: screen.getByRole("button", { name: "Actions" }),
        interactionType,
      })
      await tester.open()
      expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveAttribute(
        "aria-disabled",
        "true"
      )
      await tester.toggleOptionSelection({ option: "Edit" })
      expect(onAction.mock.calls.at(-1)?.[0]).toBe("edit")
      expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    }
  )
  it("closes with Escape without performing an action", async () => {
    const user = userEvent.setup(),
      onAction = vi.fn()
    render(
      <Menu>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuContent onAction={onAction}>
          <MenuItem id="edit">Edit</MenuItem>
        </MenuContent>
      </Menu>
    )
    await user.click(screen.getByRole("button"))
    await user.keyboard("[Escape]")
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    expect(onAction).not.toHaveBeenCalled()
  })
})
