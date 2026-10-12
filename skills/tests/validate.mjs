import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"
import ts from "typescript"
import { parse as yaml } from "yaml"
import {
  detectVersion,
  inspectProject,
  parseJsonc,
  resolveUIDirectory,
} from "../intentui/scripts/inspect-project.mjs"
import {
  inspectRegistry,
  registryFailure,
  discoveryPlan,
} from "../intentui-design/scripts/inspect-registry.mjs"

import {
  auditPayload,
  auditLive,
  resolveDependency,
} from "../intentui-design/scripts/audit-registry.mjs"
import {
  loadTools,
  transformModal,
  transformTokens,
  migrateFiles,
} from "../intentui-migrate/scripts/migrate.mjs"
const inspectV4 = (config, purpose = "premium", env = {}, options = {}) =>
  inspectRegistry(config, purpose, env, { version: "v4", ...options })

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const skillRoot = path.join(root, "skills")
const refs = {
  v3: "148acd77308d4a13b31b2ae2846d243b486c1f60",
  v4: "66e5a64dd1aec78f0572229f0ba8690caf05b2a8",
}
const skills = ["intentui", "intentui-design", "intentui-migrate"]
const source = (version, file) =>
  version === "v4"
    ? fs.readFileSync(path.join(root, file), "utf8")
    : execFileSync("git", ["show", `${refs[version]}:${file}`], {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      })
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "intentui-skills-validation-"))
let checks = 0
function check(name, test) {
  test()
  checks++
  process.stdout.write(`PASS ${name}\n`)
}
function walk(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(directory, entry.name))
        : entry.isFile()
          ? [path.join(directory, entry.name)]
          : []
    )
}
const documents = skills
  .flatMap((name) => walk(path.join(skillRoot, name)))
  .filter((file) => file.endsWith(".md"))
const scenarios = JSON.parse(fs.readFileSync(path.join(skillRoot, "tests/scenarios.json"), "utf8"))
assert.deepEqual(
  scenarios.map((scenario) => scenario.id),
  Array.from({ length: scenarios.length }, (_, index) => index + 1)
)
const docs = documents.map((file) => ({ file, text: fs.readFileSync(file, "utf8") }))

