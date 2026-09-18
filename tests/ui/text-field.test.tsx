import { describe, it, expect } from 'vitest'
import { render, screen } from '../utils/render'
import { TextField } from '@/components/ui/text-field'
import { Input } from '@/components/ui/input'
import { Label, Description, FieldError } from '@/components/ui/field'

describe('TextField', () => {
  it('associates descriptions and validation errors with the input', () => {
    render(
      <TextField isInvalid>
        <Label>Email</Label>
        <Input />
        <Description>Work address</Description>
        <FieldError>Invalid email</FieldError>
      </TextField>
    )
    const input = screen.getByRole('textbox', { name: 'Email' })
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription(/Work address/)
    expect(input).toHaveAccessibleDescription(/Invalid email/)
  })
  it('updates a controlled value and inherits disabled state', () => {
    const { rerender } = render(
      <TextField aria-label="Email" value="a@example.com">
        <Input />
      </TextField>
    )
    expect(screen.getByRole('textbox')).toHaveValue('a@example.com')
    rerender(
      <TextField aria-label="Email" value="b@example.com" isDisabled>
        <Input />
      </TextField>
    )
    expect(screen.getByRole('textbox')).toHaveValue('b@example.com')
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
