import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { parseDate } from '@internationalized/date'
import { DateField, DateInput } from '@/components/ui/date-field'
import { Label } from '@/components/ui/field'

describe('DateField', () => {
  it('edits a date segment with the keyboard and reports the new value', async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(
      <DateField defaultValue={parseDate('2026-09-18')} onChange={onChange}>
        <Label>When</Label>
        <DateInput />
      </DateField>
    )
    await user.click(screen.getByRole('spinbutton', { name: /day/i }))
    await user.keyboard('[ArrowUp]')
    expect(screen.getByRole('spinbutton', { name: /day/i })).toHaveAttribute('aria-valuenow', '19')
    expect(onChange.mock.calls.at(-1)![0].day).toBe(19)
  })
  it('does not change a read-only value', async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(
      <DateField
        aria-label="When"
        isReadOnly
        defaultValue={parseDate('2026-09-18')}
        onChange={onChange}
      >
        <DateInput />
      </DateField>
    )
    await user.click(screen.getByRole('spinbutton', { name: /day/i }))
    await user.keyboard('[ArrowUp]')
    expect(onChange).not.toHaveBeenCalled()
  })
})
