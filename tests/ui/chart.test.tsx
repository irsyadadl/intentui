import { it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { Chart, ChartLegendContent } from '@/components/ui/chart'

// This tests only the React Aria legend controls, not Recharts rendering.
it('Chart legend toggles the series selected in chart context', async () => {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
    new DOMRect(0, 0, 600, 370)
  )
  const warn = vi.spyOn(console, 'warn')
  const user = userEvent.setup()
  render(
    <Chart config={{ desktop: { label: 'Desktop' }, mobile: { label: 'Mobile' } }}>
      {({ selectedLegend }) => (
        <div>
          <output aria-label="Selected series">{selectedLegend ?? 'All'}</output>
          <ChartLegendContent
            payload={[
              { dataKey: 'desktop', value: 'Desktop', color: 'blue' },
              { dataKey: 'mobile', value: 'Mobile', color: 'green' },
            ]}
          />
        </div>
      )}
    </Chart>
  )
  // The current legend gives both controls the same accessible name.
  const legends = await screen.findAllByRole('radio', { name: 'Legend Item' })
  await user.click(legends[1])
  expect(legends[1]).toBeChecked()
  expect(screen.getByLabelText('Selected series')).toHaveTextContent('mobile')
  await user.click(legends[0])
  expect(legends[0]).toBeChecked()
  expect(screen.getByLabelText('Selected series')).toHaveTextContent('desktop')
  await user.click(legends[0])
  expect(screen.getByLabelText('Selected series')).toHaveTextContent('All')
  expect(legends[0]).not.toBeChecked()
  expect(warn).not.toHaveBeenCalled()
})
