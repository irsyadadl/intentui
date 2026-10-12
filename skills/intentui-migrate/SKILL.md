---
name: intentui-migrate
description: Audit or migrate Intent UI v3 components and theme tokens to v4 when the user explicitly requests an upgrade, migration, old Modal conversion, v4 token update, or pre-upgrade audit. Supports one feature or a whole application. Do not activate for ordinary component development or premium resource discovery.
---

# Intent UI v3 to v4 migration

Choose the smallest requested scope: **audit** reports changes without editing; **component** converts one component/feature and required dependencies; **full** migrates the application only when explicitly requested.

1. Read [migration procedure](references/migration.md). Inspect installed source, CSS, consumers, aliases, dependencies, customizations, mixed versions, and premium resources. Record baseline checks.
2. Load only affected mappings: [components](references/components.md), [themes](references/themes.md), [breaking changes](references/breaking-changes.md). Verify upstream source for anything not covered; do not guess props or exports.
3. For supported exact tokens or simple Modal consumers, read [safe automation](references/automation.md); use its dry-run before applying. Sheet/Menu/Context Menu/Popover remain source-aware manual migrations. Preview the concrete changes and behavioral risks. Apply incrementally within the user's authorization; preserve customizations, licensed files, and registry configuration. Audit mode never modifies files.
4. Read [verification](references/verification.md), run available checks, and report modified files, component/theme changes, failures, remaining issues, and required manual tests. Do not claim success on failed verification.

This skill works independently: references include both version mappings and source links. If intentui is available, consult its version rules as needed. Never overwrite customized components wholesale, perform global string replacements, publish resources, or expand a component conversion into an unrequested full migration. Generated React source is TSX without comments.
