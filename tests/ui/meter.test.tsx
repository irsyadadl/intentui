import { describe, it, expect } from 'vitest'
import { render, screen } from '../utils/render'
import { Meter, MeterTrack, MeterValue } from '@/components/ui/meter'

describe('Meter', () => {
  it('exposes its label, range and current value', () => {
    const { rerender } = render(
      <Meter aria-label="Upload" value={25}>
        <MeterTrack />
        <MeterValue />
      </Meter>
    )
    const control = screen.getByRole('meter', { name: 'Upload' })
    expect(control).toHaveAttribute('aria-valuenow', '25')
    expect(control).toHaveAttribute('aria-valuemin', '0')
    expect(control).toHaveAttribute('aria-valuemax', '100')
    rerender(
      <Meter aria-label="Upload" value={75}>
        <MeterTrack />
        <MeterValue />
      </Meter>
    )
    expect(control).toHaveAttribute('aria-valuenow', '75')
    expect(screen.getByText('75%')).toBeInTheDocument()
  })
})
