import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { ColorWheel } from '@/components/ui/color-wheel'

describe('ColorWheel', () => {
  it('changes the color channel using the keyboard', async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(<ColorWheel aria-label="Hue" defaultValue="hsl(120, 100%, 50%)" onChange={onChange} />)
    await user.tab()
    await user.keyboard('[ArrowRight]')
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls.at(-1)![0].getChannelValue('hue')).toBe(121)
  })
  it('disables its color input', () => {
    const onChange = vi.fn()
    render(
      <ColorWheel
        isDisabled
        aria-label="Hue"
        defaultValue="hsl(120, 100%, 50%)"
        onChange={onChange}
      />
    )
    for (const slider of screen.getAllByRole('slider')) expect(slider).toBeDisabled()
  })
})
