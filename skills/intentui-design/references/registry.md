# Choose the correct registry

The public component namespace is `@intentui`; the authenticated commercial Design Intent UI namespace is `@irsyad`. Choose by requested resource, never by configuration ordering. Preserve existing entries. Both may coexist:

```json
{
  "registries": {
    "@intentui": "https://intentui.com/r/{name}",
    "@irsyad": {
      "url": "https://design.intentui.com/r/{name}",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

Merge missing entries; do not replace the entire components.json or copy example aliases. Resolve the actual UI directory and workspace. If premium configuration is absent, explain the documented setup; do not silently use public registry resources and call them premium.

## Discovery and installation

Prefer the connected shadcn MCP schemas: get_project_registries; search_items_in_registries with `registries: ["@irsyad"]`; view_items_in_registries with the returned item addresses; get_item_examples_from_registries where offered; get_add_command_for_items. Execute a returned command only through authorized tooling. Inspect the actual result, not just a suggested command. Check credentials in the MCP process, which may differ from the shell.

Fallback (substitute the project's package runner, and run in its workspace):

```bash
npx shadcn@latest search @irsyad -q "dashboard"
npx shadcn@latest view @irsyad/dashboard-01
npx shadcn@latest add @irsyad/dashboard-01
```

`dashboard-01` is a documented example, not a guaranteed currently available item or v4-compatible block. Confirm it in the authorized catalog before installation. Search pagination may matter. If the registry offers no searchable index or examples, use its official catalog and inspect the documented item; never enumerate guessed private URLs. Review dependencies and [compatibility](compatibility.md) before adding.

Do not overwrite customized UI files or existing licensed resources blindly. Keep auth in environment variables, sanitize errors, and follow [authentication](authentication.md). Sources: [Design getting started](https://design.intentui.com/docs/getting-started), [shadcn MCP](https://ui.shadcn.com/docs/registry/mcp).
