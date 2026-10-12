export function VersionNotice() {
  return (
    <aside
      aria-label="Documentation version"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-page bg-bg px-4 py-3 text-center text-sm text-muted-fg"
    >
      You're viewing the Intent UI v3 documentation.{" "}
      <a
        href="https://intentui.com"
        className="font-medium text-fg underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        Go to v4 documentation
      </a>{" "}
      to see the latest updates.
    </aside>
  )
}
