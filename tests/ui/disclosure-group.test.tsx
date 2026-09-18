import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import {
  DisclosureGroup,
  Disclosure,
  DisclosureTrigger,
  DisclosurePanel,
} from '@/components/ui/disclosure-group'

describe('DisclosureGroup', () => {
  it('expands a panel and collapses the previous one by default', async () => {
    const user = userEvent.setup(),
      onExpandedChange = vi.fn()
    render(
      <DisclosureGroup onExpandedChange={onExpandedChange}>
        <Disclosure id="one">
          <DisclosureTrigger>First</DisclosureTrigger>
          <DisclosurePanel>First answer</DisclosurePanel>
        </Disclosure>
        <Disclosure id="two">
          <DisclosureTrigger>Second</DisclosureTrigger>
          <DisclosurePanel>Second answer</DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>
    )
    await user.click(screen.getByRole('button', { name: 'First' }))
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('First answer')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Second' }))
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Second answer')).toBeVisible()
    expect(Array.from(onExpandedChange.mock.calls.at(-1)![0])).toEqual(['two'])
  })
  it('supports keyboard activation', async () => {
    const user = userEvent.setup()
    render(
      <Disclosure>
        <DisclosureTrigger>Details</DisclosureTrigger>
        <DisclosurePanel>Answer</DisclosurePanel>
      </Disclosure>
    )
    await user.tab()
    await user.keyboard('[Enter]')
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })
})
