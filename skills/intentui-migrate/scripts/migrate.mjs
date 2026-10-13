import fs from "node:fs"
import path from "node:path"
import os from "node:os"
import { spawnSync } from "node:child_process"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"

const tokens = JSON.parse(fs.readFileSync(new URL("./token-map.json", import.meta.url), "utf8"))
const changes = Object.entries(tokens).filter(([old, target]) => old !== target)
export function loadTools(project) {
  const require = createRequire(path.join(path.resolve(project), "package.json"))
  return {
    ts: require("typescript"),
    postcss: require("postcss"),
  }
}
function utilityTokens(text) {
  let result = text
  for (const [old, target] of [...changes].sort((a, b) => b[0].length - a[0].length)) {
    const pattern = new RegExp(
      `(^|[\\s:])((?:bg|text|border|ring|fill|stroke|outline|divide|placeholder|from|via|to|shadow|accent|caret|decoration)-)${old}(?=$|[\\s/\\]])`,
      "g"
    )
    result = result.replace(pattern, (_, boundary, utility) => boundary + utility + target)
  }
  return result
}
export function transformTokens(code, file, tools) {
  if (file.endsWith(".css")) {
    const ast = tools.postcss.parse(code, { from: file })
    const variables = new Map(
      changes.flatMap(([old, target]) => [
        [`--${old}`, `--${target}`],
        [`--color-${old}`, `--color-${target}`],
      ])
    )
    let count = 0
    let collision = false
    ast.walkDecls((declaration) => {
      const target = variables.get(declaration.prop)
      if (
        target &&
        declaration.parent.nodes.some(
          (sibling) => sibling !== declaration && sibling.type === "decl" && sibling.prop === target
        )
      )
        collision = true
    })
    if (collision)
      return { code, count: 0, skipped: ["Existing target CSS variable requires manual merge"] }
    ast.walkAtRules("apply", (rule) => {
      const target = utilityTokens(rule.params)
      if (target !== rule.params) {
        rule.params = target
        count++
      }
    })
    ast.walkDecls((declaration) => {
      if (variables.has(declaration.prop)) {
        declaration.prop = variables.get(declaration.prop)
        count++
      }
      let value = "",
        quote = null,
        escaped = false
      for (let i = 0; i < declaration.value.length; i++) {
        const char = declaration.value[i]
        if (quote) {
          value += char
          if (escaped) escaped = false
          else if (char === "\\") escaped = true
          else if (char === quote) quote = null
        } else if (char === '"' || char === "'") {
          quote = char
          value += char
        } else if (char === "/" && declaration.value[i + 1] === "*") {
          const end = declaration.value.indexOf("*/", i + 2)
          if (end < 0) throw new Error("Unterminated CSS comment")
          value += declaration.value.slice(i, end + 2)
          i = end + 1
        } else {
          const match =
            (i === 0 || !/[\w-]/.test(declaration.value[i - 1])) &&
            /^var\(\s*(--[\w-]+)(?=\s*[,)])/.exec(declaration.value.slice(i))
          if (match && variables.has(match[1])) {
            value += match[0].replace(match[1], variables.get(match[1]))
            i += match[0].length - 1
            count++
          } else value += char
        }
      }
      declaration.value = value
    })
    return { code: ast.toString(), count, skipped: [] }
  }
  const ts = tools.ts
  const ast = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  if (ast.parseDiagnostics.length) throw new Error("Invalid TSX; no changes applied")
  const replacements = [],
    skipped = []
  function strings(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const raw = code.slice(node.getStart(ast) + 1, node.end - 1)
      if (raw !== node.text) {
        skipped.push("Escaped class literal requires manual review")
        return
      }
      const target = utilityTokens(raw)
      if (target !== node.text)
        replacements.push({ start: node.getStart(ast) + 1, end: node.end - 1, value: target })
      return
    }
    if (ts.isTemplateExpression(node)) {
      skipped.push("Dynamic class template requires manual review")
      return
    }
    if (ts.isJsxExpression(node) || ts.isParenthesizedExpression(node)) {
      if (node.expression) strings(node.expression)
      return
    }
    if (ts.isConditionalExpression(node)) {
      strings(node.whenTrue)
      strings(node.whenFalse)
      return
    }
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      ["cn", "cx", "twJoin", "twMerge"].includes(node.expression.text)
    ) {
      node.arguments.forEach(strings)
      return
    }
    if (
      ts.isBinaryExpression(node) &&
      [
        ts.SyntaxKind.AmpersandAmpersandToken,
        ts.SyntaxKind.BarBarToken,
        ts.SyntaxKind.QuestionQuestionToken,
      ].includes(node.operatorToken.kind)
    ) {
      if (node.operatorToken.kind !== ts.SyntaxKind.AmpersandAmpersandToken) strings(node.left)
      strings(node.right)
      return
    }
    if (!ts.isIdentifier(node))
      skipped.push("Unsupported className expression requires manual review")
  }
  function visit(node) {
    if (ts.isJsxAttribute(node) && node.name.text === "className" && node.initializer)
      strings(node.initializer)
    else ts.forEachChild(node, visit)
  }
  visit(ast)
  let result = code
  for (const edit of replacements.sort((a, b) => b.start - a.start))
    result = result.slice(0, edit.start) + edit.value + result.slice(edit.end)
  return { code: result, count: replacements.length, skipped }
}

