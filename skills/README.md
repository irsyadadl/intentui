# Intent UI Agent Skills

Three independently installable skills for Intent UI source-based development:

| Skill            | Purpose                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| intentui         | Component development, review, debugging and installation; detects v3/v4 internally                     |
| intentui-design  | Commercial Design Intent UI discovery, authenticated @irsyad registry and licensed resource integration |
| intentui-migrate | Explicit v3 → v4 audits, feature conversions and full upgrades                                          |

## Install

Install from the Intent UI repository:

```bash
npx skills add irsyadadl/intentui
```

The CLI presents skill/agent selections; it does not necessarily install everything automatically. Select all three explicitly or choose one:

```bash
npx skills add irsyadadl/intentui --skill intentui intentui-design intentui-migrate
npx skills add irsyadadl/intentui --skill intentui
npx skills add irsyadadl/intentui --list
```

The command uses the repository's default branch. A skill's Git branch does not determine the application's Intent UI version; the primary skill checks installed source and CSS. Ordinary development never upgrades implicitly.

## Registries and authentication

Public components use @intentui. Purchased Design Intent UI registry resources use @irsyad. Merge these entries into the consuming workspace's existing components.json:

```json
{
  "registries": {
    "@intentui": "https://intentui.com/r/{name}",
    "@irsyad": {
      "url": "https://design.intentui.com/r/{name}",
      "headers": { "Authorization": "Bearer ${REGISTRY_TOKEN}" }
    }
  }
}
```

Create a token through the licensed Design account and configure the matching environment variable in a private ignored env file or secure environment. Never paste credentials into chat, source examples, or Git. A configured header is not proof of authenticated access. Resource formats and installation methods vary: UI kits/templates are not automatically shadcn items. Read [authentication](intentui-design/references/authentication.md) and the [official setup](https://design.intentui.com/docs/getting-started).

## MCP and migration

The existing shadcn MCP server provides registry search, inspection, examples and installation commands. Skills provide workflows and component conventions; they do not create a server connection. Configure shadcn MCP for the consuming project/client using its supported CLI setup. If unavailable, use project-aware shadcn search/view/add commands. See [registry tooling](intentui/rules/registry.md).

Migration supports read-only audit, a single feature, or an explicitly requested full application upgrade. It compares both upstream sources, preserves customizations and registry auth, and checks overlays, dependency closures, all installation color families, and mixed-version projects. See [migration](intentui-migrate/references/migration.md).

## Update and contribute

Use `npx skills update` for installed skills; check the current CLI help for supported update options. Reinstall from the explicit branch URL when changing source refs. Contributors should inspect current 3.x/4.x component implementations and examples, update only affected references, keep exactly these three entry points, and run the validation commands in [tests](tests/README.md). New versions belong inside intentui, with migration mappings added when verified.

References are loaded progressively; examples use TSX and illustrative aliases. No premium source is bundled. Research provenance and obsolete-rule corrections are recorded in [sources](tests/sources.md).
