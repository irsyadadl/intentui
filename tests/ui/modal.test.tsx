import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { User } from "@react-aria/test-utils"
import { waitFor } from "../utils/render"
import { Modal, ModalTrigger, ModalContent, ModalTitle, ModalClose } from "@/components/ui/modal"

const ariaUser = new User({ interactionType: "mouse" })
function Example() {
  return (
    <Modal>
      <ModalTrigger>Open settings</ModalTrigger>
      <ModalContent>
        <ModalTitle>Settings</ModalTitle>
        <ModalClose>Done</ModalClose>
      </ModalContent>
    </Modal>
  )
}
describe("Modal", () => {
  it("opens a named dialog and closes via its action button", async () => {
    const user = userEvent.setup()
    render(<Example />)
    const trigger = screen.getByRole("button", { name: "Open settings" })
    const tester = ariaUser.createTester("Dialog", { root: trigger, overlayType: "modal" })
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    await tester.open()
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument()
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

it("Modal respects disabled keyboard dismissal and still permits an explicit close", async () => {
  const user = userEvent.setup()
  render(
    <Modal>
      <ModalTrigger>Open</ModalTrigger>
      <ModalContent isKeyboardDismissDisabled>
        <ModalTitle>Confirm</ModalTitle>
        <ModalClose>Cancel</ModalClose>
      </ModalContent>
    </Modal>
  )
  await user.click(screen.getByRole("button", { name: "Open" }))
  await user.keyboard("[Escape]")
  expect(screen.getByRole("dialog", { name: "Confirm" })).toBeInTheDocument()
  await user.click(screen.getByRole("button", { name: "Cancel" }))
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
})
