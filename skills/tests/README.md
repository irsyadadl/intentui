# Validation and evaluation

Run from the main Intent UI repository after installing its development dependencies. The source-backed tests need the recorded v3/v4 Git objects, TypeScript, yaml and the existing shadcn/MCP SDK dependencies. They do not use fake component declarations.

```bash
node skills/tests/validate.mjs
node skills/tests/mcp-smoke.mjs
node skills/tests/skills-cli-smoke.mjs
npx oxlint skills/intentui/scripts/inspect-project.mjs skills/intentui-design/scripts/inspect-registry.mjs skills/tests/validate.mjs skills/tests/mcp-smoke.mjs skills/tests/skills-cli-smoke.mjs
git diff --check
```

`validate.mjs` checks frontmatter, exactly three entry points, independently resolvable relative links, source-backed version evidence, mixed/unknown detection, inherited JSONC aliases including Laravel/Inertia, public/private registry purpose, sanitized auth failures, MCP/CLI decision fixtures, complete CSS mapping, and removed exports via the TypeScript AST. It extracts all skill TSX examples plus two dashboard fixtures, then typechecks 15 examples against each real branch's source in disposable directories. The installed dependency graph is shared; this is not proof of compatibility with every historical React Aria version.

`mcp-smoke.mjs` starts the existing shadcn MCP server in a disposable project, verifies the six registry capabilities and search schema, and calls local namespace discovery and add-command generation. It does not fetch licensed resources or install components.

## Skills CLI packaging

`skills-cli-smoke.mjs` uses the actual CLI to test a root `skills/` export, all three skills together, and each individually, verifying every copied file. It requires npm access/cache, disables telemetry, and removes its disposable directories. No personal/global skill installation is changed. For a manual check:

```bash
mkdir -p /tmp/intentui-skills-cli-test
cd /tmp/intentui-skills-cli-test
npx skills add /absolute/path/to/intentui/skills --list
npx skills add /absolute/path/to/intentui/skills --skill intentui intentui-design intentui-migrate --agent codex --copy --yes
```

Confirm all three entry points, referenced files, and helpers were copied. Also install each skill separately in another disposable directory to confirm no sibling file dependencies. List the repository root export as well when preparing a release; local ignored .agents skills are not publishable library content. The CLI does not accept --json together with --list in the tested version.

## Behavioral evaluation fixtures

[scenarios.json](scenarios.json) contains the 13 required realistic prompts, intended routing, and observable outcomes. The automated tests cover their deterministic decisions and API examples. They do **not** prove an agent will follow every instruction. For agent-level evaluation, give a permitted evaluator only the selected skill, prompt, and raw fixture project; withhold the expected outcome until scoring. Use disposable workspaces and synthetic credentials. Audit mode must leave files unchanged, ordinary work must not upgrade, and premium failures must not produce fabricated installation claims. Record outputs and resulting code rather than matching instruction wording.

Interaction verification remains necessary for overlays, focus, gestures, selection and responsive design. Live premium authentication/installation requires authorized account access; never count mocked credentials or MCP command generation as an authenticated installation.

## Maintenance

[source provenance](sources.md) records the Git snapshots. When updating snapshots, inspect diffs first, revise affected examples/mappings, and rerun both source-backed suites. Preserve exactly three skills and keep each entry point concise. Optional quick_validate.py from a skill-authoring toolkit can also validate each folder; it requires PyYAML.

[Recorded implementation results](results.md) include the final tree, validation outcomes, and known limitations.
