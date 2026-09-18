import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { User } from '@react-aria/test-utils'
import { ListBox, ListBoxItem } from '@/components/ui/list-box'
const ariaUser = new User({ interactionType: 'mouse' })
describe('ListBox', () => {
  it.each(['mouse', 'keyboard'] as const)(
    'selects a collection item via %s',
    async (interactionType) => {
      const onSelectionChange = vi.fn()
      render(
        <ListBox aria-label="Fruit" selectionMode="single" onSelectionChange={onSelectionChange}>
          <ListBoxItem id="apple" textValue="Apple">
            Apple
          </ListBoxItem>
          <ListBoxItem id="pear" textValue="Pear">
            Pear
          </ListBoxItem>
        </ListBox>
      )
      const tester = ariaUser.createTester('ListBox', {
        root: screen.getByRole('listbox'),
        interactionType,
      })
      await tester.toggleOptionSelection({ option: 'Pear' })
      expect(tester.getSelectedOptions()).toHaveLength(1)
      expect(tester.getSelectedOptions()[0]).toHaveTextContent('Pear')
      expect(Array.from(onSelectionChange.mock.calls.at(-1)![0])).toEqual(['pear'])
    }
  )
  it('preserves controlled selection when clicking a disabled item', async () => {
    const onSelectionChange = vi.fn()
    render(
      <ListBox
        aria-label="Fruit"
        selectionMode="single"
        selectedKeys={['apple']}
        disabledKeys={['pear']}
        onSelectionChange={onSelectionChange}
      >
        <ListBoxItem id="apple" textValue="Apple">
          Apple
        </ListBoxItem>
        <ListBoxItem id="pear" textValue="Pear">
          Pear
        </ListBoxItem>
      </ListBox>
    )
    await userEvent.setup().click(screen.getByRole('option', { name: 'Pear' }))
    expect(onSelectionChange).not.toHaveBeenCalled()
    expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute('aria-selected', 'true')
  })
})
