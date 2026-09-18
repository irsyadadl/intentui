import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { TagField } from '@/components/ui/tag-field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/field'

describe('TagField', () => {
  it('adds normalized tags, ignores duplicates, and serializes form data', async () => {
    const user = userEvent.setup()
    render(
      <form aria-label="Settings">
        <TagField name="topics">
          <Label>Topics</Label>
          <Input />
        </TagField>
      </form>
    )
    const input = screen.getByRole('textbox', { name: 'Topics' })
    await user.type(input, '  React  [Enter]react[Enter]CSS,')
    expect(screen.getAllByRole('row')).toHaveLength(2)
    expect(input).toHaveValue('')
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('topics')).toBe(
      'React,CSS'
    )
    await user.click(screen.getByRole('button', { name: /remove React/i }))
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('topics')).toBe('CSS')
  })
  it('shows the required message after blur', async () => {
    const user = userEvent.setup()
    render(
      <TagField isRequired requiredMessage="Add a topic">
        <Label>Topics</Label>
        <Input />
      </TagField>
    )
    await user.click(screen.getByRole('textbox', { name: 'Topics' }))
    await user.tab()
    expect(screen.getByText('Add a topic')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Topics' })).toHaveAttribute('aria-invalid', 'true')
  })
  it('prevents editing and removal when read-only', () => {
    render(
      <TagField isReadOnly defaultValue={['React']}>
        <Label>Topics</Label>
        <Input />
      </TagField>
    )
    expect(screen.getByRole('textbox', { name: 'Topics' })).toHaveAttribute('readonly')
    expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument()
  })
})
