# Migration procedure

## Establish scope and baseline

Audit mode is read-only. Component mode migrates the requested feature and its necessary dependency closure. Full mode requires an explicit application-wide upgrade request. Inspect the current Git diff and preserve unrelated work. Resolve the consuming workspace and aliases; Laravel + Inertia and monorepos need their own configured paths.

Read current component implementations, exports and consumers, CSS variable definitions and usage, registry configuration, and package/lockfile versions. Determine each affected family's actual version. Record TypeScript/lint/build/test baseline results before edits; failures may predate migration.

## Compare source

Compare local v3 wrappers against their upstream ancestor, then compare the corresponding v4 source. Pin inspected commits in the report. [3.x components](https://github.com/irsyadadl/intentui/tree/3.x/src/components/ui) and [4.x components](https://github.com/irsyadadl/intentui/tree/4.x/src/components/ui) are authorities, not shadcn's Radix/Base APIs. Include transitive wrappers: Dialog, Sheet, Popover, Menu, Select/ComboBox, Navbar, Sidebar, shared primitives and hooks. Read registry dependencies and actual React Aria types.

Classify pristine versus customized wrappers. Replay local customizations onto target source, using a reviewed three-way comparison when useful. A conflict-free merge is not proof that APIs or behavior are correct. Do not use bulk shadcn overwrite. Keep mixed versions buildable by preserving old wrappers for remaining consumers or using explicitly named temporary local targets; remove them only when no consumers remain.

## Preview and increment

Show proposed file/import/composition/CSS changes and behaviors requiring review. This preview does not require a new approval when the requested migration already authorizes those changes. Unrequested full-app changes or replacement of unrelated licensed products require separate authorization.

Apply imports and JSX according to [component mappings](components.md), migrate exact semantic tokens using [themes](themes.md), and review [breaking changes](breaking-changes.md). Update necessary dependencies with the existing package manager and lockfile. Preserve custom light/dark values, aliases, route conventions, registry URLs and Bearer placeholders. For premium blocks inspect entitlement and dependencies; change only licensed resources within the requested migration scope and report blocks requiring manual conversion.

Run [verification](verification.md) after each meaningful group. Report scope, changed files/components, tokens, dependency changes, tests, baseline failures, remaining issues, and manual checks. Never call a partially migrated project fully upgraded.
