import { beforeAll, afterAll, describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { User } from "@react-aria/test-utils"
import { waitFor } from "../utils/render"
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetClose } from "@/components/ui/sheet"

// JSDOM cannot observe viewport visibility or finish native scroll animations.
// Keep the component's state and interactions real while supplying those browser APIs.
const visibilityObservers = new Map<Element, IntersectionObserverCallback>()

beforeAll(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(private callback: IntersectionObserverCallback) {}
      observe(target: Element) {
        visibilityObservers.set(target, this.callback)
      }
      unobserve(target: Element) {
        visibilityObservers.delete(target)
      }
      disconnect() {
        for (const [target, callback] of visibilityObservers) {
          if (callback === this.callback) visibilityObservers.delete(target)
        }
      }
    }
  )
  Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    configurable: true,
    value() {
      setTimeout(() => {
        const target = this.querySelector("[data-sheet-content]")
        if (target) {
          const isExiting = this.closest("[data-exiting]") !== null
          visibilityObservers.get(target)?.(
            [{ target, intersectionRatio: isExiting ? 0 : 1 } as IntersectionObserverEntry],
            {} as IntersectionObserver
          )
        }
        this.dispatchEvent(new Event("scrollend"))
      }, 0)
    },
  })
})

afterAll(() => {
  vi.unstubAllGlobals()
  Reflect.deleteProperty(HTMLElement.prototype, "scrollTo")
})

const ariaUser = new User({ interactionType: "mouse" })
function Example() {
  return (
    <Sheet>
      <SheetTrigger>Open settings</SheetTrigger>
      <SheetContent>
        <SheetTitle>Settings</SheetTitle>
        <SheetClose>Done</SheetClose>
      </SheetContent>
    </Sheet>
  )
}
describe("Sheet", () => {
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
  it("prevents Escape dismissal but allows an explicit close action", async () => {
    const user = userEvent.setup()
    render(
      <Sheet>
        <SheetTrigger>Open alert</SheetTrigger>
        <SheetContent role="alertdialog" aria-label="Confirm changes">
          <SheetClose>Confirm</SheetClose>
        </SheetContent>
      </Sheet>
    )
    await user.click(screen.getByRole("button", { name: "Open alert" }))
    await user.keyboard("[Escape]")
    expect(screen.getByRole("alertdialog", { name: "Confirm changes" })).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Confirm" }))
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument())
  })

  it("supports controlled content without a trigger and an external accessible title", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    render(
      <SheetContent
        isOpen
        onOpenChange={onOpenChange}
        position="bottom"
        aria-labelledby="sheet-title"
        closeButton={false}
      >
        <h2 id="sheet-title">Details</h2>
        <SheetClose>Close details</SheetClose>
      </SheetContent>
    )
    expect(screen.getByRole("dialog", { name: "Details" })).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Close details" }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
