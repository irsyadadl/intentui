import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../utils/render'
import { fireEvent, waitFor } from '../utils/render'
import { DropZone } from '@/components/ui/drop-zone'
import { FileTrigger } from '@/components/ui/file-trigger'

describe('DropZone', () => {
  it('accepts a dropped text item', async () => {
    const onDrop = vi.fn()
    render(
      <DropZone aria-label="Upload" onDrop={onDrop} data-testid="drop">
        <FileTrigger>Browse</FileTrigger>
      </DropZone>
    )
    const dataTransfer = {
      types: ['text/plain'],
      items: [
        {
          kind: 'string',
          type: 'text/plain',
          getAsString: (callback: (value: string) => void) => callback('Hello'),
        },
      ],
      getData: () => 'Hello',
      dropEffect: 'none',
      effectAllowed: 'all',
    }
    const zone = screen.getByTestId('drop')
    fireEvent.dragEnter(zone, { dataTransfer })
    fireEvent.dragOver(zone, { dataTransfer })
    fireEvent.drop(zone, { dataTransfer })
    await waitFor(() => expect(onDrop).toHaveBeenCalledTimes(1))
    const item = onDrop.mock.calls[0][0].items[0]
    expect(item.kind).toBe('text')
    expect(await item.getText('text/plain')).toBe('Hello')
  })
})
