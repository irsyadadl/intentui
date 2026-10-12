# Discover blocks by intent

Translate the request into functional sections and search concepts rather than assume an exact block name. "Analytics SaaS dashboard with billing" suggests analytics/dashboard/statistics/charts/tables/billing; "account security" suggests settings/profile/password/sessions. Keep the user's required actions, data and design direction, not just its visual category.

1. Inspect the existing shell, routes/data, v4 dependency compatibility and authorized @irsyad configuration.
2. Search relevant concepts/categories in the catalog using explicit @irsyad MCP or CLI searches. Start with the primary function, broaden to related sections if needed; inspect pagination and actual resource pages.
3. Inspect returned candidates: files/preview when available, item type, responsive layouts, content structure, accessibility and dependency closure. A pattern page is not automatically an installable item.
4. Compare a short candidate set against required functions, shell/layout fit, existing components, dependency/customization cost, breakpoints and accessible interactions. Describe evidence and missing information; do not invent numerical scores, previews, or results.
5. Prefer existing purchased resources that fit. A dashboard may compose an analytics block and a billing section rather than force one unrelated block to do everything. Identify reusable parts and avoid redundant shells.
6. Verify v4 source and recursive registryDependencies. Stop missing authentication or an unresolved public-namespace dependency; report the actual edge/item. Review file conflicts and local customizations.
7. Install selected verified addresses with existing authorization. Integrate routes, real data, actions and feedback states using [composition](composition.md). Check TS/imports/build and responsive/keyboard behavior.

If no relevant candidate exists, state what was searched and what is missing. A custom implementation may satisfy the request, but label it as custom and do not claim official premium provenance. An authentication failure is not an empty catalog and does not authorize a public fallback.

[Official catalog](https://design.intentui.com/blocks); [registry workflow](registry.md).
