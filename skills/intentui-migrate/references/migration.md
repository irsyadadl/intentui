# Migration procedure

## Establish scope and baseline

Audit mode is read-only. Component mode migrates the requested feature and its necessary dependency closure. Full mode requires an explicit application-wide upgrade request. Inspect the current Git diff and preserve unrelated work. Resolve the consuming workspace and aliases; Laravel + Inertia and monorepos need their own configured paths.

Read current component implementations, exports and consumers, CSS variable definitions and usage, registry configuration, and package/lockfile versions. Determine each affected family's actual version. Record TypeScript/lint/build/test baseline results before edits; failures may predate migration.

## Compare source

Read [llms.txt](https://intentui.com/llms.txt) and the relevant v4 `.md` docs first, including the [upgrade guide](https://intentui.com/docs/prologue/upgrade-guide.md). Compare affected local wrappers with the documented target API; inspect individual target payloads from the project's selected registry when implementation details are needed. Include only transitive wrappers, primitives and hooks affected by the requested conversion, and inspect their registry dependencies and actual React Aria types.

A historical ancestor comparison is useful when local customizations cannot be established from installed source and the documented mappings. In that case fetch only the relevant [3.x files](https://github.com/irsyadadl/intentui/tree/3.x/src/components/ui) and record the inspected commit; do not assume the branch tip is the installed component's exact ancestor. Use [4.x files](https://github.com/irsyadadl/intentui/tree/4.x/src/components/ui) only for target details unavailable in docs and registry. These links are fallback sources, not a requirement to download both branches. Do not clone or fetch full branch archives by default.

Classify pristine versus customized wrappers. Replay local customizations onto target source, using a reviewed three-way comparison when useful. A conflict-free merge is not proof that APIs or behavior are correct. Do not use bulk shadcn overwrite. Keep mixed versions buildable by preserving old wrappers for remaining consumers or using explicitly named temporary local targets; remove them only when no consumers remain.

## Install missing target components

Inspect the consuming project's `components.json` before choosing a registry namespace. If `registries` contains `@irsyad`, install missing target components through `@irsyad`, including public components, even when `@intentui` is also present. For example, a Modal migration requiring an absent Dialog uses `npx shadcn@latest add @irsyad/dialog`. Use `@intentui/dialog` only when `@irsyad` is absent and the configured public registry supports the v4 target. Verify the selected registry's target version before installation.

Use the registry CLI for missing components and inspect its dependency closure for existing customized files before applying. Preserve configured URLs, headers and Bearer placeholders. Do not add or switch to `@intentui` when `@irsyad` is configured, and do not fall back to it after an authentication or entitlement failure; report the blocker. Never use bulk overwrite to upgrade existing wrappers; compare them with target source and replay local customizations instead. Audit mode reports the required installs without running them.

## Preview and increment

Show proposed file/import/composition/CSS changes and behaviors requiring review. This preview does not require a new approval when the requested migration already authorizes those changes. Unrequested full-app changes or replacement of unrelated licensed products require separate authorization.

Apply imports and JSX according to [component mappings](components.md), migrate exact semantic tokens using [themes](themes.md), and review [breaking changes](breaking-changes.md). Update necessary dependencies with the existing package manager and lockfile. Preserve custom light/dark values, aliases, route conventions, registry URLs and Bearer placeholders. For premium blocks inspect entitlement and dependencies; change only licensed resources within the requested migration scope and report blocks requiring manual conversion.

Run [verification](verification.md) after each meaningful group. Report scope, changed files/components, tokens, dependency changes, tests, baseline failures, remaining issues, and manual checks. Never call a partially migrated project fully upgraded.

Design Intent UI is v4-only and @irsyad contains public components too. During an upgrade preserve its existing URL/headers without adding @intentui or removing existing namespaces. Review each licensed resource for remaining old APIs; policy alone does not prove payload correctness.
