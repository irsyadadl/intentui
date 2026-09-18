import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { ColorSlider, ColorSliderTrack } from '@/components/ui/color-slider'
import { ColorThumb } from '@/components/ui/color-thumb'

describe('ColorSlider', () => {
  it('changes the color channel using the keyboard', async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(
      <ColorSlider
        aria-label="Hue"
        channel="hue"
        defaultValue="hsl(120, 100%, 50%)"
        onChange={onChange}
      >
        <ColorSliderTrack>
          <ColorThumb />
        </ColorSliderTrack>
      </ColorSlider>
    )
    await user.tab()
    await user.keyboard('[ArrowRight]')
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls.at(-1)![0].getChannelValue('hue')).toBe(121)
  })
  it('disables its color input', () => {
    const onChange = vi.fn()
    render(
      <ColorSlider
        isDisabled
        aria-label="Hue"
        channel="hue"
        defaultValue="hsl(120, 100%, 50%)"
        onChange={onChange}
      >
        <ColorSliderTrack>
          <ColorThumb />
        </ColorSliderTrack>
      </ColorSlider>
    )
    for (const slider of screen.getAllByRole('slider')) expect(slider).toBeDisabled()
  })
})
