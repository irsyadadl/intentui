# Research provenance and corrections

Research performed on 2026-10-12. Component APIs and tokens were verified against the local upstream commits below; branch URLs are navigation aids and may later move.

- v3: `148acd77308d4a13b31b2ae2846d243b486c1f60`.
- v4: `c6ecd68a44522ef20b67da5b398028464308ce8a`.
- API sources: `src/components/ui/`, corresponding `src/components/examples/`, `src/lib/primitive.ts`, `src/stubs/installation/main.css.stub`, theme CSS and package manifests on each branch.
- Architecture: [shadcn skills](https://github.com/shadcn-ui/ui/tree/main/skills), [shadcn skill](https://github.com/shadcn-ui/ui/tree/main/skills/shadcn), [migration skill](https://github.com/shadcn-ui/ui/tree/main/skills/migrate-radix-to-base). Reviewed frontmatter, relative references, component-family routing, project-aware CLI/MCP, golden source comparisons and verification. Their component APIs are not reused.
- Legacy: [intentui/skills](https://github.com/intentui/skills), its intentui SKILL.md and all six rule files (components, forms, collections, overlays, styling, cli).
- [Agent Skills specification](https://agentskills.io/specification): frontmatter names/descriptions and progressive disclosure.
- [Intent UI](https://intentui.com), local branch installation/AI docs: public namespace and framework setup.
- [Design Intent UI](https://design.intentui.com), [getting started](https://design.intentui.com/docs/getting-started), official starter-kit docs: @irsyad, Bearer environment placeholders, blocks versus kits/templates. Local commercial docs were inspected read-only; no premium implementation was copied.
- v4 theme-variant caveat: `src/styles/themes/*.css` retains `--color-bg: var(--background)`; documented separately from the canonical installation mapping, without editing library CSS.
- [shadcn MCP](https://ui.shadcn.com/docs/registry/mcp), [authentication](https://ui.shadcn.com/docs/registry/authentication), installed shadcn CLI help and MCP schemas: registry operations, environment resolution, search/view/add fallback. No custom server.

## Legacy guidance retained and corrected

| Legacy guidance                                                                  | Result                                                                                  |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Prefer existing components, semantic tokens, intent prop, accessible form fields | retained with local-source verification                                                 |
| TextField/NumberField, Fieldset/Legend, Description/FieldError                   | retained and verified across both branches                                              |
| Stable collection IDs, selection state, textValue and accessible names           | retained; removed application-wide map ban and verified wrapper-specific rendering      |
| v3 Modal and Menu composition                                                    | preserved inside v3 references; v4 structural mapping added                             |
| Sheet side/right-default and motion Drawer instructions                          | corrected to installed position/bottom-default/React Aria Sheet; no invented Drawer API |
| v3 colors everywhere and invented info families                                  | separate complete source-derived color tables, preserving custom/optional tokens        |
| never cn; tailwind-merge required                                                | removed; cn package and render-prop cx verified in source                               |
| hardcoded src/components/ui and @/ imports                                       | examples marked illustrative; workspace/aliases/framework resolution required           |
| first registry key, immutable config, guessed items                              | explicit public/private selection; preserve/merge config; inspect catalog first         |
| load every rule and CLAUDE_SKILL_DIR paths                                       | concise portable entry points with relative on-demand references                        |
| React-only broad activation and limited allowed-tools                            | precise Intent UI/premium/migration descriptions, no host-specific tool restriction     |
| blanket use client and replace all HTML                                          | framework-aware client boundary and semantic layout markup allowed                      |

These are maintained workflow instructions, not copies of all upstream manuals. Static/fixture checks cannot prove real agent adherence, interactive behavior, or licensed access. See [test procedure](README.md).

## Unified v4 update

The product policy supplied by the maintainer now establishes Design Intent UI as v4-only and @irsyad as the authenticated superset. Old purpose-only separation rules are superseded: prefer @irsyad for public components too in a licensed v4 project. Public-only and v3 component workflows retain compatible @intentui source. Preserve both entries if they exist; never add duplicates or silently fall back after auth failure.

Current local v4 Tooltip source was inspected during this update: exports TooltipTrigger/Tooltip/TooltipProps, removes TooltipContent, and moves timing/state to the trigger wrapper. v3 retains its original Tooltip/TooltipContent composition. Tests now read current local v4 source instead of treating an old v4 snapshot as current. No commercial payload was verified live because registry credentials were unavailable. External Design getting-started documentation already shows @irsyad alone, but still includes an @irsyad/modal example requiring a v4 documentation review outside this repository.
