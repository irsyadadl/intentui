import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { ColorSwatchPicker, ColorSwatchPickerItem } from '@/components/ui/color-swatch-picker'
import { ColorSwatch } from '@/components/ui/color-swatch'

describe('ColorSwatchPicker', () => {
  it('selects a swatch and reports its color', async () => {
    const onChange = vi.fn()
    render(
      <ColorSwatchPicker aria-label="Theme" defaultValue="#ff0000" onChange={onChange}>
        <ColorSwatchPickerItem color="#ff0000">
          <ColorSwatch />
        </ColorSwatchPickerItem>
        <ColorSwatchPickerItem color="#00ff00">
          <ColorSwatch />
        </ColorSwatchPickerItem>
      </ColorSwatchPicker>
    )
    const options = screen.getAllByRole('option')
    await userEvent.setup().click(options[1])
    expect(options[1]).toHaveAttribute('aria-selected', 'true')
    expect(options[0]).toHaveAttribute('aria-selected', 'false')
    expect(onChange.mock.calls.at(-1)![0].toString('hex')).toBe('#00FF00')
  })
})
