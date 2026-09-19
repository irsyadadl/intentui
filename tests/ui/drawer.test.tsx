import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { User } from "@react-aria/test-utils"
import { waitFor } from "../utils/render"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"

const ariaUser = new User({ interactionType: "mouse" })
function Example() {
  return (
    <Drawer>
      <DrawerTrigger>Open settings</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Settings</DrawerTitle>
        <DrawerClose>Done</DrawerClose>
      </DrawerContent>
    </Drawer>
  )
}
describe("Drawer", () => {
  it("opens a named dialog and closes via its action button", async () => {
    const user = userEvent.setup()
    render(<Example />)
    const trigger = screen.getByRole("button", { name: "Open settings" })
    const tester = ariaUser.createTester("Dialog", { root: trigger, overlayType: "modal" })
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    await tester.open()
    expect(screen.getByRole("dialog", { name: "Drawer" })).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Done" }))
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  })
  it("dismisses using Escape", async () => {
    const user = userEvent.setup()
    render(<Example />)
    await user.click(screen.getByRole("button", { name: "Open settings" }))
    await user.keyboard("[Escape]")
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
  })
})
