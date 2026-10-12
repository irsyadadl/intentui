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

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const skillRoot = path.join(root, "skills")
const refs = {
  v3: "148acd77308d4a13b31b2ae2846d243b486c1f60",
  v4: "c6ecd68a44522ef20b67da5b398028464308ce8a",
}
const skills = ["intentui", "intentui-design", "intentui-migrate"]
const source = (version, file) =>
  execFileSync("git", ["show", `${refs[version]}:${file}`], {
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
  Array.from({ length: 13 }, (_, index) => index + 1)
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
    const result = inspectRegistry(registryConfig, "premium", {
      REGISTRY_TOKEN: "fixture-sentinel-secret",
    })
    assert.equal(result.namespace, "@irsyad")
    assert.equal(result.status, "ready-to-verify-access")
    assert.equal(result.authenticated, false)
    assert.equal(inspectRegistry(registryConfig, "public").namespace, "@intentui")
    assert.ok(!JSON.stringify(result).includes("fixture-sentinel-secret"))
    assert.equal(JSON.stringify(registryConfig), before)
    const reversed = {
      registries: Object.fromEntries(Object.entries(registryConfig.registries).reverse()),
    }
    assert.equal(inspectRegistry(reversed).namespace, "@irsyad")
  })
  check("scenario 6: missing/unsafe authentication stops without exposing secrets", () => {
    assert.equal(inspectRegistry(registryConfig).status, "variable-unavailable-in-process")
    assert.equal(
      inspectRegistry({ registries: { "@intentui": registryConfig.registries["@intentui"] } })
        .status,
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
    const result = inspectRegistry(literal)
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
      inspectRegistry(custom, "premium", { PURCHASED_REGISTRY_KEY: "fixture" }).variableAvailable,
      true
    )
    custom.registries["@irsyad"].headers.Authorization = "Bearer ${NEXT_PUBLIC_REGISTRY_TOKEN}"
    assert.equal(inspectRegistry(custom).status, "frontend-secret-variable")
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
