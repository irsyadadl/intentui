import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { render, screen, waitFor } from "./utils/render"
import DialogDemo from "@/components/examples/overlays/dialog/dialog-example"
import AlertDialogDemo from "@/components/examples/overlays/dialog/alert-dialog-example"
import DialogControlledDemo from "@/components/examples/overlays/dialog/dialog-controlled-example"
import PopoverCustomClose from "@/components/examples/overlays/popover/popover-custom-close"
import PopoverTriggerDemo from "@/components/examples/overlays/popover/popover-trigger-example"
import SheetDemo from "@/components/examples/overlays/sheet/sheet-example"
import SheetPreventDismissalExample from "@/components/examples/overlays/sheet/sheet-prevent-dismissal-example"

import SheetStackingExample from "@/components/examples/overlays/sheet/sheet-stacking-example"

describe("overlay migration", () => {
  it("keeps a non-dismissable Sheet open until its close action is pressed", async () => {
    const user = userEvent.setup()
    render(<SheetPreventDismissalExample />)
    await user.click(screen.getByRole("button", { name: "Review changes" }))
    const dialog = await screen.findByRole("dialog", { name: "Review changes" })
    await user.keyboard("{Escape}")
    await user.click(document.body)
    expect(dialog).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Done" }))
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
  })
  it("opens Dialog, closes via its render prop, and restores focus", async () => {
    const user = userEvent.setup()
    render(<DialogDemo />)
    const trigger = screen.getByRole("button", { name: "Rename" })
    await user.click(trigger)
    expect(await screen.findByRole("dialog", { name: "Rename project" })).toBeVisible()
    expect(screen.getAllByRole("dialog")).toHaveLength(1)
    await user.click(screen.getByRole("button", { name: "Save changes" }))
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it("supports a controlled Dialog without a trigger wrapper", async () => {
    const user = userEvent.setup()
    render(<DialogControlledDemo />)
    await user.click(screen.getByRole("button", { name: "Subscribe" }))
    expect(await screen.findByRole("dialog")).toBeVisible()
    await user.click(screen.getByRole("button", { name: "Sign Up" }))
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
  })

  it("renders an alert dialog with an explicit Cancel action", async () => {
    const user = userEvent.setup()
    render(<AlertDialogDemo />)
    await user.click(screen.getByRole("button", { name: "Revoke Access" }))
    expect(await screen.findByRole("alertdialog", { name: "Revoke User Access?" })).toBeVisible()
    await user.click(screen.getByRole("button", { name: "Cancel" }))
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument())
  })

  it("opens a custom avatar trigger by keyboard and closes with Escape", async () => {
    const user = userEvent.setup()
    render(<PopoverTriggerDemo />)
    const trigger = screen.getByRole("button", { name: "Open account details" })
    trigger.focus()
    await user.keyboard("{Enter}")
    expect(await screen.findByRole("dialog", { name: "Account details" })).toBeVisible()
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it("closes a controlled Popover with a custom Cancel button", async () => {
    const user = userEvent.setup()
    render(<PopoverCustomClose />)
    await user.click(screen.getByRole("button", { name: "Login" }))
    expect(await screen.findByRole("dialog", { name: "Login" })).toBeVisible()
    expect(screen.getAllByRole("dialog")).toHaveLength(1)
    await user.click(screen.getByRole("button", { name: "Cancel" }))
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
  })

  it("keeps Sheet as a single overlay", async () => {
    const user = userEvent.setup()
    render(<SheetDemo />)
    await user.click(screen.getAllByRole("button")[0])
    expect(await screen.findByRole("dialog")).toBeVisible()
    expect(screen.getAllByRole("dialog")).toHaveLength(1)
    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
  })
})

describe("stacked sheets", () => {
  it("closes the top sheet and returns focus to the parent trigger", async () => {
    const user = userEvent.setup()
    render(<SheetStackingExample />)
    await user.click(screen.getByRole("button", { name: "Workspace settings" }))
    const teamTrigger = screen.getByRole("button", { name: "Team access" })
    await user.click(teamTrigger)
    expect(screen.getByRole("dialog", { name: "Team access" })).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Member permissions" }))
    expect(screen.getByRole("dialog", { name: "Member permissions" })).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Back to team access" }))
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Member permissions" })).not.toBeInTheDocument()
    )
    expect(screen.getByRole("dialog", { name: "Team access" })).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Back to workspace" }))
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Team access" })).not.toBeInTheDocument()
    )
    await waitFor(() => expect(teamTrigger).toHaveFocus())
  })
})
