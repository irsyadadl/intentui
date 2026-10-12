---
name: intentui-design
description: Discover, install, and compose Design Intent UI v4 commercial resources, including premium blocks, patterns, UI kits, templates and starter kits. Use for licensed Design Intent UI requests or its authenticated @irsyad registry, which includes public components too. Requires v4; never downgrade resources for v3. General development belongs to intentui; requested upgrades belong to intentui-migrate.
---

# Design Intent UI

Design targets **v4 exclusively**. Its authenticated **@irsyad** registry contains both public components and premium resources; licensed v4 users do not need @intentui. This skill works independently using local source and official upstream APIs.

1. Establish v4 compatibility once per project/task via [compatibility](references/compatibility.md). Inspect affected exports, tokens and dependency closures again only when evidence or selected resources change. Stop incompatible v3/mixed installation; suggest a separately requested migration.
2. Read [registry](references/registry.md) and [authentication](references/authentication.md) when access is needed. The optional [inspector](scripts/inspect-registry.mjs) separates selection/configuration/token presence from verified live access. Preserve URLs/headers; no duplicate registry additions or silent fallback.
3. For a page/feature, derive search concepts from functional intent. Read [blocks](references/blocks.md) for candidate discovery/comparison or [patterns](references/patterns.md), [kits](references/ui-kits.md), [templates](references/templates.md) only for the relevant resource type. For full-page integration read [composition](references/composition.md).
4. Search the authorized catalog with shadcn MCP or its CLI fallback, inspect actual candidates, v4 APIs and recursive registry dependencies, then install within existing authorization. Report old commercial APIs or unresolved @intentui edges instead of claiming compatibility.
5. Integrate routes/data, responsive and feedback states; verify TypeScript/build and affected interactions. Report actual resources and check results. Custom code is not an official premium block.

Never expose credentials or bundle licensed source in public skills. No automatic full-app migration, v3 commercial variants, invented items/previews/scores, or blind overwrites. Generate TSX without comments.
