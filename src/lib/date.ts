export function formatDatetime(input?: string): string {
  const date = input ? new Date(input) : new Date()
  const now = new Date()

  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "")
}

export function formatDate(input?: string | Date): string {
  const date = input ? new Date(input) : new Date()
  const now = new Date()

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
  })
}

const DAY_MS = 24 * 60 * 60 * 1000

export function getCalendarDaysUntil(deadline: Date): number | null {
  const now = new Date()
  if (now.getTime() >= deadline.getTime()) return null

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfDeadlineDay = new Date(
    deadline.getFullYear(),
    deadline.getMonth(),
    deadline.getDate()
  )
  const days = Math.round((startOfDeadlineDay.getTime() - startOfToday.getTime()) / DAY_MS)
  return Math.max(0, days)
}

export function formatDaysLeft(count: number): string {
  if (count === 1) return "1 day left"
  return `${count} days left`
}

export function formatHumans(date: Date) {
  const diff = Date.now() - date.getTime()
  const s = Math.floor(diff / 1000)
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (s < 60) return "just now"
  if (m < 60) return `${m}m ago`
  if (h < 24) return `${h}h ago`
  return `${d}d ago`
}
