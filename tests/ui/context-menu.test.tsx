import { Button } from "@/components/ui/button"
import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { fireEvent } from "../utils/render"
import { ContextMenuTrigger, ContextMenu, ContextMenuItem } from "@/components/ui/context-menu"
import {} from "@/components/ui/menu"

describe("ContextMenuTrigger", () => {
  it("opens on right click and dispatches the chosen action", async () => {
    const user = userEvent.setup(),
      onAction = vi.fn()
    render(
      <ContextMenuTrigger>
        <Button>File</Button>
        <ContextMenu onAction={onAction}>
          <ContextMenuItem id="rename">Rename</ContextMenuItem>
        </ContextMenu>
      </ContextMenuTrigger>
    )
    fireEvent.contextMenu(screen.getByRole("button", { name: "File" }), {
      button: 2,
      clientX: 20,
      clientY: 20,
    })
    await user.click(await screen.findByRole("menuitem", { name: "Rename" }))
    expect(onAction.mock.calls.at(-1)?.[0]).toBe("rename")
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })
})