export function transformModal(code, file, tools) {
  const ts = tools.ts
  const ast = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  if (ast.parseDiagnostics.length) throw new Error("Invalid TSX; no changes applied")
  const mappings = {
    Modal: "DialogTrigger",
    ModalContent: "Dialog",
    ModalHeader: "DialogHeader",
    ModalTitle: "DialogTitle",
    ModalDescription: "DialogDescription",
    ModalBody: "DialogBody",
    ModalFooter: "DialogFooter",
    ModalClose: "DialogClose",
  }
  const imports = ast.statements.filter(
    (node) => ts.isImportDeclaration(node) && node.moduleSpecifier.text.endsWith("/modal")
  )
  if (!imports.length) return { code, count: 0, skipped: [] }
  const unsupported = (reason) => ({ code, count: 0, skipped: [reason] })
  if (imports.length !== 1) return unsupported("Multiple modal imports require manual review")
  const declaration = imports[0],
    bindings = declaration.importClause?.namedBindings
  if (
    declaration.importClause?.name ||
    declaration.importClause?.isTypeOnly ||
    !bindings ||
    !ts.isNamedImports(bindings)
  )
    return unsupported("Default/namespace/type modal import requires manual review")
  if (
    code.slice(
      declaration.moduleSpecifier.getStart(ast) + 1,
      declaration.moduleSpecifier.end - 1
    ) !== declaration.moduleSpecifier.text
  )
    return unsupported("Escaped modal module path requires manual review")
  const aliases = new Map()
  let wrapper, surface
  for (const item of bindings.elements) {
    const imported = item.propertyName?.text ?? item.name.text
    if (!mappings[imported] || item.isTypeOnly)
      return unsupported("Unsupported modal export or type import")
    const target = item.propertyName ? item.name.text : mappings[imported]
    aliases.set(item.name.text, { imported, target })
    if (imported === "Modal") wrapper = item.name.text
    if (imported === "ModalContent") surface = item.name.text
  }
  if (!wrapper || !surface)
    return unsupported("Only wrapper-plus-surface Modal consumers are automated")
  const occupied = new Set(),
    buttonAliases = new Set()
  for (const item of ast.statements) {
    if (
      ts.isImportDeclaration(item) &&
      item !== declaration &&
      item.importClause?.namedBindings &&
      ts.isNamedImports(item.importClause.namedBindings)
    ) {
      for (const element of item.importClause.namedBindings.elements) {
        occupied.add(element.name.text)
        if (
          item.moduleSpecifier.text.endsWith("/button") &&
          (element.propertyName?.text ?? element.name.text) === "Button"
        )
          buttonAliases.add(element.name.text)
      }
    }
  }
  function declared(node) {
    if (
      (ts.isVariableDeclaration(node) ||
        ts.isParameter(node) ||
        ts.isFunctionDeclaration(node) ||
        ts.isClassDeclaration(node)) &&
      node.name
    )
      occupied.add(node.name.getText(ast))
    if (ts.isImportClause(node) && node.name) occupied.add(node.name.text)
    ts.forEachChild(node, declared)
  }
  declared(ast)
  for (const { target } of aliases.values())
    if (occupied.has(target)) return unsupported("Target import collision requires manual review")
  let wrappers = 0,
    surfaces = 0,
    reason
  function validate(node) {
    if (
      (ts.isParameter(node) || ts.isVariableDeclaration(node) || ts.isFunctionDeclaration(node)) &&
      node.name &&
      aliases.has(node.name.getText(ast))
    )
      reason = "Shadowed modal binding requires manual review"
    if (ts.isJsxElement(node) && node.openingElement.tagName.getText(ast) === wrapper) {
      wrappers++
      const children = node.children.filter((child) => !ts.isJsxText(child) || child.text.trim())
      const tag = (child) =>
        ts.isJsxElement(child)
          ? child.openingElement.tagName.getText(ast)
          : ts.isJsxSelfClosingElement(child)
            ? child.tagName.getText(ast)
            : null
      if (
        children.length !== 2 ||
        !buttonAliases.has(tag(children[0])) ||
        tag(children[1]) !== surface
      )
        reason =
          "Modal requires a direct imported Button and ModalContent; conditional/custom trigger shapes are manual"
      for (const attribute of node.openingElement.attributes.properties)
        if (
          !ts.isJsxAttribute(attribute) ||
          !["isOpen", "onOpenChange", "defaultOpen"].includes(attribute.name.text)
        )
          reason = "Unsupported wrapper attribute/spread requires manual review"
    }
    if (
      (ts.isJsxElement(node) && node.openingElement.tagName.getText(ast) === surface) ||
      (ts.isJsxSelfClosingElement(node) && node.tagName.getText(ast) === surface)
    ) {
      surfaces++
      const attributes = ts.isJsxElement(node) ? node.openingElement.attributes : node.attributes
      if (attributes.properties.some(ts.isJsxSpreadAttribute))
        reason = "Surface prop spread requires manual review"
    }
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(ast) === wrapper)
      reason = "Self-closing Modal requires manual review"
    if (ts.isIdentifier(node) && aliases.has(node.text)) {
      const parent = node.parent
      const isTag =
        (ts.isJsxOpeningElement(parent) ||
          ts.isJsxClosingElement(parent) ||
          ts.isJsxSelfClosingElement(parent)) &&
        parent.tagName === node
      if (!isTag && !ts.isImportSpecifier(parent) && !ts.isTypeQueryNode(parent))
        reason = "Non-JSX modal binding use requires manual review"
    }
    ts.forEachChild(node, validate)
  }
  validate(ast)
  if (!wrappers || wrappers !== surfaces || reason)
    return unsupported(reason ?? "Unpaired ModalContent requires manual review")
  const edits = []
  for (const item of bindings.elements) {
    const imported = item.propertyName ?? item.name
    edits.push({ start: imported.getStart(ast), end: imported.end, value: mappings[imported.text] })
  }
  const module = declaration.moduleSpecifier
  edits.push({ start: module.end - 1 - "modal".length, end: module.end - 1, value: "dialog" })
  function rename(node) {
    if (ts.isIdentifier(node) && aliases.has(node.text)) {
      const parent = node.parent
      if (
        ((ts.isJsxOpeningElement(parent) ||
          ts.isJsxClosingElement(parent) ||
          ts.isJsxSelfClosingElement(parent)) &&
          parent.tagName === node) ||
        ts.isTypeQueryNode(parent)
      ) {
        edits.push({
          start: node.getStart(ast),
          end: node.end,
          value: aliases.get(node.text).target,
        })
      }
    }
    ts.forEachChild(node, rename)
  }
  rename(ast)
  let result = code
  for (const edit of edits.sort((a, b) => b.start - a.start))
    result = result.slice(0, edit.start) + edit.value + result.slice(edit.end)
  return { code: result, count: wrappers, skipped: [] }
}

