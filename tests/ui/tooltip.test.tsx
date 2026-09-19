import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../utils/render"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { waitFor } from "../utils/render"

describe("Tooltip", () => {
  it.each(["hover", "focus"])(
    "shows a description on %s and dismisses with Escape",
    async (interaction) => {
      const user = userEvent.setup()
      render(
        <Tooltip delay={0} closeDelay={0}>
          <TooltipTrigger>Save</TooltipTrigger>
          <TooltipContent>Save changes</TooltipContent>
        </Tooltip>
      )
      if (interaction === "hover") {
        await user.click(document.body)
        await user.hover(screen.getByRole("button"))
      } else await user.tab()
      expect(await screen.findByRole("tooltip")).toHaveTextContent("Save changes")
      expect(screen.getByRole("button")).toHaveAccessibleDescription("Save changes")
      await user.keyboard("[Escape]")
      await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument())
    }
  )
})