function versionFiles(version) {
  const files = {}
  for (const family of [
    "dialog",
    "menu",
    "sheet",
    "popover",
    ...(version === "v3" ? ["modal"] : []),
  ])
    files[`${family}.tsx`] = source(version, `src/components/ui/${family}.tsx`)
  return files
}
const css = Object.fromEntries(
  Object.keys(refs).map((version) => [
    version,
    source(version, "src/stubs/installation/main.css.stub"),
  ])
)
const files = Object.fromEntries(
  Object.keys(refs).map((version) => [version, versionFiles(version)])
)
function snapshot(version) {
  const directory = path.join(temp, version)
  fs.mkdirSync(directory)
  const names = execFileSync(
    "git",
    ["ls-tree", "-r", "--name-only", refs[version], "src/components/ui", "src/lib", "src/hooks"],
    { cwd: root, encoding: "utf8" }
  )
    .trim()
    .split("\n")
  for (const name of names) {
    const destination = path.join(directory, name)
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.writeFileSync(destination, source(version, name))
  }
  fs.symlinkSync(path.join(root, "node_modules"), path.join(directory, "node_modules"), "dir")
  return directory
}
function examplesFor(version) {
  const examples = []
  for (const { file, text } of docs) {
    if (/[/\\]v[34][/\\]/.test(file) && !file.includes(`${path.sep}${version}${path.sep}`)) continue
    const blocks = [...text.matchAll(/```tsx\n([\s\S]*?)\n```/g)]
    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index]
      if (file.endsWith(`${path.sep}references${path.sep}components.md`)) {
        const headings = [...text.slice(0, block.index).matchAll(/^## (.*)$/gm)]
        const heading = headings.at(-1)?.[1] ?? ""
        if (!heading.includes(`(${version})`)) continue
      }
      examples.push({ label: `${path.relative(skillRoot, file)}#${index + 1}`, code: block[1] })
    }
  }
  const bg = version === "v3" ? "bg-bg text-fg" : "bg-background text-foreground"
  const muted = version === "v3" ? "text-muted-fg" : "text-muted-foreground"
  examples.push({
    label: `${version}-dashboard`,
    code: `import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@/components/ui/table"
const projects = [{ id: "alpha", name: "Alpha" }]
export function Dashboard() {
  return <main className="${bg}"><Card><CardHeader><CardTitle>Projects</CardTitle></CardHeader><CardContent>
    <p className="${muted}">Your active projects</p><Button intent="outline">Create project</Button>
    <Table aria-label="Projects"><TableHeader><TableColumn isRowHeader>Name</TableColumn></TableHeader>
      <TableBody items={projects}>{project => <TableRow id={project.id}><TableCell>{project.name}</TableCell></TableRow>}</TableBody>
    </Table>
  </CardContent></Card></main>
}`,
  })
  if (version === "v4") {
    const original =
      'import { Button } from "@/components/ui/button"; import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal"; export function UpgradeExample() { return <Modal><Button>Rename</Button><ModalContent className="custom-surface"><ModalTitle>My project</ModalTitle></ModalContent></Modal> }'
    examples.push({
      label: "codemod-produced-modal",
      code: transformModal(original, "feature.tsx", loadTools(root)).code,
    })
  }
  return examples
}
function typecheckExamples(version) {
  const directory = snapshot(version)
  const examples = examplesFor(version)
  const paths = examples.map((example, index) => {
    const file = path.join(directory, `example-${index}.tsx`)
    fs.writeFileSync(file, example.code)
    const syntax = ts.createSourceFile(
      file,
      example.code,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX
    )
    assert.equal(syntax.parseDiagnostics.length, 0, example.label)
    const scanner = ts.createScanner(
      ts.ScriptTarget.Latest,
      false,
      ts.LanguageVariant.JSX,
      example.code
    )
    while (scanner.scan() !== ts.SyntaxKind.EndOfFileToken)
      assert.ok(
        ![ts.SyntaxKind.SingleLineCommentTrivia, ts.SyntaxKind.MultiLineCommentTrivia].includes(
          scanner.getToken()
        ),
        `Source comment in ${example.label}`
      )
    return file
  })
  const options = {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    jsx: ts.JsxEmit.ReactJSX,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    esModuleInterop: true,
    types: ["react", "node"],
    paths: { "@/*": [path.join(directory, "src/*")] },
    ignoreDeprecations: "6.0",
  }
  const program = ts.createProgram(paths, options)
  const diagnostics = ts.getPreEmitDiagnostics(program)
  if (diagnostics.length) {
    process.stderr.write(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCurrentDirectory: () => directory,
        getCanonicalFileName: (name) => name,
        getNewLine: () => "\n",
      })
    )
    throw new Error(`${version} TSX failed (${diagnostics.length} diagnostics)`)
  }
  for (const example of examples)
    process.stdout.write(`  API checked ${version} ${example.label}\n`)
  return examples.length
}

