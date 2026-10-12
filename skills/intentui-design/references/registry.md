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

Inspect every registryDependencies edge and fetched dependency payload before installation. Shadcn [bare names](https://ui.shadcn.com/docs/registry/registry-item-json) such as `button` resolve to the built-in shadcn registry, not @irsyad. Unified Intent UI dependencies must use `@irsyad/button` or an explicit registry URL. Namespaced dependencies resolve through their own configuration; do not rewrite payloads or add namespaces automatically. An unconfigured namespace requires separate CLI/directory verification, not a claim that the published item is broken.

The optional [payload audit](../scripts/audit-registry.mjs) inspects @irsyad and recursively follows built-in shadcn and configured namespace dependencies. It expands each registry's URL, style, query parameters and environment references, and sends only that registry's headers without redirects. Direct URLs never inherit credentials; URLs outside the @irsyad origin require separate inspection. Missing namespace configuration, unavailable environment variables and unsupported local/GitHub addresses remain explicit unresolved edges. The audit emits sanitized metadata without source, preserves configuration and does not install products. A complete payload audit is not proof of v4 compatibility or a successful installation; verify the project's shadcn checks and resulting files.

Product policy is not proof that every published item has been converted. Flag ModalContent, SheetContent, MenuContent, old context-menu imports or old theme tokens in accessible payloads. Check [compatibility](compatibility.md); do not downgrade a resource to v3. On missing/401/403 auth, stop and explain. No silent public fallback or success claim.
