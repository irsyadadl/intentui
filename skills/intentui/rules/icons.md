# Icons

Inspect `components.json.iconLibrary`, installed packages, and component CSS. Audited components commonly import Heroicons from `@heroicons/react/20/solid`; the project may also use `@intentui/icons` or another configured library. Use existing imports and named exports, not invented icon identifiers.

Button and many item components size direct SVG children with selectors. Avoid redundant sizing and `data-slot="icon"` when those selectors already match. Specialized chevrons, standalone icons, and custom layouts may require attributes or sizes: inspect the relevant source. Decorative icons should not duplicate accessible names; icon-only controls need `aria-label` or visible text for assistive technology.
