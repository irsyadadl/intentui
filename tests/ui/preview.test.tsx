import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { Preview, PreviewContent } from '@/components/ui/preview'
import { Link } from '@/components/ui/link'
import { Button } from '@/components/ui/button'
import { waitFor } from '../utils/render'

describe('Preview', () => {
  it('opens on keyboard focus and allows interaction inside the preview', async () => {
    const user = userEvent.setup(),
      onPress = vi.fn()
    render(
      <Preview delay={0}>
        <Link href="#profile">Profile</Link>
        <PreviewContent>
          <Button onPress={onPress}>Follow</Button>
        </PreviewContent>
      </Preview>
    )
    await user.tab()
    const follow = await screen.findByRole('button', { name: 'Follow' })
    await user.tab()
    expect(follow).toHaveFocus()
    await user.keyboard('[Enter]')
    expect(onPress).toHaveBeenCalledTimes(1)
    await user.keyboard('[Escape]')
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Follow' })).not.toBeInTheDocument()
    )
  })
})
