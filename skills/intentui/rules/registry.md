# Public registry and shadcn tooling

Read `components.json` and resolve the consuming workspace. The documented public namespace is `@intentui`, with `https://intentui.com/r/{name}`. Preserve an existing URL, including any project-specific version pin. Never select the first registry key: `@irsyad` is the commercial workflow. Do not fetch premium resources for ordinary public components.

A missing public namespace can be configured as part of authorized installation, merging this entry into existing registries:

```json
{
  "registries": {
    "@intentui": "https://intentui.com/r/{name}"
  }
}
```

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
