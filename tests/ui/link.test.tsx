import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { Link } from '@/components/ui/link'

describe('Link', () => {
  it('preserves navigation props and supports keyboard press', async () => {
    const user = userEvent.setup(),
      onPress = vi.fn()
    render(
      <Link href="#docs" onPress={onPress}>
        Docs
      </Link>
    )
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '#docs')
    await user.tab()
    await user.keyboard('[Enter]')
    expect(onPress).toHaveBeenCalledTimes(1)
  })
  it('blocks a disabled link', async () => {
    const onPress = vi.fn()
    render(
      <Link href="#docs" isDisabled onPress={onPress}>
        Docs
      </Link>
    )
    const link = screen.getByRole('link')
    await userEvent.setup().click(link)
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(onPress).not.toHaveBeenCalled()
  })
})
