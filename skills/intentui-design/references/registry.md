# One authenticated v4 registry

Design Intent UI includes public Intent UI components **and** premium resources in @irsyad. For a licensed v4 application, configure only:

```json
{
  "registries": {
    "@irsyad": {
      "url": "https://design.intentui.com/r/{name}",
      "headers": { "Authorization": "Bearer ${REGISTRY_TOKEN}" }
    }
  }
}
```

Public-only users configure @intentui instead. Existing projects may retain both; v4 Design workflows prefer @irsyad for Button, Dialog, Table and commercial resources regardless of key order. Do not require/add the redundant public namespace or delete existing entries without authorization. Preserve custom URLs, all headers, aliases and target paths. [Authentication](authentication.md) is required even for public components fetched through @irsyad.

## Tool workflow

Use exposed shadcn MCP tools: get_project_registries; search_items_in_registries/list_items_in_registries with `["@irsyad"]`; view_items_in_registries for returned addresses; get_item_examples_from_registries where offered; get_add_command_for_items. A command is not an installation. Execute it with authorized tooling, review conflicts and verify the result. CLI fallback in the consuming workspace (substitute its package runner):

```bash
npx shadcn@latest search @irsyad -q "button"
npx shadcn@latest view @irsyad/button
npx shadcn@latest add @irsyad/button
```

Button is a public component delivered by the unified registry. Verify item availability before add. Derive premium addresses from actual catalog results; never guess a block slug. Check pagination; if discovery is unavailable, report that limitation and consult official resource pages rather than enumerate guessed private URLs.

## Dependency closure and v4 correctness

Inspect every registryDependencies edge and fetched dependency payload before installation. Relative item names, same-namespace addresses and approved configured endpoints must resolve with the existing @irsyad setup. If a payload requires an unconfigured @intentui namespace, identify the exact parent/dependency edge and required upstream correction (publish the dependency through @irsyad or use a resolvable same-registry address). Do not rewrite payload URLs or add another namespace automatically.

The optional [payload audit](../scripts/audit-registry.mjs) reports external namespace edges and old APIs without emitting source. Its opt-in live mode reads credentials from the process environment, fetches only the configured origin without redirects, and stores only sanitized metadata. It does not install licensed products. Live installation also requires the project's shadcn checks and resulting file verification.

Product policy is not proof that every published item has been converted. Flag ModalContent, SheetContent, MenuContent, old context-menu imports or old theme tokens in accessible payloads. Check [compatibility](compatibility.md); do not downgrade a resource to v3. On missing/401/403 auth, stop and explain. No silent public fallback or success claim.