function codeDiff(original, code, relative) {
  if (original === code) return ""
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "intentui-migration-diff-"))
  try {
    fs.writeFileSync(path.join(temp, "before"), original)
    fs.writeFileSync(path.join(temp, "after"), code)
    const result = spawnSync(
      "git",
      [
        "diff",
        "--no-index",
        "--no-color",
        "--no-ext-diff",
        "--no-textconv",
        "--text",
        "--unified=3",
        "--",
        "before",
        "after",
      ],
      { cwd: temp, encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
    )
    if (result.error || result.status !== 1)
      throw new Error("Unable to generate migration diff; Git is required")
    return result.stdout
      .replace(/^diff --git a\/before b\/after$/m, () => `diff --git a/${relative} b/${relative}`)
      .replace(/^--- a\/before$/m, () => `--- a/${relative}`)
      .replace(/^\+\+\+ b\/after$/m, () => `+++ b/${relative}`)
  } finally {
    fs.rmSync(temp, { recursive: true, force: true })
  }
}

export function migrateFiles(project, files, modes, write = false) {
  if (!modes.length || modes.some((mode) => !["tokens", "modal"].includes(mode)))
    throw new Error("Unsupported migration mode")
  const root = fs.realpathSync(project),
    tools = loadTools(root),
    plan = []
  for (const name of files) {
    const file = fs.realpathSync(path.resolve(root, name))
    const relative = path.relative(root, file)
    if (
      relative.startsWith("..") ||
      path.isAbsolute(relative) ||
      /(^|\/)(?:\.env[^/]*|components\.json|registry[^/]*\.json|[^/]*lock[^/]*|node_modules)(\/|$)/.test(
        relative
      ) ||
      !/\.(?:tsx|css)$/.test(file)
    )
      throw new Error("Scope contains a protected or unsupported file")
    const original = fs.readFileSync(file, "utf8")
    let code = original,
      count = 0,
      skipped = []
    for (const mode of modes) {
      if (mode === "modal" && !file.endsWith(".tsx")) continue
      const result =
        mode === "modal" ? transformModal(code, file, tools) : transformTokens(code, file, tools)
      code = result.code
      count += result.count
      skipped.push(...result.skipped)
    }
    plan.push({
      file,
      relative,
      original,
      code,
      count,
      skipped,
      diff: codeDiff(original, code, relative),
    })
  }
  if (write) {
    for (const item of plan)
      if (fs.readFileSync(item.file, "utf8") !== item.original)
        throw new Error("A file changed after preview; no writes performed")
    for (const item of plan) if (item.code !== item.original) fs.writeFileSync(item.file, item.code)
  }
  return plan.map(({ relative, original, code, count, skipped, diff }) => ({
    file: relative,
    changed: original !== code,
    transformations: count,
    skipped,
    action: write ? "applied" : "dry-run",
    diff,
    preview: modes.map((mode) =>
      mode === "modal"
        ? "Modal wrapper/content/imports → DialogTrigger/Dialog/dialog module"
        : "Exact semantic className utilities and CSS variable definitions/references → v4"
    ),
  }))
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2),
      index = args.indexOf("--project")
    if (index < 0 || !args[index + 1])
      throw new Error(
        "Use --project PATH, --tokens and/or --modal, explicit relative .tsx/.css files, and optional --write; default is dry-run"
      )
    const project = args[index + 1]
    args.splice(index, 2)
    const modes = [
      args.includes("--tokens") ? "tokens" : null,
      args.includes("--modal") ? "modal" : null,
    ].filter(Boolean)
    const files = args.filter((arg) => !arg.startsWith("--"))
    if (
      !modes.length ||
      !files.length ||
      args.some(
        (arg) =>
          arg.startsWith("--") && !["--tokens", "--modal", "--write", "--dry-run"].includes(arg)
      ) ||
      (args.includes("--write") && args.includes("--dry-run"))
    )
      throw new Error(
        "Specify a supported transformation and explicit files; no directory traversal or conflicting modes"
      )
    process.stdout.write(
      JSON.stringify(migrateFiles(project, files, modes, args.includes("--write")), null, 2) + "\n"
    )
  } catch (error) {
    process.stderr.write(`${error.message}\n`)
    process.exitCode = 1
  }
}
