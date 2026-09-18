import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { ListBox } from '@/components/ui/list-box'
import {
  DropdownItem,
  DropdownLabel,
  DropdownDescription,
  DropdownSection,
} from '@/components/ui/dropdown'

describe('Dropdown building blocks', () => {
  it('preserves option labels/descriptions and section grouping', async () => {
    const onSelectionChange = vi.fn()
    render(
      <ListBox aria-label="Plans" selectionMode="single" onSelectionChange={onSelectionChange}>
        <DropdownSection title="Paid">
          <DropdownItem id="pro" textValue="Pro">
            <DropdownLabel>Pro</DropdownLabel>
            <DropdownDescription>For teams</DropdownDescription>
          </DropdownItem>
        </DropdownSection>
      </ListBox>
    )
    const option = screen.getByRole('option', { name: /Pro/ })
    expect(option).toHaveAccessibleDescription('For teams')
    await userEvent.setup().click(option)
    expect(option).toHaveAttribute('aria-selected', 'true')
    expect(Array.from(onSelectionChange.mock.calls.at(-1)![0])).toEqual(['pro'])
  })
})
