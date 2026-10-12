# Public registry and shadcn tooling

Read `components.json` in the consuming workspace. Public-only users use `@intentui` (`https://intentui.com/r/{name}`). **Design Intent UI's authenticated `@irsyad` registry is a v4-only superset containing public components and premium resources.** A licensed v4 project needs only @irsyad, including for Button, Dialog and Table.

Select after inspecting the relevant installed APIs and theme:

| Project configuration   | Selection                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| @intentui only          | @intentui for public components                                                                     |
| @irsyad only, v4        | @irsyad for public components and premium resources                                                 |
| both, v4                | prefer @irsyad regardless of key order                                                              |
| v3 + @intentui          | retain compatible public v3 workflow; inspect live payload version                                  |
| v3 + @irsyad request    | stop: Design requires v4; offer a separately requested migration                                    |
| mixed/unknown + @irsyad | inspect affected component/dependency closure; do not install until v4 compatibility is established |

Do not require or add @intentui alongside configured @irsyad. Do not add duplicates or delete existing entries automatically. Preserve custom URLs and every header. A missing/expired token does not authorize a silent registry switch; explain the access problem. Public-only tasks do not need commercial authentication documentation. A v4 project using @irsyad does need its Bearer setup even when the requested component is public.

Before installing, inspect recursive registryDependencies. If a payload refers to @intentui and cannot resolve with @irsyad alone, report the item and dependency edge as an upstream registry issue, not a reason to automatically add a second namespace. Do not claim single-registry installation before its dependency closure succeeds. For commercial setup/verification use the Design skill if installed, otherwise the [official setup](https://design.intentui.com/docs/getting-started).

The live public endpoint is not proof of v3/v4 compatibility. Inspect exports, files, dependencies, and CSS before adding. If the live item differs from the installed version, consult the appropriate upstream branch and documented registry configuration; do not invent a version URL or silently upgrade. Search item names before using them. The branch name used to install an agent skill does not select a component registry version.

## MCP preferred when connected

Use the existing shadcn MCP server and its actually exposed schemas. Typical capabilities are:

| Capability                      | shadcn tool                                              |
| ------------------------------- | -------------------------------------------------------- |
| configured namespaces           | `get_project_registries`                                 |
| browse/search catalog           | `list_items_in_registries`, `search_items_in_registries` |
| inspect item files/dependencies | `view_items_in_registries`                               |
| find examples                   | `get_item_examples_from_registries`                      |
| obtain installation command     | `get_add_command_for_items`                              |

Pass an explicit registry such as `["@intentui"]` or `["@irsyad"]` to search/list/example tools. Not every registry provides examples or a searchable index: report missing capabilities and consult documented resource pages. A returned add command is not proof of installation. Run it through authorized terminal tooling unless the connected tool actually supports installation. Verify resulting files and imports. Skill instructions do not create an MCP connection.

For setup, check the installed CLI's `mcp init --help` and use its supported client; the server runs via `shadcn mcp`. Use the existing client's configuration mechanism. Do not create an Intent UI MCP server. Authentication must reach the MCP process separately if its environment differs from the terminal.

## CLI fallback

Read `packageManager` and lockfiles; use the same workspace and runner: npm `npx`, pnpm `pnpm dlx`, Bun `bunx --bun`, Yarn modern `yarn dlx` (check Yarn version). Prefer the project's installed compatible shadcn version; examples use latest when no version is pinned. Check `--help` if flags differ.

```bash
npx shadcn@latest info --json
npx shadcn@latest search @intentui -q "button"
npx shadcn@latest view @intentui/button
npx shadcn@latest add @intentui/button
```

Run in the consuming workspace or use `--cwd` when supported. Inspect the selected item before add. Review conflicting local files and dependency changes; do not use blanket `--overwrite`/`-o`. Preserve customizations, verify installation output, then typecheck/lint/build as available.

Sources: [Intent UI AI](https://intentui.com/docs/getting-started/ai), [shadcn CLI](https://ui.shadcn.com/docs/cli), [MCP](https://ui.shadcn.com/docs/registry/mcp), [authentication](https://ui.shadcn.com/docs/registry/authentication).

For a licensed v4 project substitute the selected @irsyad namespace in search/view/add, including public components. Never substitute one namespace in a returned dependency URL blindly.
