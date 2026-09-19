import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { FileTrigger } from "@/components/ui/file-trigger"

describe("FileTrigger", () => {
  it("passes selected files to onSelect and enforces accepted types", async () => {
    const user = userEvent.setup(),
      onSelect = vi.fn()
    const { container } = render(
      <FileTrigger acceptedFileTypes={["image/png"]} allowsMultiple onSelect={onSelect}>
        Upload
      </FileTrigger>
    )
    const png = new File(["image"], "photo.png", { type: "image/png" })
    const txt = new File(["text"], "note.txt", { type: "text/plain" })
    // The native file input is intentionally hidden behind the visible trigger.
    const input = container.querySelector<HTMLInputElement>('input[type="file"]')!
    await user.upload(input, [png, txt])
    expect(Array.from(onSelect.mock.calls.at(-1)![0])).toEqual([png])
    expect(input).toHaveAttribute("multiple")
  })
  it("disables the visible trigger", async () => {
    const onSelect = vi.fn()
    render(
      <FileTrigger isDisabled onSelect={onSelect}>
        Upload
      </FileTrigger>
    )
    const trigger = screen.getByRole("button", { name: "Upload" })
    await userEvent.setup().click(trigger)
    expect(trigger).toBeDisabled()
    expect(onSelect).not.toHaveBeenCalled()
  })
})
