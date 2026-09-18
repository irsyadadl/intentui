import { it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '../utils/render'
import { Tracker } from '@/components/ui/tracker'

it.each(['mouse', 'keyboard'])(
  'Tracker opens a block tooltip via %s and dismisses with Escape',
  async (interaction) => {
    const user = userEvent.setup()
    render(<Tracker data-testid="tracker" data={[{ tooltip: 'Service healthy' }]} />)
    if (interaction === 'mouse')
      await user.click(screen.getByRole('button', { name: 'Service healthy' }))
    else {
      await user.tab()
      await user.keyboard('[Enter]')
    }
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Service healthy')
    await user.keyboard('[Escape]')
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  }
)

it('Tracker does not open tooltips when disabledTooltip is set', async () => {
  render(<Tracker disabledTooltip data-testid="tracker" data={[{ tooltip: 'Service healthy' }]} />)
  await userEvent.setup().click(screen.getByTestId('tracker').firstElementChild!)
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
})
