# Components and project conventions

Find a component locally, read its exported values and types, inspect representative consumers, and resolve the actual alias before using it. Prefer Intent UI Button, Link, Input/TextField, Table, Card, Heading, Text, Separator, Badge, Skeleton, and other existing components when they provide the requested behavior. Semantic HTML for layout and content is allowed; do not replace every `div` or `span` mechanically.

Use `intent` for the installed Button's color intent (such as `primary`, `outline`, `plain`, `danger`), and its supported `size`. Do not substitute shadcn's `variant` or Radix's `asChild`. React Aria commonly uses `onPress`, `isDisabled`, and `isPending`; inspect the actual component rather than applying blanket rules to every prop.

Generated React files use TypeScript/TSX without source comments. Preserve local composition, formatting, routing, business logic, styles, and customizations. Framework navigation may use existing adapters; do not insert Next.js imports into Inertia or SPA applications.

Read [v3 components](v3/components.md) or [v4 components](v4/components.md) after [version detection](version-detection.md). For forms and collections use [forms](forms.md) and [collections](collections.md). For overlays use [overlays](overlays.md).

Dashboard workflow: inspect existing Sidebar/Navbar/Card/Chart/Table APIs, compose a named page with accessible collections and semantic tokens, and integrate with the application's route/layout. A request for a public dashboard does not imply a premium purchase or version upgrade.

For decisions across actions, content, forms, navigation, overlays, collections, feedback, charts, layout, loading and search, read [component families](component-families.md). For a complete page read [composition](composition.md). Load neither for a small task whose component is already established.
