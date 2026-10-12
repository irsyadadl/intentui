# Skill improvement results

Updated the existing three skills on 4.x. The public installation command remains `npx skills add irsyadadl/intentui`; no repository settings changed.

## Seven improvements

1. Component decisions cover actions/content/forms/navigation/overlays/collections/feedback/charts/layout/loading/search, using verified upstream exports and local source.
2. Premium discovery derives functional concepts, searches real candidates, compares requirements/dependencies and distinguishes custom work from official resources.
3. Page composition covers analytics, settings, marketing and commerce, including routes/data, responsive behavior, hierarchy, spacing, accessible interaction and feedback states.
4. Migration adds two narrow executable codemods: exact semantic tokens/CSS variables and unambiguous Modal consumers. Dry-run is default; unsupported/colliding/shadowed/custom trigger shapes are skipped, registry/secrets are protected, and custom content/styles are retained. Complex Sheet/Menu/Context Menu/Popover/Tooltip conversions remain manual.
5. Realistic scenarios now include v3/v4, Sheet/Tooltip, customized migration, premium-only public components, v3 commercial guards and intent-based discovery. Deterministic scenarios are not reported as real-agent/browser evaluations.
6. Entry points remain concise with on-demand family/composition/automation references. Project evidence is reused until invalidated, and each skill is independently installable.
7. Maintenance checks actual v3 Git/current v4 working-tree exports and types, all semantic aliases and codemod output. Current Tooltip exports/composition are explicitly covered so old v4 snapshots cannot mask API changes.

## Registry policy

- Public-only: @intentui for public compatible components.
- Licensed v4: @irsyad for public components and premium resources; no @intentui requirement.
- Both configured in v4: prefer @irsyad independent of key order; preserve existing entries/URLs/headers.
- Missing/expired commercial auth: explain and stop that workflow, no silent fallback.
- v3/mixed: Design is v4-only; inspect incompatibilities and suggest a separately requested migration, never upgrade/downgrade automatically.

[Setup examples](../README.md) show independent public and premium configurations. The inspector separates configuration, token presence and supplied verified-live access evidence. Mock access evidence never counts as live proof.

## Latest Tooltip correction

v3: Tooltip → focusable trigger + TooltipContent. Current v4: TooltipTrigger → focusable trigger + Tooltip. Timing/open state belongs to TooltipTrigger; positioning/offset/arrow/inverse belongs to Tooltip. Current v4 removes TooltipContent. Rules, migration before/after TSX, payload audit and source/type checks were updated. No component-library Tooltip implementation was edited by this work.

## Review on 2026-10-12

Kept the three independent skills and Design's v4-only unified @irsyad registry policy.

- Registry dependencies now distinguish built-in shadcn bare names from @irsyad names, resolve configured external namespaces, expand registry-specific URLs/styles/parameters/environment references, and keep headers scoped to their own registry. Resolved URL deduplication handles aliases and cycles. Unconfigured namespaces, unsupported local/GitHub addresses and direct URLs outside the configured @irsyad origin are reported as unresolved; no namespace is silently added or rewritten.
- Migration dry-run includes unified code diffs with three context lines. Git is required for changed-file previews. AST-guided text edits preserve unrelated TSX formatting, quotes, comments and line endings; aliases, customization, protected files and idempotence remain covered.
- Regression checks cover actual CLI preview output, aliases, source preservation, bare shadcn names, scoped external credentials, missing configuration/environment, cycles and sanitized unresolved edges. Stale API matching uses identifier boundaries.

## Validation status

All checks passed against the final reviewed files:

| Check                                                                                                                         | Result                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `node skills/tests/validate.mjs`                                                                                              | 20 groups, including v3/v4 source-backed API typechecks and codemod output                                           |
| `node skills/tests/mcp-smoke.mjs`                                                                                             | Six actual shadcn MCP registry tools, exposed search schema, local namespace discovery and installation command      |
| `node skills/tests/skills-cli-smoke.mjs`                                                                                      | Skills CLI 1.7.2: all three together and independently; helper/reference bytes preserved; temporary projects removed |
| `npx oxlint skills/intentui/scripts skills/intentui-design/scripts skills/intentui-migrate/scripts skills/tests/*.mjs`        | Passed                                                                                                               |
| `npm run lint`                                                                                                                | Passed across the repository                                                                                         |
| `npx oxfmt --check skills/intentui/scripts skills/intentui-design/scripts skills/intentui-migrate/scripts skills/tests/*.mjs` | Passed                                                                                                               |
| `npx oxfmt --check .`                                                                                                         | Passed across the repository                                                                                         |
| `git diff --check`                                                                                                            | Passed                                                                                                               |

The Skills CLI test ran with npm network access. No live premium authentication/install, real-agent/browser evaluation or production build is claimed. Mock traversal remains separate from live evidence; existing shadcn MCP is used, with no custom server.

## Premium integration limits and follow-up

Registry token values were never printed. No REGISTRY_TOKEN/IRSYAD_TOKEN was available in the inspected process/configured local env assignments, so authenticated Button/Dialog/Table/premium-block installation and published dependency resolution could not be verified. No licensed source is bundled.

The optional `audit-registry.mjs --live PROJECT ACTUAL_CATALOG_BLOCK` inspects recursive dependencies from @irsyad, built-in shadcn and explicitly configured namespaces with registry-scoped process-environment auth and emits metadata only. Unknown namespaces and unconfigured external URLs require separate resolution verification; they are not declared broken or rewritten. Single-registry installation is not claimed until the real dependency closure and authorized CLI installation succeed.

External Design docs already show @irsyad alone but still contain an @irsyad/modal example; review their v4 guidance separately. The commercial application/infrastructure is outside this task and was not edited. Other concurrent component/library changes in the working tree were left intact.

## Files changed in this review

- `skills/intentui-design/scripts/audit-registry.mjs`
- `skills/intentui-design/references/registry.md`
- `skills/intentui-migrate/scripts/migrate.mjs`
- `skills/intentui-migrate/references/automation.md`
- `skills/tests/validate.mjs`
- `skills/tests/README.md`
- `skills/tests/results.md`
