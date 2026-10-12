# Styling

Read the installed CSS and the relevant [v3 tokens](v3/styling.md) or [v4 tokens](v4/styling.md). Use semantic colors where an equivalent token exists. Preserve deliberate brand, chart, or data colors when no semantic equivalent exists. Tokens provide dark-mode values; avoid redundant hardcoded overrides.

Both audited branches use `cn` from the `cn` package. It is valid for ordinary class composition. Use the installed `cx` helper for React Aria render-prop `className` composition; it delegates to `composeRenderProps`. Resolve its real import path, usually via `aliases.lib`; do not install a different merge utility merely to follow an old rule. Read utility implementations before editing them.

Tailwind CSS v4 uses `@import "tailwindcss"`, `@theme inline` aliases, and the installed React Aria plugin/animation imports. Preserve the project's configuration and plugins. Prefer supported intent/size props before restyling component internals. Layout utilities and `size-*` shorthand are useful when appropriate; they are not a reason to rewrite unrelated files.
