import { it, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { Keyboard } from "@/components/ui/keyboard"
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuLabel } from "@/components/ui/menu"
it("Keyboard contributes the shortcut to the menu item description", async () => {
  render(
    <Menu>
      <MenuTrigger>Actions</MenuTrigger>
      <MenuContent>
        <MenuItem id="copy" textValue="Copy">
          <MenuLabel>Copy</MenuLabel>
          <Keyboard>Ctrl+C</Keyboard>
        </MenuItem>
      </MenuContent>
    </Menu>
  )
  await userEvent.setup().click(screen.getByRole("button", { name: "Actions" }))
  expect(screen.getByRole("menuitem", { name: "Copy" })).toHaveAccessibleDescription("Ctrl+C")
})
