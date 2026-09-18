import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { ColorSlider, ColorSliderTrack } from '@/components/ui/color-slider'
import { ColorThumb } from '@/components/ui/color-thumb'

describe('ColorThumb', () => {
  it('connects the thumb to its slider and commits keyboard changes', async () => {
    const user = userEvent.setup(),
      onChangeEnd = vi.fn()
    render(
      <ColorSlider
        aria-label="Hue"
        channel="hue"
        defaultValue="hsl(120, 100%, 50%)"
        onChangeEnd={onChangeEnd}
      >
        <ColorSliderTrack>
          <ColorThumb />
        </ColorSliderTrack>
      </ColorSlider>
    )
    await user.tab()
    await user.keyboard('[ArrowRight]')
    expect(screen.getByRole('slider')).toHaveValue('121')
    expect(onChangeEnd.mock.calls.at(-1)![0].getChannelValue('hue')).toBe(121)
  })
})
