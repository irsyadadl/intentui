import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { User } from '@react-aria/test-utils'
import { RadioGroup, Radio, RadioField } from '@/components/ui/radio'
const ariaUser = new User({ interactionType: 'mouse' })
describe('RadioGroup', () => {
  it.each(['mouse', 'keyboard'] as const)('selects a radio via %s', async (interactionType) => {
    const onChange = vi.fn()
    render(
      <RadioGroup aria-label="Plan" defaultValue="basic" onChange={onChange}>
        <RadioField value="basic">
          <Radio>Basic</Radio>
        </RadioField>
        <RadioField value="pro">
          <Radio>Pro</Radio>
        </RadioField>
      </RadioGroup>
    )
    const tester = ariaUser.createTester('RadioGroup', {
      root: screen.getByRole('radiogroup'),
      interactionType,
    })
    await tester.triggerRadio({ radio: 'Pro' })
    expect(tester.getSelectedRadio()).toHaveAccessibleName('Pro')
    expect(onChange).toHaveBeenLastCalledWith('pro')
  })
  it('does not select disabled radios', async () => {
    const onChange = vi.fn()
    render(
      <RadioGroup aria-label="Plan" onChange={onChange}>
        <RadioField value="pro" isDisabled>
          <Radio>Pro</Radio>
        </RadioField>
      </RadioGroup>
    )
    await userEvent.setup().click(screen.getByRole('radio'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
