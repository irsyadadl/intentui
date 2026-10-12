# Premium design blocks

For a dashboard, pricing, authentication, settings, or other premium design request:

1. Resolve consuming workspace, component aliases, CSS, router, and installed v3/v4 APIs.
2. Verify the configured @irsyad registry and [authentication](authentication.md).
3. Search the authorized catalog for the requested design and alternatives; inspect actual results and previews.
4. Choose the closest block and read its files, registry dependencies, npm dependencies, layout assumptions, responsive behavior, and assets.
5. Check [compatibility](compatibility.md), customized components, and target paths before installation. Existing purchased blocks are preferred when they fit.
6. Install the verified item within the user's authorization; review overwrite conflicts and dependency changes. Do not use a bulk all-components install to integrate one block.
7. Wire routes, layouts, application data, and actions according to local conventions; replace demonstration content deliberately. Preserve accessibility and licensed source boundaries.
8. Run TypeScript, lint/build and relevant tests; manually check responsiveness, overlays, navigation, and collection selection.

Some catalog pages are examples or patterns rather than registry items. Only use `shadcn add` when the official resource page/catalog documents a registry address. Report absent access, mismatched APIs, or missing assets explicitly. [Official blocks catalog](https://design.intentui.com/blocks).
