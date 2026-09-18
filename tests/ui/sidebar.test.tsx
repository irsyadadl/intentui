import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarDisclosureGroup,
  SidebarDisclosure,
  SidebarDisclosureTrigger,
  SidebarDisclosurePanel,
} from '@/components/ui/sidebar'

describe('Sidebar', () => {
  it('toggles via its trigger and persists the desktop state', async () => {
    const user = userEvent.setup(),
      onPress = vi.fn()
    render(
      <SidebarProvider>
        <Sidebar>Navigation</Sidebar>
        <SidebarTrigger onPress={onPress} />
      </SidebarProvider>
    )
    expect(screen.getByText('Navigation').closest('[data-state]')).toHaveAttribute(
      'data-state',
      'expanded'
    )
    await user.click(screen.getByRole('button', { name: 'Toggle Sidebar' }))
    expect(screen.getByText('Navigation').closest('[data-state]')).toHaveAttribute(
      'data-state',
      'collapsed'
    )
    expect(onPress).toHaveBeenCalledTimes(1)
    expect(document.cookie).toContain('sidebar_state=false')
  })
  it('supports its shortcut but ignores it while typing', async () => {
    const user = userEvent.setup()
    render(
      <SidebarProvider>
        <Sidebar>Navigation</Sidebar>
        <input aria-label="Search" />
      </SidebarProvider>
    )
    await user.keyboard('{Control>}b{/Control}')
    expect(screen.getByText('Navigation').closest('[data-state]')).toHaveAttribute(
      'data-state',
      'collapsed'
    )
    await user.click(screen.getByRole('textbox'))
    await user.keyboard('{Control>}b{/Control}')
    expect(screen.getByText('Navigation').closest('[data-state]')).toHaveAttribute(
      'data-state',
      'collapsed'
    )
  })
  it('expands a disclosure navigation section', async () => {
    render(
      <SidebarProvider>
        <SidebarDisclosureGroup>
          <SidebarDisclosure id="settings">
            <SidebarDisclosureTrigger>Settings</SidebarDisclosureTrigger>
            <SidebarDisclosurePanel>Account settings</SidebarDisclosurePanel>
          </SidebarDisclosure>
        </SidebarDisclosureGroup>
      </SidebarProvider>
    )
    await userEvent.setup().click(screen.getByRole('button', { name: 'Settings' }))
    expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    expect(screen.getByText('Account settings')).toBeVisible()
  })
})
