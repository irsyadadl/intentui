import { it, expect } from 'vitest'
import { render, screen } from '../utils/render'
import {
  Leaderboard,
  LeaderboardContent,
  LeaderboardItem,
  LeaderboardStart,
  LeaderboardEnd,
} from '@/components/ui/leaderboard'

it('Leaderboard exposes each row as labeled progress with its own range', () => {
  render(
    <Leaderboard>
      <LeaderboardContent>
        <LeaderboardItem value={40} maxValue={200}>
          <LeaderboardStart>Downloads</LeaderboardStart>
          <LeaderboardEnd>40</LeaderboardEnd>
        </LeaderboardItem>
      </LeaderboardContent>
    </Leaderboard>
  )
  const item = screen.getByRole('progressbar', { name: 'Downloads' })
  expect(item).toHaveAttribute('aria-valuenow', '40')
  expect(item).toHaveAttribute('aria-valuemax', '200')
  expect(item).toHaveAttribute('aria-valuetext', '20%')
})
