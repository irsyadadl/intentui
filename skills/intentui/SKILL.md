---
name: intentui
description: Create, modify, review, debug, and install Intent UI React components using the project's actual v3 or v4 source. Use for Intent UI requests or UI work in projects with installed Intent UI components, including React Aria-based Intent UI. Do not activate for React or Tailwind alone. Premium Design Intent UI discovery belongs to intentui-design; explicit upgrades belong to intentui-migrate.
---

# Intent UI

Intent UI installs editable TSX source through a shadcn-compatible registry. Local source is the API authority; shadcn skills provide tooling architecture, not Intent UI component APIs.

First follow the documentation and source priority below.

1. Read [version detection](rules/version-detection.md); its optional [read-only inspector](scripts/inspect-project.mjs) reports evidence. Resolve the consuming workspace, `components.json`, TypeScript aliases, installed components, and CSS. Determine v3, v4, mixed, or unknown before choosing APIs; retain that evidence for the task and recheck only changed families/dependencies. Never upgrade during ordinary development.
2. Read [components](rules/components.md) and only the references needed for the task. Inspect local exports, props, imports, and customizations before generating TSX. Prefer existing components. Do not invent APIs or add comments to generated source.
3. For missing components, read [registry](rules/registry.md). Search, inspect, check version compatibility and dependencies, then install with existing authorization. Review file conflicts before replacing customized source.
4. Run available TypeScript, lint, build, and relevant tests for the affected code. Report failures and manual interaction checks accurately.

## Documentation and source priority

Read [llms.txt](https://intentui.com/llms.txt) first, then fetch only the relevant documentation URLs from that index in their `.md` form. The main [Intent UI docs](https://intentui.com/docs/getting-started/introduction.md) describe v4 by default; they do not establish the version of copied components in an existing project. Reuse documentation already read during the task. If the index is unavailable, try the relevant docs page directly and report any access limitation.

Use docs for current v4 APIs and composition, then inspect installed source for actual exports and local customizations. When implementation details or missing v4 components are needed, inspect the selected registry's individual payload and necessary dependencies, preserving the project's namespace and authentication rules.

GitHub is a fallback for historical v3 source, an upstream ancestor needed to distinguish customizations, or details unavailable in docs and registry. Existing GitHub links in these references are provenance and fallback links, not mandatory fetches. State the unresolved question before fetching only the relevant files and necessary dependencies. Record a commit when historical source is used. Do not clone or download entire branch archives by default, and do not fetch both branches merely to confirm v4 APIs. If published docs and a registry payload disagree, report the discrepancy and use the inspected payload for the code actually being installed; do not silently substitute a branch snapshot.

## Load on demand

- Choosing components: [family decisions](rules/component-families.md). Building a page: [composition](rules/composition.md).
- Styling or Button: [styling](rules/styling.md), [icons](rules/icons.md), then the detected version's [v3 components](rules/v3/components.md) and [v3 styling](rules/v3/styling.md), or [v4 components](rules/v4/components.md) and [v4 styling](rules/v4/styling.md).
- Form: [forms](rules/forms.md). Collection: [collections](rules/collections.md).
- Dialog, Sheet, Menu, Popover, Tooltip, or context interaction: [overlays](rules/overlays.md), then [v3 overlays](rules/v3/overlays.md) or [v4 overlays](rules/v4/overlays.md).
- Premium resources: use `intentui-design` when available. If installed independently, consult [Design documentation](https://design.intentui.com/docs/getting-started); component rules still apply.
- Explicit migration: use `intentui-migrate` when available. Otherwise consult both version references and upstream source within the requested scope.

For a future version, inspect authoritative source rather than forcing v3/v4 rules. Add its references inside this skill; do not create another version-named entry point.
