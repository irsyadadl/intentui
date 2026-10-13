---
name: intentui-migrate
description: Audit or migrate Intent UI v3 components and theme tokens to v4 when the user explicitly requests an upgrade, migration, old Modal conversion, v4 token update, or pre-upgrade audit. Supports one feature or a whole application. Do not activate for ordinary component development or premium resource discovery.
---

# Intent UI v3 to v4 migration

Choose the smallest requested scope: **audit** reports changes without editing; **component** converts one component/feature and required dependencies; **full** migrates the application only when explicitly requested.

First follow the documentation and source priority below.

1. Read [migration procedure](references/migration.md). Inspect installed source, CSS, consumers, aliases, dependencies, customizations, mixed versions, and premium resources. Record baseline checks.
2. Load only affected mappings: [components](references/components.md), [themes](references/themes.md), [breaking changes](references/breaking-changes.md). Verify current v4 docs, then the selected registry payload for anything not covered; use GitHub only under the fallback rules below; do not guess props or exports.
   Before installing missing target components, inspect `components.json`. If `registries` contains `@irsyad`, use `@irsyad/<component>` even when `@intentui` is also configured; preserve its URL and auth headers. Follow the registry installation rules in [migration procedure](references/migration.md#install-missing-target-components).
3. When replacing a v3 button-like trigger (`MenuTrigger`, `ModalTrigger`, `DialogTrigger`, `SheetTrigger`, `PopoverTrigger`, or `TooltipTrigger`), use `Button` from `react-aria-components/Button`, never the Intent UI button. The v4 trigger is a wrapper around that button and its overlay; move button props and preserve styling as described in [trigger replacement rules](references/components.md#replacing-v3-button-like-triggers). Existing Intent UI buttons are a separate case; do not globally replace their imports.
4. For supported exact tokens or simple Modal consumers, read [safe automation](references/automation.md); use its dry-run before applying. Sheet/Menu/Context Menu/Popover remain source-aware manual migrations. Preview the concrete changes and behavioral risks. Apply incrementally within the user's authorization; preserve customizations, licensed files, and registry configuration. Audit mode never modifies files.
5. Read [verification](references/verification.md), run available checks, and report modified files, component/theme changes, failures, remaining issues, and required manual tests. Do not claim success on failed verification.

## Documentation and source priority

Read [llms.txt](https://intentui.com/llms.txt) first, then fetch only the relevant documentation URLs from that index in their `.md` form. The main [Intent UI docs](https://intentui.com/docs/getting-started/introduction.md) describe v4 by default; they do not establish the version of copied components in an existing project. Reuse documentation already read during the task. If the index is unavailable, try the relevant docs page directly and report any access limitation.

Use docs for current v4 APIs and composition, then inspect installed source for actual exports and local customizations. When implementation details or missing v4 components are needed, inspect the selected registry's individual payload and necessary dependencies, preserving the project's namespace and authentication rules.

GitHub is a fallback for historical v3 source, an upstream ancestor needed to distinguish customizations, or details unavailable in docs and registry. Existing GitHub links in these references are provenance and fallback links, not mandatory fetches. State the unresolved question before fetching only the relevant files and necessary dependencies. Record a commit when historical source is used. Do not clone or download entire branch archives by default, and do not fetch both branches merely to confirm v4 APIs. If published docs and a registry payload disagree, report the discrepancy and use the inspected payload for the code actually being installed; do not silently substitute a branch snapshot.

This skill works independently: references include both version mappings and source links. If intentui is available, consult its version rules as needed. Never overwrite customized components wholesale, perform global string replacements, publish resources, or expand a component conversion into an unrequested full migration. Generated React source is TSX without comments.
