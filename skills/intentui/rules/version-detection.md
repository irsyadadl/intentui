# Detect the consuming project and version

Start in the application's workspace, not necessarily the Git root. Read `package.json` and its `packageManager`, lockfiles, `components.json`, `tsconfig.json` (including `extends` and path mappings), CSS at `tailwind.css`, and project documentation. Resolve `aliases.ui`, `aliases.components`, `aliases.lib`, and `aliases.hooks`. Follow workspace package exports in monorepos. If configuration is absent, trace existing UI imports; do not create a default directory without checking.

Next.js may use `app/` or `src/app/`; Vite and SPAs may use `src/`; Laravel + Inertia commonly uses `resources/js/` with CSS in `resources/css/`. These are examples, not fixed destinations. Add `"use client"` only at a required React Server Component boundary; it is not required by Vite or Inertia.

## Evidence

| Evidence           | v3 signal                                                                       | v4 signal                                                                          |
| ------------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Installation CSS   | `--color-bg`, `--color-fg`, `--color-muted-fg`                                  | `--color-background`, `--color-foreground`, `--color-muted-foreground`             |
| Semantic utilities | `bg-bg`, `text-fg`, `text-muted-fg`                                             | `bg-background`, `text-foreground`, `text-muted-foreground`                        |
| Modal source       | local `modal.tsx` exporting `ModalContent`                                      | modal implementation moved into `dialog.tsx`                                       |
| Dialog source      | `DialogTrigger` renders a button; `Dialog` wraps the primitive                  | `DialogTrigger` is the React Aria trigger wrapper; `Dialog` includes modal overlay |
| Sheet source       | `Sheet` is a trigger; `SheetContent` renders overlay                            | `SheetTrigger` is a trigger; `Sheet` renders overlay                               |
| Menu source        | `Menu` is a trigger; `MenuTrigger` renders a button; `MenuContent` renders menu | `MenuTrigger` is a trigger; `Menu` renders menu                                    |

Corroborate at least two independent signals when possible. The audited v4 theme variants still contain a legacy `--color-bg: var(--background)` alias; distinguish its v4 variable from `var(--bg)`. One old class, registry URL, `components.json.style`, or `package.json.version` does not prove a version: components are copied source and the repository's package version may lag. Explicit user requirements establish the target, not proof that installed source already matches it.

Inspect source for the component being changed. If CSS and component families disagree, record per-file versions and treat the project as mixed. Use each installed component's own API and tokens; do not globally rename tokens or reinstall all components. If unresolved, consult the relevant v4 docs and selected registry payload under the entry point's source priority; use historical GitHub files only when needed. Ask only for information necessary to choose safely.

Historical source and fallback links (see the entry point's documentation and source priority): [3.x](https://github.com/irsyadadl/intentui/tree/3.x/src/components/ui), [4.x](https://github.com/irsyadadl/intentui/tree/4.x/src/components/ui). Fetch corresponding examples under `src/components/examples/` only when docs do not answer the question. Published registry content can change independently: inspect it before installing into an older project.

## Optional read-only helper

Run `node <installed-skill>/scripts/inspect-project.mjs <consuming-workspace>` for source-shape and CSS evidence without printing component bodies. It resolves aliases.ui through TypeScript paths/relative aliases and simple extends chains. It requires two corroborating signals, reports mixed/unknown, and never edits files. Bundler aliases, package exports, imported theme CSS, and historical/customized shapes still require manual inspection. The result is evidence, not a mandate to upgrade.

Retain source evidence and resolved paths during the task; repeat a full scan only after changes invalidate it. Design Intent UI is v4-only: a detected v3/mixed project needs a separate compatibility/migration decision before any @irsyad installation. General v3 development remains supported through compatible public source.
