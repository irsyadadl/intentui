import { describe, it, expect } from "vitest"
import { render, screen } from "../utils/render"
import { Fieldset, Legend, Label, Description, FieldError } from "@/components/ui/field"
import { TextField } from "@/components/ui/text-field"
import { Input } from "@/components/ui/input"

describe("Field helpers", () => {
  it("associates labels, descriptions, and errors with their field", () => {
    render(
      <Fieldset>
        <Legend>Account</Legend>
        <TextField isInvalid>
          <Label>Email</Label>
          <Input />
          <Description>Work email</Description>
          <FieldError>Invalid address</FieldError>
        </TextField>
      </Fieldset>
    )
    expect(screen.getByRole("group", { name: "Account" })).toBeInTheDocument()
    const input = screen.getByRole("textbox", { name: "Email" })
    expect(input).toHaveAccessibleDescription(/Work email/)
    expect(input).toHaveAccessibleDescription(/Invalid address/)
  })
})
