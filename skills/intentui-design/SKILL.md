---
name: intentui-design
description: Discover, install, and integrate commercial Design Intent UI resources from design.intentui.com, including premium blocks, patterns, UI kits, templates, starter kits, and the authenticated @irsyad registry. Use for purchased resources or explicit Design Intent UI requests. General public component development belongs to intentui; upgrades only activate intentui-migrate when requested.
---

# Design Intent UI

Use purchased resources through their documented authorized workflow. This skill is independently installable; consult local APIs and upstream Intent UI source if the component skill is unavailable.

1. Inspect workspace configuration and installed Intent UI version. Read [compatibility](references/compatibility.md), and the component skill's version rules when available.
2. Read [registry](references/registry.md) and [authentication](references/authentication.md). Preserve URLs, headers, aliases, and license boundaries. Verify access without printing tokens; the optional [registry inspector](scripts/inspect-registry.mjs) checks configuration only.
3. Load only the requested resource reference: [blocks](references/blocks.md), [patterns](references/patterns.md), [UI kits](references/ui-kits.md), or [templates and starter kits](references/templates.md).
4. Search the authorized catalog, inspect matching items and dependencies, select a relevant resource, review conflicts, install within the user's authorization, and integrate with local routes/layouts. Use shadcn MCP when available or the verified CLI fallback in the registry reference.
5. Verify TSX imports, TypeScript, lint/build and affected interactions. Report the exact resource used, access or compatibility gaps, and test results. Never claim a premium install when it failed or was substituted.

Do not copy licensed premium source into public skill files, invent resource names, bypass access controls, or migrate an entire application to integrate one block. Generated source uses TSX without comments.
