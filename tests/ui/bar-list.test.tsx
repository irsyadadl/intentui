import { it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { BarList } from '@/components/ui/bar-list'

it('BarList interactive rows support keyboard activation and retain their payload after sorting', async () => {
  const user = userEvent.setup(),
    onValueChange = vi.fn()
  const data = [
    { name: 'React', value: 10 },
    { name: 'Vue', value: 20 },
  ]
  render(<BarList data={data} onValueChange={onValueChange} />)
  expect(screen.getAllByRole('button').map((button) => button.textContent)).toEqual([
    'Vue',
    'React',
  ])
  await user.tab()
  await user.keyboard('[Enter]')
  expect(onValueChange).toHaveBeenLastCalledWith(data[1])
  expect(data.map((item) => item.name)).toEqual(['React', 'Vue'])
})
