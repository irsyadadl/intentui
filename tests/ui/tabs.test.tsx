import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { User } from '@react-aria/test-utils'
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/tabs'
const ariaUser = new User({ interactionType: 'mouse' })
function Example({ onSelectionChange = vi.fn() }) {
  return (
    <Tabs onSelectionChange={onSelectionChange}>
      <TabList aria-label="Account">
        <Tab id="profile">Profile</Tab>
        <Tab id="billing">Billing</Tab>
        <Tab id="admin" isDisabled>
          Admin
        </Tab>
      </TabList>
      <TabPanel id="profile">Your profile</TabPanel>
      <TabPanel id="billing">Your invoices</TabPanel>
      <TabPanel id="admin">Admin settings</TabPanel>
    </Tabs>
  )
}
describe('Tabs', () => {
  it.each(['mouse', 'keyboard'] as const)('switches panel via %s', async (interactionType) => {
    const onSelectionChange = vi.fn()
    render(<Example onSelectionChange={onSelectionChange} />)
    const tester = ariaUser.createTester('Tabs', {
      root: screen.getByRole('tablist'),
      interactionType,
    })
    await tester.triggerTab({ tab: 'Billing' })
    expect(tester.getSelectedTab()).toHaveTextContent('Billing')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Your invoices')
    expect(onSelectionChange).toHaveBeenLastCalledWith('billing')
  })
  it('skips disabled tabs during arrow navigation', async () => {
    const user = userEvent.setup()
    render(<Example />)
    await user.tab()
    await user.keyboard('[ArrowRight]')
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveFocus()
    await user.keyboard('[ArrowRight]')
    expect(screen.getByRole('tab', { name: 'Profile' })).toHaveFocus()
  })
})
