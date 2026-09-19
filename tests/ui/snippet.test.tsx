import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { Snippet, SnippetTabsList, SnippetTab, SnippetTabPanel } from "@/components/ui/snippet"

describe("Snippet", () => {
  it("switches commands and copies the active command", async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, "writeText")
    render(
      <Snippet>
        <SnippetTabsList aria-label="Package manager">
          <SnippetTab id="npm">npm</SnippetTab>
          <SnippetTab id="pnpm">pnpm</SnippetTab>
        </SnippetTabsList>
        <SnippetTabPanel id="npm">npm install</SnippetTabPanel>
        <SnippetTabPanel id="pnpm">pnpm add</SnippetTabPanel>
      </Snippet>
    )
    await user.click(screen.getByRole("tab", { name: "pnpm" }))
    expect(screen.getByRole("tabpanel")).toHaveTextContent("pnpm add")
    await user.click(screen.getByRole("button", { name: "Copy to clipboard" }))
    expect(writeText).toHaveBeenCalledWith("pnpm add")
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument()
  })
})
