import "@testing-library/jest-dom/vitest"
import { act, cleanup } from "@testing-library/react"
import { afterEach, beforeAll, afterAll, vi } from "vitest"

// JSDOM has no layout/resize engine. Keep these shims limited to missing APIs;
// React Aria components, state, focus handling and events are never mocked.
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal("ResizeObserver", ResizeObserverMock)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => true,
  }),
})
Element.prototype.getAnimations = () => []
HTMLElement.prototype.scrollIntoView = () => {}
HTMLElement.prototype.hasPointerCapture = () => false
HTMLElement.prototype.setPointerCapture = () => {}
HTMLElement.prototype.releasePointerCapture = () => {}

afterEach(() => {
  act(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  })
  cleanup()
})

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
