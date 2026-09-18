import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { Toolbar, ToolbarGroup, ToolbarItem, ToolbarSeparator } from '@/components/ui/toolbar'

describe('Toolbar', () => {
  it('moves focus using arrow keys and activates a toggle', async () => {
    const user = userEvent.setup()
    render(
      <Toolbar aria-label="Format">
        <ToolbarItem>Bold</ToolbarItem>
        <ToolbarItem>Italic</ToolbarItem>
      </Toolbar>
    )
    await user.tab()
    await user.keyboard('[ArrowRight]')
    expect(screen.getByRole('button', { name: 'Italic' })).toHaveFocus()
    await user.keyboard('[Space]')
    expect(screen.getByRole('button', { name: 'Italic' })).toHaveAttribute('aria-pressed', 'true')
  })
  it('inherits disabled group state and reverses separator orientation', () => {
    render(
      <Toolbar aria-label="Format" orientation="horizontal">
        <ToolbarGroup isDisabled>
          <ToolbarItem>Bold</ToolbarItem>
        </ToolbarGroup>
        <ToolbarSeparator />
      </Toolbar>
    )
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical')
  })
})
