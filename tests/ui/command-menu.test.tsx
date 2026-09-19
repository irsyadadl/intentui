import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { useState } from "react"
import {
  CommandMenu,
  CommandMenuSearch,
  CommandMenuList,
  CommandMenuItem,
} from "@/components/ui/command-menu"
function Example({ onAction = vi.fn() }) {
  const [isOpen, setOpen] = useState(false)
  return (
    <CommandMenu shortcut="k" isOpen={isOpen} onOpenChange={setOpen}>
      <CommandMenuSearch />
      <CommandMenuList aria-label="Commands" onAction={onAction}>
        <CommandMenuItem id="profile">Profile</CommandMenuItem>
        <CommandMenuItem id="settings">Settings</CommandMenuItem>
      </CommandMenuList>
    </CommandMenu>
  )
}
describe("CommandMenu", () => {
  it("opens with its shortcut, filters commands, and performs an action", async () => {
    const user = userEvent.setup(),
      onAction = vi.fn()
    render(<Example onAction={onAction} />)
    await user.keyboard("{Control>}k{/Control}")
    expect(await screen.findByRole("dialog", { name: "Command Menu" })).toBeInTheDocument()
    await user.type(screen.getByRole("searchbox"), "sett")
    expect(screen.queryByRole("menuitem", { name: "Profile" })).not.toBeInTheDocument()
    await user.click(screen.getByRole("menuitem", { name: "Settings" }))
    expect(onAction.mock.calls.at(-1)?.[0]).toBe("settings")
  })
  it("closes with the Escape key", async () => {
    const user = userEvent.setup()
    render(<Example />)
    await user.keyboard("{Control>}k{/Control}")
    await user.keyboard("[Escape]")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})
