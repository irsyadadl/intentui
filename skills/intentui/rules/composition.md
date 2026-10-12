# Compose complete pages

Start with functional sections, data and actions, then reuse the application's existing shell and local components. Resolve routes, loaders, authorization and navigation adapters before writing TSX. Inspect installed exports; search commercial blocks only when the application uses Design Intent UI and follow its v4-only unified registry policy.

| Page intent      | Useful composition                                                                    | Decisions to verify                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Analytics        | Sidebar/Navbar shell, statistic Cards, Charts, Table, SearchField/Select/date filters | date range/filter state, metric definitions, empty datasets, accessible chart summaries, stable rows |
| Account settings | navigation, Tabs, Fieldset sections, validation, Save Button, Note/toast feedback     | unsaved state, submit/errors, keyboard tabs, destructive actions, server validation                  |
| SaaS marketing   | hero, features, proof, pricing, Disclosure FAQ, calls to action                       | user's brand/direction, heading order, anchor/navigation semantics, plan details, conversion actions |
| Commerce         | product collection, filters, detail, cart, checkout overlays/forms                    | stock/price/quantity, query state, cart updates, totals, field errors and focus return               |

These are options, not mandatory layouts. Use existing blocks/parts where they fit and avoid nesting a second application shell. Link actions use Link; mutations use Button; table data uses collection APIs. Do not replace functional requirements with a generic dashboard.

Build a clear heading/action hierarchy, consistent spacing/type scale and deliberate content density. Adapt columns/navigation/table overflow to the available width; prefer the project's existing breakpoints. Use semantic colors and check light/dark mode. Keep accessible navigation/current-page state and distinguish hover/focus/selected/disabled/pending states. Include loading skeletons, empty-data guidance, recoverable errors and completion feedback tied to the real data lifecycle. Preserve the user's design direction rather than prescribe a fixed aesthetic.

Verify imports/types, route/data wiring, responsive behavior, tab order, names, contrast and interactive states. For deeper APIs use the relevant [component-family guide](component-families.md) and local examples, not a large all-components rule load.
