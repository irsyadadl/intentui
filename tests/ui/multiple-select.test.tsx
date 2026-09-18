import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import {
  MultipleSelect,
  MultipleSelectContent,
  MultipleSelectItem,
} from '@/components/ui/multiple-select'
import { Label } from '@/components/ui/field'
const items = [
  { id: 'react', name: 'React' },
  { id: 'vue', name: 'Vue' },
]
describe('MultipleSelect', () => {
  it('searches options and keeps multiple selected values', async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(
      <MultipleSelect onChange={onChange}>
        <Label>Frameworks</Label>
        <MultipleSelectContent items={items}>
          {(item) => <MultipleSelectItem id={item.id}>{item.name}</MultipleSelectItem>}
        </MultipleSelectContent>
      </MultipleSelect>
    )
    expect(screen.getByText('No selected items')).toBeInTheDocument()
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('option', { name: 'React' }))
    await user.click(screen.getByRole('option', { name: 'Vue' }))
    expect(onChange).toHaveBeenLastCalledWith(['react', 'vue'])
    await user.type(screen.getByRole('searchbox'), 'Re')
    expect(screen.queryByRole('option', { name: 'Vue' })).not.toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'React' })).toHaveAttribute('aria-selected', 'true')
  })
  it('removes a selected tag', async () => {
    const onChange = vi.fn()
    render(
      <MultipleSelect defaultValue={['react']} onChange={onChange}>
        <Label>Frameworks</Label>
        <MultipleSelectContent items={items}>
          {(item) => <MultipleSelectItem id={item.id}>{item.name}</MultipleSelectItem>}
        </MultipleSelectContent>
      </MultipleSelect>
    )
    await userEvent.setup().click(screen.getByRole('button', { name: /remove/i }))
    expect(onChange).toHaveBeenLastCalledWith([])
    expect(screen.getByText('No selected items')).toBeInTheDocument()
  })
})
