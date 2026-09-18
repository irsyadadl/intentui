import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { User } from '@react-aria/test-utils'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
const ariaUser = new User({ interactionType: 'mouse' })
function Example({ disabled = false, onChange = vi.fn() }) {
  return (
    <Select
      data-testid="select"
      aria-label="Fruit"
      placeholder="Choose fruit"
      isDisabled={disabled}
      onChange={onChange}
    >
      <SelectTrigger />
      <SelectContent>
        <SelectItem id="apple">Apple</SelectItem>
        <SelectItem id="pear">Pear</SelectItem>
        <SelectItem id="grape" isDisabled>
          Grape
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
describe('Select', () => {
  it.each(['mouse', 'keyboard'] as const)('selects an item via %s', async (interactionType) => {
    const onChange = vi.fn()
    render(<Example onChange={onChange} />)
    const tester = ariaUser.createTester('Select', {
      root: screen.getByTestId('select'),
      interactionType,
    })
    expect(tester.getTrigger()).toHaveTextContent('Choose fruit')
    await tester.toggleOptionSelection({ option: 'Pear' })
    expect(tester.getTrigger()).toHaveTextContent('Pear')
    expect(onChange).toHaveBeenLastCalledWith('pear')
  })
  it('cannot open a disabled select', async () => {
    render(<Example disabled />)
    await userEvent.setup().click(screen.getByRole('button'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
  it('exposes disabled options and dismisses with Escape', async () => {
    const user = userEvent.setup(),
      onChange = vi.fn()
    render(<Example onChange={onChange} />)
    await user.click(screen.getByRole('button'))
    const option = screen.getByRole('option', { name: 'Grape' })
    expect(option).toHaveAttribute('aria-disabled', 'true')
    await user.click(option)
    expect(onChange).not.toHaveBeenCalled()
    await user.keyboard('[Escape]')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})

it('Select reflects controlled values without changing them internally', async () => {
  const onChange = vi.fn()
  const example = (value: string) => (
    <Select aria-label="Fruit" value={value} onChange={onChange} data-testid="controlled">
      <SelectTrigger />
      <SelectContent>
        <SelectItem id="apple">Apple</SelectItem>
        <SelectItem id="pear">Pear</SelectItem>
      </SelectContent>
    </Select>
  )
  const { rerender } = render(example('apple'))
  const tester = ariaUser.createTester('Select', { root: screen.getByTestId('controlled') })
  await tester.toggleOptionSelection({ option: 'Pear' })
  expect(onChange).toHaveBeenLastCalledWith('pear')
  expect(tester.getTrigger()).toHaveTextContent('Apple')
  rerender(example('pear'))
  expect(tester.getTrigger()).toHaveTextContent('Pear')
})
