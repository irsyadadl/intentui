import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../utils/render'
import { TagGroup, TagList, Tag } from '@/components/ui/tag-group'

describe('TagGroup', () => {
  it('reports the key of a removed tag', async () => {
    const onRemove = vi.fn()
    render(
      <TagGroup aria-label="Topics" onRemove={onRemove}>
        <TagList>
          <Tag id="react">React</Tag>
        </TagList>
      </TagGroup>
    )
    await userEvent.setup().click(screen.getByRole('button', { name: /remove/i }))
    expect(Array.from(onRemove.mock.calls.at(-1)![0])).toEqual(['react'])
  })
  it('does not offer removal when onRemove is absent', () => {
    render(
      <TagGroup aria-label="Topics">
        <TagList>
          <Tag id="react">React</Tag>
        </TagList>
      </TagGroup>
    )
    expect(screen.getByRole('row')).toHaveTextContent('React')
    expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument()
  })
})
