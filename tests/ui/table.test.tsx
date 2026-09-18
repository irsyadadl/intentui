import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../utils/render'
import { User } from '@react-aria/test-utils'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table'
const ariaUser = new User({ interactionType: 'mouse' })
describe('Table', () => {
  it('reports sorting through the column header', async () => {
    const onSortChange = vi.fn()
    render(
      <Table aria-label="People" onSortChange={onSortChange}>
        <TableHeader>
          <TableColumn id="name" isRowHeader allowsSorting>
            Name
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow id="ada">
            <TableCell>Ada</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const tester = ariaUser.createTester('Table', { root: screen.getByRole('grid') })
    await tester.toggleSort({ column: 'Name' })
    expect(onSortChange).toHaveBeenLastCalledWith({ column: 'name', direction: 'ascending' })
  })
  it('renders a custom empty state', () => {
    render(
      <Table aria-label="People">
        <TableHeader>
          <TableColumn isRowHeader>Name</TableColumn>
        </TableHeader>
        <TableBody items={[]} renderEmptyState={() => 'No people'}>
          {() => (
            <TableRow>
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
    expect(screen.getByText('No people')).toBeInTheDocument()
  })
})

it('Table wires its automatic row and select-all checkboxes', async () => {
  const onSelectionChange = vi.fn()
  render(
    <Table aria-label="People" selectionMode="multiple" onSelectionChange={onSelectionChange}>
      <TableHeader>
        <TableColumn isRowHeader>Name</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow id="ada">
          <TableCell>Ada</TableCell>
        </TableRow>
        <TableRow id="grace">
          <TableCell>Grace</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
  const tester = ariaUser.createTester('Table', { root: screen.getByRole('grid') })
  await tester.toggleRowSelection({ row: 'Ada' })
  expect(tester.getSelectedRows()).toHaveLength(1)
  expect(Array.from(onSelectionChange.mock.calls.at(-1)![0])).toEqual(['ada'])
  await tester.toggleSelectAll()
  expect(tester.getSelectedRows()).toHaveLength(2)
  await tester.toggleSelectAll()
  expect(tester.getSelectedRows()).toHaveLength(0)
})
