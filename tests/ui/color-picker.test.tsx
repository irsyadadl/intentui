import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { ColorPicker, EyeDropper } from '@/components/ui/color-picker'
import { ColorField } from '@/components/ui/color-field'
import { Input } from '@/components/ui/input'
import { waitFor } from '../utils/render'

describe('ColorPicker', () => {
  it('shares color state with nested fields', async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(
      <ColorPicker defaultValue="#ff0000" onChange={onChange}>
        <ColorField aria-label="Color">
          <Input />
        </ColorField>
      </ColorPicker>
    )
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('#FF0000')
    await user.clear(input)
    await user.type(input, '#0000ff')
    await user.tab()
    expect(onChange.mock.calls.at(-1)![0].toString('hex')).toBe('#0000FF')
  })
  it('shows the fallback when EyeDropper is unavailable', () => {
    render(
      <ColorPicker>
        <EyeDropper />
      </ColorPicker>
    )
    expect(screen.getByText('EyeDropper is not supported in your browser.')).toBeInTheDocument()
  })
  it('applies a color returned by the browser EyeDropper', async () => {
    const onChange = vi.fn()
    class EyeDropperMock {
      async open() {
        return { sRGBHex: '#00ff00' }
      }
    }
    vi.stubGlobal('EyeDropper', EyeDropperMock)
    try {
      render(
        <ColorPicker onChange={onChange}>
          <EyeDropper />
        </ColorPicker>
      )
      await userEvent.setup().click(screen.getByRole('button', { name: 'Eye dropper' }))
      await waitFor(() => expect(onChange).toHaveBeenCalled())
      expect(onChange.mock.calls.at(-1)![0].toString('hex')).toBe('#00FF00')
    } finally {
      delete window.EyeDropper
    }
  })
})
