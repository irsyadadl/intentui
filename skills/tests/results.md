# Implementation results

Completed locally on **4.x** on 2026-10-12. No commit or remote publication was performed. The default branch was not changed.

## Deliverables

| Skill            | Coverage                                                                                                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| intentui         | One entry point for v3/v4; source/CSS version evidence; mixed projects; existing APIs/imports; forms, collections, semantic colors, icons, overlays; public registry; shadcn MCP and CLI; Next.js, Vite, SPA, Inertia and monorepo path workflows |
| intentui-design  | Separate commercial workflow; @irsyad selection; environment Bearer authentication; sanitized missing/401/403 failures; blocks, patterns, kits, templates and starter-kit workflow distinctions; dependency/version checks; license preservation  |
| intentui-migrate | Explicit audit/component/full scope; local customization/upstream comparison; Modal/Dialog, Sheet, Menu, Context Menu, Popover and removed exports; dependency closure; exact semantic token migration; behavioral verification and reporting     |

The root README and `src/content/docs/getting-started/ai.mdx` were updated. All other new files are shown below (40 files). Existing unrelated skill links were preserved. Component implementations, registry data, dependency manifests, and the commercial application were not changed by this implementation. During final review, an unrelated formatting-only diff appeared in registry.json; its parsed JSON matches HEAD, and it was left intact rather than reverting an unrecognized change.

## Final skills tree

```text
skills/
├── intentui/
│   ├── rules/
│   │   ├── v3/
│   │   │   ├── components.md
│   │   │   ├── overlays.md
│   │   │   └── styling.md
│   │   ├── v4/
│   │   │   ├── components.md
│   │   │   ├── overlays.md
│   │   │   └── styling.md
│   │   ├── collections.md
│   │   ├── components.md
│   │   ├── forms.md
│   │   ├── icons.md
│   │   ├── overlays.md
│   │   ├── registry.md
│   │   ├── styling.md
│   │   └── version-detection.md
│   ├── scripts/
│   │   └── inspect-project.mjs
│   └── SKILL.md
├── intentui-design/
│   ├── references/
│   │   ├── authentication.md
│   │   ├── blocks.md
│   │   ├── compatibility.md
│   │   ├── patterns.md
│   │   ├── registry.md
│   │   ├── templates.md
│   │   └── ui-kits.md
│   ├── scripts/
│   │   └── inspect-registry.mjs
│   └── SKILL.md
├── intentui-migrate/
│   ├── references/
│   │   ├── breaking-changes.md
│   │   ├── components.md
│   │   ├── migration.md
│   │   ├── themes.md
│   │   └── verification.md
│   └── SKILL.md
├── tests/
│   ├── README.md
│   ├── mcp-smoke.mjs
│   ├── results.md
│   ├── scenarios.json
│   ├── skills-cli-smoke.mjs
│   ├── sources.md
│   ├── token-map.json
│   └── validate.mjs
├── README.md
└── next-best-practices → ../.agents/skills/next-best-practices (existing; preserved)
```

## Legacy rules migrated

Retained local-component preference, semantic tokens, intent props, accessible form groups/validation, stable collection IDs/selection, valid v3 overlay composition and registry discovery. Corrected Sheet's position/default/API, removed unverified Drawer assumptions, separated v4 overlays/colors, allowed the actual cn package, resolved project aliases, selected registries by purpose, used relative progressive references, and removed blanket map/HTML/client-boundary restrictions. [Detailed provenance and correction table](sources.md).

The canonical installation CSS mapping covers **48 semantic color aliases**, including unchanged families and all foreground/subtle/card/navbar/sidebar/chart families. Theme variants were also audited: v4 retains `--color-bg: var(--background)` in those files. This caveat is documented separately; the library CSS remains untouched.

## Validation commands and results

| Command/check                                                                                                                   | Result                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `node skills/tests/validate.mjs`                                                                                                | 14 validation groups passed; all 13 required scenario categories covered by deterministic decisions/API fixtures                       |
| Source-backed TypeScript in validator                                                                                           | 15 complete TSX examples per version, 30 total; real pinned branch implementations and installed dependencies, no mock component types |
| `node skills/tests/mcp-smoke.mjs`                                                                                               | Existing shadcn MCP launched; six registry capabilities/schema, namespace discovery and add-command generation passed                  |
| `node skills/tests/skills-cli-smoke.mjs`                                                                                        | Skills CLI 1.7.2 discovered root skills/ export; installed all three together and individually; every reference/helper matched source  |
| `npx skills add /absolute/path/to/intentui/skills --list`                                                                       | Actual CLI found exactly the three new skills                                                                                          |
| `npx skills add /absolute/path/to/intentui/skills --skill intentui intentui-design intentui-migrate --agent codex --copy --yes` | Actual install succeeded in /tmp fixture project                                                                                       |
| `quick_validate.py skills/<name>`                                                                                               | All three passed with temporary PyYAML dependency (`PYTHONPATH=/tmp/intentui-skill-validator`)                                         |
| `./node_modules/.bin/oxlint` on both helpers and three test scripts                                                             | Passed                                                                                                                                 |
| `./node_modules/.bin/oxfmt --check` on those five scripts                                                                       | Passed                                                                                                                                 |
| `@mdx-js/mdx` compile of updated AI documentation                                                                               | Passed                                                                                                                                 |
| `git diff --check`                                                                                                              | Passed                                                                                                                                 |

Full commands and evaluation fixture guidance are in [tests README](README.md). Temporary package tests use repository-export fixtures, not another published skills repository. Generated test workspaces are removed; no personal/global skills were installed.

## Limits

- No live premium authentication or installation was attempted. Synthetic credentials test safe decisions only; MCP command generation is not an install.
- Real agent adherence and browser/touch/focus interactions were not evaluated; realistic prompts and expected outcomes are included in scenarios.json for forward evaluation.
- API snapshots are the recorded 3.x/4.x commits in sources.md. Typechecks share the currently installed dependency graph; historical/customized React Aria implementations still require inspection.
- The optional inspectors handle documented source shapes, standard TypeScript path configuration and process-environment presence. Bundler aliases, package exports, imported theme chains and atypical/custom wrappers may require manual inspection. CLI dotenv and MCP environments may differ.
- Remote GitHub installation remains pending publication. On 4.x, use `npx skills add https://github.com/irsyadadl/intentui/tree/4.x`; the bare `irsyadadl/intentui` command uses the current default branch, which must contain these skills before it discovers them. Local CLI discovery/install is verified; remote availability is not claimed.
- No full application build was run: this change adds workflows/docs/helpers, and the repository prebuild regenerates registry artifacts outside the requested scope. TSX API compatibility, MDX syntax, helper behavior and packaging were checked directly.
