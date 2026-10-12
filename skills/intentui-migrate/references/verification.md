# Verification and reporting

Run the project's available TypeScript, lint, production build and relevant automated tests using its configured package manager. Compare baseline failures with post-change results. Do not introduce unrelated changes merely to make the whole application's baseline green. Confirm import resolution and dependency/lockfile consistency; search for removed exports, old overlay compositions and exact old semantic token references.

Review every replaced v3 button-like trigger, including aliased imports and re-exports: its replacement must resolve to `Button` from `react-aria-components/Button`, never the UI Button. Confirm obsolete trigger imports/types are removed, button props are on the button, wrapper state is on the wrapper, and unsupported styling props have been converted to preserved classes/styles. Existing UI Buttons that were not old trigger aliases may retain their imports.

Check changed features manually or with existing interaction tests:

- Dialog: accessible name and role, initial focus, Tab containment, Escape/outside dismissal, close buttons, focus return, controlled/nested dialogs, alertdialog restrictions.
- Sheet: position including RTL start/end, snap points, swipe/long-touch behavior, stacking, overscroll, reduced motion, floating appearance and focus.
- Menu/context menu: keyboard opening, arrows/typeahead, IDs/selection, disabled/action items, submenus, right-click, long press and focus return.
- Popover/Tooltip: trigger association, accessible roles/names/descriptions, hover/focus timing, controlled dismissal, placement, focus return.
- Collections/forms: keyboard selection, stable IDs, required/invalid/server errors, DateValue formatting, submit semantics.
- Themes: all relevant semantic families in light/dark mode, responsive layouts and custom colors.
- Premium blocks: preserve @irsyad configuration/headers and licensed customizations; identify remaining v3 dependencies.

Report files modified; migrated component families; CSS/token changes; dependency changes; check commands and pass/fail/baseline results; remaining issues; and manual checks still required. Distinguish typechecked examples, static validation, fixture tests, agent evaluations, and actual authenticated installs. Never report a mocked premium response as live authentication success.

After codemods, verify idempotence and review skipped shapes before claiming completion. Confirm components.json/authentication files are byte-for-byte unchanged when outside the requested migration. Optional live premium dependency/installation tests must be reported separately from mock HTTP, CLI commands and agent fixture evaluations.