try {
  check("exactly three new independent entry points and valid YAML", () => {
    const entries = walk(skillRoot).filter((file) => path.basename(file) === "SKILL.md")
    assert.deepEqual(
      entries.map((file) => path.basename(path.dirname(file))).sort(),
      [...skills].sort()
    )
    for (const name of skills) {
      const text = fs.readFileSync(path.join(skillRoot, name, "SKILL.md"), "utf8")
      const frontmatter = /^---\n([\s\S]*?)\n---\n/.exec(text)
      assert.ok(frontmatter, name)
      const data = yaml(frontmatter[1])
      assert.equal(data.name, name)
      assert.ok(
        typeof data.description === "string" &&
          data.description.length > 0 &&
          data.description.length <= 1024
      )
      assert.ok(text.split(/\s+/).length < 1000, `${name} entry point too long`)
    }
  })
  check("relative links resolve within independently installed skills", () => {
    for (const { file, text } of docs) {
      const owner = skills.find((name) => file.startsWith(path.join(skillRoot, name) + path.sep))
      for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
        const href = match[1]
        if (/^(?:https?:|#)/.test(href)) continue
        const target = path.resolve(path.dirname(file), href.split("#")[0])
        assert.ok(fs.existsSync(target), `${path.relative(root, file)} → ${href}`)
        assert.ok(
          target.startsWith(path.join(skillRoot, owner) + path.sep),
          `Cross-skill dependency: ${file} → ${href}`
        )
      }
      assert.ok(!text.includes("${CLAUDE_SKILL_DIR}"))
    }
  })
  check("scenario 1: v3 Button project detected from real source", () =>
    assert.equal(detectVersion({ files: files.v3, css: css.v3 }).version, "v3")
  )
  check("scenario 2: v4 Dialog project detected from real source", () =>
    assert.equal(detectVersion({ files: files.v4, css: css.v4 }).version, "v4")
  )
  check("scenario 10: partially migrated project remains mixed", () => {
    const variant = source("v4", "src/styles/themes/zinc.css")
    assert.equal(detectVersion({ files: files.v4, css: variant }).version, "v4")
    assert.equal(
      detectVersion({
        files: { "modal.tsx": files.v3["modal.tsx"], "dialog.tsx": files.v4["dialog.tsx"] },
        css: css.v4,
      }).version,
      "mixed"
    )
    assert.equal(detectVersion({ files: files.v4, css: css.v3 }).version, "mixed")
    assert.equal(detectVersion({ files: {}, css: css.v4 }).version, "unknown")
    assert.equal(
      detectVersion({ files: files.v3, css: css.v3, requestedVersion: "v4" }).targetMismatch,
      true
    )
  })
  check("scenario 11: Laravel + Inertia aliases and inherited JSONC paths", () => {
    const project = path.join(temp, "laravel")
    fs.mkdirSync(path.join(project, "resources/js/components/ui"), { recursive: true })
    fs.mkdirSync(path.join(project, "resources/css"), { recursive: true })
    fs.writeFileSync(
      path.join(project, "components.json"),
      JSON.stringify({
        aliases: { ui: "@/components/ui" },
        tailwind: { css: "resources/css/app.css" },
      })
    )
    fs.writeFileSync(
      path.join(project, "tsconfig.base.json"),
      '{"compilerOptions": {"paths": {"@/*": ["./resources/js/*"],},},}'
    )
    fs.writeFileSync(path.join(project, "tsconfig.json"), '{"extends": "./tsconfig.base.json"}')
    fs.writeFileSync(path.join(project, "resources/css/app.css"), css.v4)
    fs.writeFileSync(
      path.join(project, "resources/js/components/ui/dialog.tsx"),
      files.v4["dialog.tsx"]
    )
    assert.equal(
      inspectProject(project).uiDirectory,
      path.join(project, "resources/js/components/ui")
    )
    assert.equal(inspectProject(project).version, "v4")
    assert.deepEqual(parseJsonc('{"url":"https://example.com/a,}",/* ignored */"x":1,}'), {
      url: "https://example.com/a,}",
      x: 1,
    })
    assert.throws(() => resolveUIDirectory(project, { aliases: { ui: "@workspace/ui" } }))
    const configDir = path.join(project, "config")
    fs.mkdirSync(configDir)
    fs.writeFileSync(
      path.join(configDir, "base.json"),
      '{"compilerOptions":{"paths":{"@/*":["../resources/js/*"]}}}'
    )
    fs.writeFileSync(path.join(project, "tsconfig.json"), '{"extends":"./config/base.json"}')
    assert.equal(inspectProject(project).version, "v4")
    fs.writeFileSync(path.join(configDir, "base.json"), '{"compilerOptions":{"baseUrl":".."}}')
    fs.writeFileSync(
      path.join(project, "tsconfig.json"),
      '{"extends":"./config/base.json","compilerOptions":{"paths":{"@/*":["resources/js/*"]}}}'
    )
    assert.equal(
      inspectProject(project).uiDirectory,
      path.join(project, "resources/js/components/ui")
    )
  })
  const registryConfig = {
    registries: {
      "@irsyad": {
        url: "https://design.intentui.com/r/{name}",
        headers: { Authorization: "Bearer ${REGISTRY_TOKEN}", "X-Project": "fixture" },
      },
      "@intentui": "https://intentui.com/r/{name}",
    },
  }
  check("scenarios 5 and 7: premium discovery selects purpose, not first registry", () => {
    const before = JSON.stringify(registryConfig)
    const result = inspectV4(registryConfig, "premium", {
      REGISTRY_TOKEN: "fixture-sentinel-secret",
    })
    assert.equal(result.namespace, "@irsyad")
    assert.equal(result.status, "ready-to-verify-access")
    assert.equal(result.authenticated, false)
    assert.equal(inspectV4(registryConfig, "public").namespace, "@irsyad")
    assert.ok(!JSON.stringify(result).includes("fixture-sentinel-secret"))
    assert.equal(JSON.stringify(registryConfig), before)
    const reversed = {
      registries: Object.fromEntries(Object.entries(registryConfig.registries).reverse()),
    }
    assert.equal(inspectV4(reversed).namespace, "@irsyad")
  })
  check("scenario 6: missing/unsafe authentication stops without exposing secrets", () => {
    assert.equal(inspectV4(registryConfig).status, "variable-unavailable-in-process")
    assert.equal(
      inspectV4({ registries: { "@intentui": registryConfig.registries["@intentui"] } }).status,
      "missing-registry"
    )
    const literal = {
      registries: {
        "@irsyad": {
          url: "https://design.intentui.com/r/{name}",
          headers: { Authorization: "Bearer fixture-sentinel-secret" },
        },
      },
    }
    const result = inspectV4(literal)
    assert.equal(result.status, "unsafe-or-unsupported-auth")
    assert.ok(!JSON.stringify(result).includes("fixture-sentinel-secret"))
    assert.equal(registryFailure(401), "authentication-failed-stop")
    assert.equal(registryFailure(403), "license-or-permission-failed-stop")
    assert.equal(registryFailure(404), "verify-documented-item-and-url")
    const custom = {
      registries: {
        "@irsyad": {
          url: "https://design.intentui.com/r/{name}",
          headers: { Authorization: "Bearer ${PURCHASED_REGISTRY_KEY}" },
        },
      },
    }
    assert.equal(
      inspectV4(custom, "premium", { PURCHASED_REGISTRY_KEY: "fixture" }).variableAvailable,
      true
    )
    custom.registries["@irsyad"].headers.Authorization = "Bearer ${NEXT_PUBLIC_REGISTRY_TOKEN}"
    assert.equal(inspectV4(custom).status, "frontend-secret-variable")
  })
  check("scenario 12: connected MCP uses explicit registry and exposed schemas", () => {
    const plan = discoveryPlan("@irsyad", "dashboard", [
      "search_items_in_registries",
      "view_items_in_registries",
      "get_add_command_for_items",
    ])
    assert.equal(plan.transport, "mcp")
    assert.deepEqual(plan.search.arguments, { registries: ["@irsyad"], query: "dashboard" })
  })
  check("scenario 13: unavailable MCP falls back to CLI argument arrays", () => {
    const plan = discoveryPlan("@intentui", "button")
    assert.equal(plan.transport, "cli")
    assert.deepEqual(plan.searchArguments, ["search", "@intentui", "-q", "button"])
  })
  check("scenario 9: complete semantic mapping matches both real CSS aliases", () => {
    const tokenMap = JSON.parse(
      fs.readFileSync(path.join(skillRoot, "tests/token-map.json"), "utf8")
    )
    const aliases = (version) =>
      Object.fromEntries(
        [...css[version].matchAll(/--color-([\w-]+): var\(--([\w-]+)\)/g)].map((match) => [
          match[1],
          match[2],
        ])
      )
    const old = aliases("v3"),
      target = aliases("v4")
    assert.deepEqual(Object.keys(tokenMap).sort(), Object.keys(old).sort())
    assert.deepEqual(Object.values(tokenMap).sort(), Object.keys(target).sort())
    for (const [from, to] of Object.entries(tokenMap)) {
      assert.equal(old[from], from)
      assert.equal(target[to], to)
    }
    assert.equal(tokenMap.overlay, "overlay")
    assert.equal(tokenMap["primary-subtle-fg"], "primary-subtle-foreground")
  })
  check("scenario 8: old and target overlay exports verified by TypeScript AST", () => {
    function exports(content) {
      const ast = ts.createSourceFile(
        "component.tsx",
        content,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX
      )
      const names = []
      for (const statement of ast.statements) {
        if (
          ts.isExportDeclaration(statement) &&
          statement.exportClause &&
          ts.isNamedExports(statement.exportClause)
        )
          names.push(...statement.exportClause.elements.map((item) => item.name.text))
        if (statement.modifiers?.some((item) => item.kind === ts.SyntaxKind.ExportKeyword)) {
          if (statement.name) names.push(statement.name.text)
          if (ts.isVariableStatement(statement))
            names.push(
              ...statement.declarationList.declarations.map((item) => item.name.getText(ast))
            )
        }
      }
      return names
    }
    assert.ok(exports(files.v3["modal.tsx"]).includes("ModalContent"))
    assert.ok(exports(files.v4["dialog.tsx"]).includes("DialogTrigger"))
    assert.ok(!exports(files.v4["menu.tsx"]).includes("MenuContent"))
    assert.ok(!exports(files.v4["sheet.tsx"]).includes("SheetContent"))
    assert.ok(!exports(files.v4["popover.tsx"]).includes("PopoverTrigger"))
  })

  check("current source contracts: filenames/exports/imports and new Tooltip API", () => {
    const contracts = {
      button: ["Button", "buttonStyles"],
      card: ["Card", "CardHeader", "CardContent"],
      text: ["Text", "TextLink", "Strong", "Code"],
      heading: ["Heading"],
      tabs: ["Tabs", "TabList", "Tab", "TabPanel"],
      table: ["Table", "TableHeader", "TableBody", "TableRow", "TableCell"],
      "search-field": ["SearchField", "SearchInput"],
      "command-menu": ["CommandMenu", "CommandMenuList", "CommandMenuSearch", "CommandMenuItem"],
      note: ["Note"],
      toast: ["Toast"],
      "area-chart": ["AreaChart"],
      container: ["Container"],
      skeleton: ["Skeleton"],
      loader: ["Loader"],
    }
    function exported(code) {
      const ast = ts.createSourceFile(
        "source.tsx",
        code,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX
      )
      return ast.statements.flatMap((node) =>
        ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)
          ? node.exportClause.elements.map((element) => element.name.text)
          : node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
            ? node.name
              ? [node.name.text]
              : ts.isVariableStatement(node)
                ? node.declarationList.declarations.map((declaration) =>
                    declaration.name.getText(ast)
                  )
                : []
            : []
      )
    }
    for (const version of ["v3", "v4"])
      for (const [file, names] of Object.entries(contracts))
        for (const name of names)
          assert.ok(
            exported(source(version, `src/components/ui/${file}.tsx`)).includes(name),
            `${version}/${file}: ${name}`
          )
    assert.ok(exported(source("v3", "src/components/ui/tooltip.tsx")).includes("TooltipContent"))
    const latest = exported(source("v4", "src/components/ui/tooltip.tsx"))
    assert.ok(latest.includes("TooltipTrigger") && latest.includes("TooltipProps"))
    assert.ok(!latest.includes("TooltipContent"))
  })
  check("unified registry A/B/C/D/E/F/G/I/J and live evidence separation", () => {
    const publicOnly = { registries: { "@intentui": registryConfig.registries["@intentui"] } }
    const premiumOnly = { registries: { "@irsyad": registryConfig.registries["@irsyad"] } }
    assert.equal(inspectV4(publicOnly, "public").namespace, "@intentui")
    for (const config of [
      premiumOnly,
      registryConfig,
      { registries: Object.fromEntries(Object.entries(registryConfig.registries).reverse()) },
    ]) {
      const before = JSON.stringify(config)
      for (const purpose of ["public", "premium"]) {
        const result = inspectV4(config, purpose, { REGISTRY_TOKEN: "mock-secret" })
        assert.equal(result.namespace, "@irsyad")
        assert.equal(result.selectedPurpose, purpose)
        assert.equal(result.authenticationPresent, true)
        assert.equal(result.authenticated, false)
        assert.equal(result.access, "unverified")
        assert.deepEqual(discoveryPlan(result.namespace, "button").searchArguments, [
          "search",
          "@irsyad",
          "-q",
          "button",
        ])
      }
      assert.equal(JSON.stringify(config), before)
    }
    assert.equal(inspectV4(premiumOnly, "public").status, "variable-unavailable-in-process")
    assert.equal(
      inspectRegistry(premiumOnly, "public", {}, { version: "v3" }).status,
      "requires-v4"
    )
    assert.equal(
      inspectRegistry(registryConfig, "public", {}, { version: "v3" }).namespace,
      "@intentui"
    )
    assert.equal(
      inspectRegistry(premiumOnly, "premium", {}, { version: "mixed" }).status,
      "inspect-v4-dependencies"
    )
    assert.equal(inspectRegistry(premiumOnly).status, "inspect-v4-dependencies")
    const evidence = { namespace: "@irsyad", operation: "catalog", statusCode: 200 }
    assert.equal(
      inspectV4(
        premiumOnly,
        "public",
        { REGISTRY_TOKEN: "mock" },
        { verifiedAccess: { ...evidence, mode: "mock" } }
      ).authenticated,
      false
    )
    assert.equal(
      inspectV4(
        premiumOnly,
        "public",
        { REGISTRY_TOKEN: "mock" },
        { verifiedAccess: { ...evidence, mode: "live" } }
      ).access,
      "verified-live"
    )
    assert.equal(registryFailure(401), "authentication-failed-stop")
  })
  check("registry payload H: recursive namespace edges and stale API signals (synthetic)", () => {
    const good = auditPayload({
      name: "fixture-block",
      registryDependencies: ["@irsyad/button", "@irsyad/table"],
      files: [{ content: "export const Block = () => null" }],
    })
    assert.equal(good.externalEdges.length, 0)
    const bad = auditPayload({
      name: "fixture-legacy",
      registryDependencies: ["@intentui/button"],
      files: [{ content: 'import { ModalContent } from "@/components/ui/modal"' }],
    })
    assert.equal(bad.externalEdges[0].dependency, "@intentui/button")
    assert.ok(bad.compatibilitySignals.includes("ModalContent"))
    assert.equal(bad.resolution, "unverified-external-namespace")
    assert.deepEqual(
      auditPayload({ name: "stale", files: [{ content: "const Surface = TooltipContent" }] })
        .compatibilitySignals,
      ["TooltipContent"]
    )
    assert.deepEqual(
      auditPayload({ name: "safe", files: [{ content: "const Surface = MyTooltipContent" }] })
        .compatibilitySignals,
      []
    )
  })
  await (async () => {
    const only = { registries: { "@irsyad": registryConfig.registries["@irsyad"] } }
    const skipped = await auditLive(only, {}, undefined, () => {
      throw new Error("No request without credentials")
    })
    assert.equal(skipped.status, "skipped")
    const requested = []
    const fixture = async (url, options) => {
      const name = new URL(url).pathname.split("/").at(-1)
      requested.push(name)
      assert.equal(options.headers.Authorization, "Bearer mock-secret")
      if (name === "registry")
        return {
          ok: true,
          json: async () => ({ items: [{ name: "fixture-block", type: "registry:block" }] }),
        }
      const dependencies =
        name === "fixture-block"
          ? ["@irsyad/button", "@irsyad/table", new URL("button", url).href]
          : name === "button"
            ? ["@irsyad/button"]
            : []
      return { ok: true, json: async () => ({ name, registryDependencies: dependencies }) }
    }
    const result = await auditLive(
      only,
      { REGISTRY_TOKEN: "mock-secret" },
      "fixture-block",
      fixture
    )
    assert.equal(result.status, "dependency-payload-closure-inspected")
    assert.equal(result.installed, false)
    assert.equal(result.mode, "mock")
    assert.equal(result.accessEvidence.mode, "mock")
    assert.deepEqual(
      result.externalEdges.map((edge) => edge.status),
      ["payload-inspected"]
    )
    assert.deepEqual(
      result.items.map((item) => item.item),
      ["button", "dialog", "table", "fixture-block"]
    )
    assert.ok(!JSON.stringify(result).includes("mock-secret"))
    assert.deepEqual(requested, ["registry", "button", "dialog", "table", "fixture-block"])
    checks++
    process.stdout.write(
      "PASS mock live audit: unified closure, no auth request, sanitized metadata\n"
    )
  })()
  await (async () => {
    const config = {
      style: "new-york",
      tailwind: { config: "" },
      registries: {
        "@irsyad": registryConfig.registries["@irsyad"],
        "@external": {
          url: "https://external.test/r/{name}.json",
          headers: { Authorization: "Bearer ${EXTERNAL_TOKEN}" },
          params: { version: "${VERSION}" },
        },
        "@public": "https://public.test/{name}.json",
        "@unavailable": {
          url: "https://missing.test/{name}",
          headers: { Authorization: "Bearer ${MISSING_TOKEN}" },
        },
      },
    }
    const environment = {
      REGISTRY_TOKEN: "mock-secret",
      EXTERNAL_TOKEN: "external-secret",
      VERSION: "v4",
    }
    assert.equal(
      resolveDependency("button", config).url,
      "https://ui.shadcn.com/r/styles/new-york-v4/button.json"
    )
    assert.equal(
      resolveDependency("@shadcn/button", config).url,
      resolveDependency("button", config).url
    )
    assert.equal(resolveDependency("@public/card", config).url, "https://public.test/card.json")
    assert.equal(resolveDependency("./local.json", config).status, "unsupported-dependency-address")
    assert.equal(
      resolveDependency("acme/ui/button", config).status,
      "unsupported-dependency-address"
    )
    const requests = []
    const fixture = async (address, options) => {
      const url = new URL(address)
      requests.push(address)
      assert.equal(options.redirect, "error")
      const own = url.origin === "https://design.intentui.com"
      assert.deepEqual(
        options.headers,
        own && !url.pathname.endsWith("/raw-child")
          ? { Authorization: "Bearer mock-secret", "X-Project": "fixture" }
          : url.hostname === "external.test"
            ? { Authorization: "Bearer external-secret" }
            : {}
      )
      if (url.pathname.endsWith("/registry")) return { ok: true, json: async () => ({ items: [] }) }
      const name = url.pathname.split("/").at(-1)
      if (url.hostname === "external.test") assert.equal(url.searchParams.get("version"), "v4")
      const dependencies =
        own && name === "button"
          ? [
              "button",
              "@shadcn/button",
              "https://design.intentui.com/r/raw-child",
              "@external/card",
              "@public/card",
              "@unknown/card",
              "@unavailable/card",
              "https://unconfigured.test/r/card.json?token=do-not-print",
            ]
          : url.hostname === "external.test"
            ? ["@external/card", "@irsyad/button"]
            : []
      return { ok: true, json: async () => ({ name, registryDependencies: dependencies }) }
    }
    const result = await auditLive(config, environment, undefined, fixture)
    assert.equal(result.status, "dependency-resolution-unverified")
    assert.equal(requests.filter((url) => url.includes("ui.shadcn.com")).length, 1)
    assert.equal(requests.filter((url) => url.includes("external.test")).length, 1)
    assert.equal(requests.filter((url) => url.endsWith("/raw-child")).length, 1)
    assert.ok(!requests.some((url) => /missing.test|unconfigured.test/.test(url)))
    assert.deepEqual(
      result.externalEdges
        .filter((edge) => edge.status !== "payload-inspected")
        .map((edge) => edge.status),
      [
        "namespace-not-configured",
        "registry-configuration-unavailable",
        "external-url-requires-separate-inspection",
      ]
    )
    assert.ok(!/mock-secret|external-secret|do-not-print/.test(JSON.stringify(result)))
    const denied = await auditLive(config, environment, undefined, async () => ({
      ok: false,
      status: 401,
    }))
    assert.equal(denied.status, "authentication-failed-stop")
    checks++
    process.stdout.write(
      "PASS registry dependency resolution: shadcn bare names, scoped credentials, external namespaces, cycles and unresolved edges\n"
    )
  })()
  check("codemods: pristine/customized, preview, idempotence, scopes and unsafe shapes", () => {
    const tools = loadTools(root)
    const original =
      'import { Button } from "@/components/ui/button"; import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal"; export function Rename() { return <Modal><Button intent="outline">My action</Button><ModalContent size="lg" className="custom-surface"><ModalTitle>Custom title</ModalTitle><p>Keep my content</p></ModalContent></Modal> }'
    const migrated = transformModal(original, "feature.tsx", tools)
    assert.equal(migrated.skipped.length, 0)
    assert.equal(migrated.count, 1)
    assert.ok(
      migrated.code.includes("DialogTrigger") &&
        migrated.code.includes("custom-surface") &&
        migrated.code.includes("Keep my content")
    )
    assert.equal(transformModal(migrated.code, "feature.tsx", tools).code, migrated.code)
    assert.equal(
      migrated.code,
      original
        .replaceAll("ModalContent", "Dialog")
        .replaceAll("ModalTitle", "DialogTitle")
        .replaceAll("Modal", "DialogTrigger")
        .replace("/modal", "/dialog")
    )
    const styled =
      original
        .replaceAll('"', "'")
        .replaceAll("; ", ";\r\n")
        .replace("export function", "// Keep this comment\r\nexport function") + "\r\n"
    assert.equal(
      transformModal(styled, "feature.tsx", tools).code,
      styled
        .replaceAll("ModalContent", "Dialog")
        .replaceAll("ModalTitle", "DialogTitle")
        .replaceAll("Modal", "DialogTrigger")
        .replace("/modal", "/dialog")
    )
    for (const unsafe of [
      original.replace(
        '<Button intent="outline">My action</Button>',
        "{ready && <Button>Open</Button>}"
      ),
      original.replace('size="lg"', "{...customProps}"),
      original.replace("export function Rename()", "const Dialog = 1; export function Rename()"),
    ]) {
      const result = transformModal(unsafe, "feature.tsx", tools)
      assert.equal(result.code, unsafe)
      assert.ok(result.skipped.length)
    }
    const alias = original
      .replace(
        "{ Modal, ModalContent, ModalTitle }",
        "{ Modal as OldModal, ModalContent as OldSurface, ModalTitle }"
      )
      .replaceAll("<Modal>", "<OldModal>")
      .replaceAll("</Modal>", "</OldModal>")
      .replaceAll("<ModalContent ", "<OldSurface ")
      .replaceAll("</ModalContent>", "</OldSurface>")
    assert.equal(
      transformModal(alias, "feature.tsx", tools).code,
      alias
        .replace("Modal as OldModal", "DialogTrigger as OldModal")
        .replace("ModalContent as OldSurface", "Dialog as OldSurface")
        .replaceAll("ModalTitle", "DialogTitle")
        .replace("/modal", "/dialog")
    )
    const jsx =
      'export const Demo = () => <div className="hover:text-muted-fg/70 bg-bg">bg-bg unrelated</div>'
    const renamed = transformTokens(jsx, "feature.tsx", tools)
    assert.ok(renamed.code.includes("hover:text-muted-foreground/70 bg-background"))
    assert.ok(renamed.code.includes(">bg-bg unrelated</div>"))
    assert.equal(transformTokens(renamed.code, "feature.tsx", tools).code, renamed.code)
    assert.ok(
      transformTokens(
        "export const Demo = ({tone}) => <div className={`bg-bg ${tone}`} />",
        "feature.tsx",
        tools
      ).skipped.length
    )
    const cssText =
      ':root { --bg: white; --primary-fg: black; } @theme inline { --color-bg: var(--bg); } p { content: "var(--bg)"; color: var(--primary-fg); } .action { @apply bg-bg text-fg; }'
    const cssResult = transformTokens(cssText, "theme.css", tools)
    assert.ok(
      cssResult.code.includes("--background: white") &&
        cssResult.code.includes("var(--primary-foreground)")
    )
    assert.ok(cssResult.code.includes('content: "var(--bg)"'))
    assert.ok(cssResult.code.includes("@apply bg-background text-foreground"))
    assert.equal(transformTokens(cssResult.code, "theme.css", tools).code, cssResult.code)
    assert.ok(
      transformTokens(":root{--bg:red;--background:blue}", "theme.css", tools).skipped.length
    )
    const project = path.join(temp, "codemod-project")
    fs.mkdirSync(project)
    fs.symlinkSync(path.join(root, "node_modules"), path.join(project, "node_modules"), "dir")
    fs.writeFileSync(path.join(project, "feature.tsx"), original)
    fs.writeFileSync(path.join(project, "components.json"), JSON.stringify(registryConfig))
    fs.writeFileSync(path.join(project, ".env"), "DO_NOT_PRINT=fixture-secret")
    const protectedBytes = fs.readFileSync(path.join(project, "components.json"), "utf8")
    const preview = migrateFiles(project, ["feature.tsx"], ["modal"])
    assert.ok(
      preview[0].diff.includes("--- a/feature.tsx") && preview[0].diff.includes("+++ b/feature.tsx")
    )
    assert.ok(
      preview[0].diff.includes("-" + original) && preview[0].diff.includes("+" + migrated.code)
    )
    const cliPreview = JSON.parse(
      execFileSync(
        process.execPath,
        [
          path.join(skillRoot, "intentui-migrate/scripts/migrate.mjs"),
          "--project",
          project,
          "--modal",
          "feature.tsx",
        ],
        { encoding: "utf8" }
      )
    )
    assert.equal(cliPreview[0].diff, preview[0].diff)
    assert.equal(fs.readFileSync(path.join(project, "feature.tsx"), "utf8"), original)
    migrateFiles(project, ["feature.tsx"], ["modal"], true)
    assert.equal(fs.readFileSync(path.join(project, "feature.tsx"), "utf8"), migrated.code)
    assert.equal(migrateFiles(project, ["feature.tsx"], ["modal"])[0].diff, "")
    assert.equal(fs.readFileSync(path.join(project, "components.json"), "utf8"), protectedBytes)
    assert.throws(() => migrateFiles(project, [".env"], ["tokens"], true))
    assert.throws(() => migrateFiles(project, ["components.json"], ["tokens"], true))
    assert.deepEqual(
      JSON.parse(
        fs.readFileSync(path.join(skillRoot, "intentui-migrate/scripts/token-map.json"), "utf8")
      ),
      JSON.parse(fs.readFileSync(path.join(skillRoot, "tests/token-map.json"), "utf8"))
    )
  })
  check("scenarios 1/3/8: v3 examples and dashboard typecheck against actual source", () =>
    assert.ok(typecheckExamples("v3") >= 10)
  )
  check("scenarios 2/4/8: v4 examples and dashboard typecheck against actual source", () =>
    assert.ok(typecheckExamples("v4") >= 10)
  )
  process.stdout.write(
    `\n${checks} validation groups passed. No live premium authentication or install was attempted.\n`
  )
} finally {
  fs.rmSync(temp, { recursive: true, force: true })
}
