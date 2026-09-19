import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { SearchField, SearchInput } from "@/components/ui/search-field"

describe("SearchField", () => {
  it("types, submits, and clears a search using the built-in button", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn(),
      onClear = vi.fn()
    render(
      <SearchField onSubmit={onSubmit} onClear={onClear}>
        <SearchInput />
      </SearchField>
    )
    const input = screen.getByRole("searchbox", { name: "Search" })
    await user.type(input, "react[Enter]")
    expect(onSubmit).toHaveBeenCalledWith("react")
    await user.click(screen.getByRole("button", { name: /clear/i }))
    expect(input).toHaveValue("")
    expect(onClear).toHaveBeenCalledTimes(1)
  })
  it("disables the search input", () => {
    render(
      <SearchField isDisabled>
        <SearchInput />
      </SearchField>
    )
    expect(screen.getByRole("searchbox")).toBeDisabled()
  })
})
