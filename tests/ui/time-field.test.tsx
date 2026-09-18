import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { Time } from '@internationalized/date'
import { TimeField, TimeInput } from '@/components/ui/time-field'
import { Label } from '@/components/ui/field'

describe('TimeField', () => {
  it('edits a date segment with the keyboard and reports the new value', async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(
      <TimeField defaultValue={new Time(10, 30)} onChange={onChange}>
        <Label>When</Label>
        <TimeInput />
      </TimeField>
    )
    await user.click(screen.getByRole('spinbutton', { name: /hour/i }))
    await user.keyboard('[ArrowUp]')
    expect(screen.getByRole('spinbutton', { name: /hour/i })).toHaveAttribute('aria-valuenow', '11')
    expect(onChange.mock.calls.at(-1)![0].hour).toBe(11)
  })
  it('does not change a read-only value', async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(
      <TimeField aria-label="When" isReadOnly defaultValue={new Time(10, 30)} onChange={onChange}>
        <TimeInput />
      </TimeField>
    )
    await user.click(screen.getByRole('spinbutton', { name: /hour/i }))
    await user.keyboard('[ArrowUp]')
    expect(onChange).not.toHaveBeenCalled()
  })
})
