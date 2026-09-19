import { describe, it, expect } from "vitest"
import { render, screen } from "../utils/render"
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@/components/ui/dialog"

describe("Dialog", () => {
  it("uses the header title as its accessible name and renders body/actions", () => {
    render(
      <Dialog>
        <DialogHeader title="Delete file" description="This cannot be undone" />
        <DialogBody>report.pdf</DialogBody>
        <DialogFooter>
          <button>Cancel</button>
        </DialogFooter>
      </Dialog>
    )
    expect(screen.getByRole("dialog", { name: "Delete file" })).toHaveTextContent("report.pdf")
    expect(screen.getByText("This cannot be undone")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
  })
  it("supports alertdialog semantics", () => {
    render(
      <Dialog role="alertdialog" aria-label="Warning">
        Confirm removal
      </Dialog>
    )
    expect(screen.getByRole("alertdialog", { name: "Warning" })).toHaveTextContent(
      "Confirm removal"
    )
  })
})
