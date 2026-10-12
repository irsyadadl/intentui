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

## Validation status

Before the latest Tooltip/source-test edits, `node skills/tests/validate.mjs` passed 17 groups and 30 API examples, and `node skills/tests/mcp-smoke.mjs` passed. A Skills CLI check was started. These earlier results do not verify the final edited state.

At the developer's request, final validation is left for the developer to run:

```bash
node skills/tests/validate.mjs
node skills/tests/mcp-smoke.mjs
node skills/tests/skills-cli-smoke.mjs
npx oxlint skills/intentui/scripts skills/intentui-design/scripts skills/intentui-migrate/scripts skills/tests/*.mjs
npx oxfmt --check skills/intentui/scripts skills/intentui-design/scripts skills/intentui-migrate/scripts skills/tests/*.mjs
git diff --check
```

Final source/Tooltip/codemod/mock traversal changes are pending these checks. No final passing result, real-agent evaluation, browser interaction test or production build is claimed. Synthetic tests cover registry precedence, token security, API flags and dependency traversal only. Existing shadcn MCP is used; no custom server was created.

## Premium integration limits and follow-up

Registry token values were never printed. No REGISTRY_TOKEN/IRSYAD_TOKEN was available in the inspected process/configured local env assignments, so authenticated Button/Dialog/Table/premium-block installation and published dependency resolution could not be verified. No licensed source is bundled.

The optional `audit-registry.mjs --live PROJECT ACTUAL_CATALOG_BLOCK` inspects configured-origin payloads/recursive dependencies with secure process-environment auth and emits metadata only. An external @intentui edge is flagged for actual CLI resolution verification, not automatically declared broken or rewritten. Single-registry installation is not claimed until the real dependency closure and authorized CLI installation succeed.

External Design docs already show @irsyad alone but still contain an @irsyad/modal example; review their v4 guidance separately. The commercial application/infrastructure is outside this task and was not edited. Other concurrent component/library changes in the working tree were left intact.

## Affected files

- `skills/README.md`
- `skills/intentui-design/SKILL.md`
- `skills/intentui-design/references/authentication.md`
- `skills/intentui-design/references/blocks.md`
- `skills/intentui-design/references/compatibility.md`
- `skills/intentui-design/references/composition.md`
- `skills/intentui-design/references/patterns.md`
- `skills/intentui-design/references/registry.md`
- `skills/intentui-design/references/templates.md`
- `skills/intentui-design/references/ui-kits.md`
- `skills/intentui-design/scripts/audit-registry.mjs`
- `skills/intentui-design/scripts/inspect-registry.mjs`
- `skills/intentui-migrate/SKILL.md`
- `skills/intentui-migrate/references/automation.md`
- `skills/intentui-migrate/references/breaking-changes.md`
- `skills/intentui-migrate/references/components.md`
- `skills/intentui-migrate/references/migration.md`
- `skills/intentui-migrate/references/themes.md`
- `skills/intentui-migrate/references/verification.md`
- `skills/intentui-migrate/scripts/migrate.mjs`
- `skills/intentui-migrate/scripts/token-map.json`
- `skills/intentui/SKILL.md`
- `skills/intentui/rules/component-families.md`
- `skills/intentui/rules/components.md`
- `skills/intentui/rules/composition.md`
- `skills/intentui/rules/overlays.md`
- `skills/intentui/rules/registry.md`
- `skills/intentui/rules/v4/overlays.md`
- `skills/intentui/rules/version-detection.md`
- `skills/intentui/scripts/inspect-project.mjs`
- `skills/tests/README.md`
- `skills/tests/mcp-smoke.mjs`
- `skills/tests/results.md`
- `skills/tests/scenarios.json`
- `skills/tests/sources.md`
- `skills/tests/validate.mjs`
- `src/content/blog/release-v4.mdx`
- `src/content/docs/getting-started/ai.mdx`
