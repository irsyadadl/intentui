import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"

export function parseJsonc(text) {
  let result = "",
    string = false,
    escaped = false
  for (let i = 0; i < text.length; i++) {
    const char = text[i],
      next = text[i + 1]
    if (string) {
      result += char
      if (escaped) escaped = false
      else if (char === "\\") escaped = true
      else if (char === '"') string = false
    } else if (char === '"') {
      string = true
      result += char
    } else if (char === "/" && next === "/") {
      while (i < text.length && text[i] !== "\n") i++
      result += "\n"
    } else if (char === "/" && next === "*") {
      i += 2
      while (i < text.length && !(text[i] === "*" && text[i + 1] === "/")) i++
      i++
      result += " "
    } else result += char
  }
  let clean = ""
  string = false
  escaped = false
  for (let i = 0; i < result.length; i++) {
    const char = result[i]
    if (!string && char === "," && /^[\s]*[}\]]/.test(result.slice(i + 1))) continue
    clean += char
    if (string && escaped) escaped = false
    else if (string && char === "\\") escaped = true
    else if (char === '"') string = !string
  }
  return JSON.parse(clean)
}

function loadPaths(file, seen = new Set()) {
  const full = path.resolve(file)
  if (seen.has(full)) throw new Error("Circular TypeScript configuration")
  seen.add(full)
  const config = parseJsonc(fs.readFileSync(full, "utf8"))
  let inherited = { paths: {}, pathsOrigin: path.dirname(full), baseUrl: undefined }
  for (const item of [config.extends ?? []].flat()) {
    let parent
    if (item.startsWith(".")) {
      parent = path.resolve(path.dirname(full), item)
      if (!path.extname(parent)) parent += ".json"
    } else parent = createRequire(full).resolve(item)
    inherited = { ...inherited, ...loadPaths(parent, new Set(seen)) }
  }
  const options = config.compilerOptions ?? {}
  const baseUrl =
    options.baseUrl === undefined
      ? inherited.baseUrl
      : path.resolve(path.dirname(full), options.baseUrl)
  const paths = options.paths ?? inherited.paths
  const pathsOrigin = options.paths ? path.dirname(full) : inherited.pathsOrigin
  return { paths, pathsOrigin, baseUrl, base: baseUrl ?? pathsOrigin }
}

export function resolveUIDirectory(projectRoot, config) {
  const alias = config.aliases?.ui
  if (!alias) throw new Error("No aliases.ui configured; inspect existing imports manually")
  const tsconfig = path.join(projectRoot, "tsconfig.json")
  const mapping = fs.existsSync(tsconfig) ? loadPaths(tsconfig) : { paths: {}, base: projectRoot }
  for (const [key, destinations] of Object.entries(mapping.paths).sort(
    (a, b) => b[0].length - a[0].length
  )) {
    const wildcard = key.indexOf("*")
    const prefix = wildcard < 0 ? key : key.slice(0, wildcard)
    const suffix = wildcard < 0 ? "" : key.slice(wildcard + 1)
    if (wildcard < 0 ? alias !== key : !alias.startsWith(prefix) || !alias.endsWith(suffix))
      continue
    const middle =
      wildcard < 0 ? "" : alias.slice(prefix.length, suffix ? -suffix.length : undefined)
    const candidates = destinations.map((destination) =>
      path.resolve(mapping.base, destination.replace("*", middle))
    )
    const existing = candidates.filter((candidate) => fs.existsSync(candidate))
    if (existing.length > 1)
      throw new Error("Multiple UI alias targets exist; inspect resolution manually")
    if (existing.length === 1) return existing[0]
    if (candidates.length === 1) return candidates[0]
    throw new Error("UI alias has multiple unresolved targets")
  }
  if (alias.startsWith("./") || alias.startsWith("../")) return path.resolve(projectRoot, alias)
  throw new Error(
    "UI alias is unresolved; inspect workspace package exports or bundler aliases manually"
  )
}

export function detectVersion({ files = {}, css = "", requestedVersion } = {}) {
  const evidence = []
  const compatibilityWarnings = []
  for (const [file, content] of Object.entries(files)) {
    if (/\b(?:const|function)\s+TooltipContent\b/.test(content))
      compatibilityWarnings.push({
        file,
        signal:
          "Legacy TooltipContent API; also found in early v4 copies, inspect installed composition",
      })
    if (
      /\bconst\s+TooltipTrigger\s*=\s*TooltipTriggerPrimitive\b/.test(content) &&
      /\b(?:const|function)\s+Tooltip\b/.test(content)
    )
      evidence.push({ file, version: "v4", signal: "TooltipTrigger wrapper and Tooltip surface" })
    if (/\b(?:const|function)\s+ModalContent\b/.test(content))
      evidence.push({ file, version: "v3", signal: "ModalContent implementation" })
    if (/\b(?:const|function)\s+SheetContent\b/.test(content))
      evidence.push({ file, version: "v3", signal: "SheetContent implementation" })
    if (/\b(?:const|function)\s+MenuContent\b/.test(content))
      evidence.push({ file, version: "v3", signal: "MenuContent implementation" })
    if (/\b(?:const|function)\s+Dialog\b/.test(content) && /<ModalOverlay\b/.test(content))
      evidence.push({ file, version: "v4", signal: "Dialog owns modal overlay" })
    if (
      /\bconst\s+SheetTrigger\s*=\s*SheetTriggerPrimitive\b/.test(content) &&
      /\b(?:const|function)\s+Sheet\b/.test(content)
    )
      evidence.push({ file, version: "v4", signal: "SheetTrigger wrapper and Sheet surface" })
    if (
      /\bconst\s+MenuTrigger\b/.test(content) &&
      /<MenuTriggerPrimitive\b/.test(content) &&
      /\b(?:const|function)\s+Menu\b/.test(content) &&
      !/\bMenuContent\b/.test(content)
    )
      evidence.push({ file, version: "v4", signal: "MenuTrigger wrapper and Menu surface" })
  }
  if (/--color-(bg|fg|muted-fg)\s*:\s*var\(--\1\)/.test(css))
    evidence.push({ file: "theme", version: "v3", signal: "v3 semantic color aliases" })
  if (/--color-(background|foreground|muted-foreground)\s*:\s*var\(--\1\)/.test(css))
    evidence.push({ file: "theme", version: "v4", signal: "v4 semantic color aliases" })
  const versions = new Set(evidence.map((item) => item.version))
  const version =
    versions.size > 1 ? "mixed" : evidence.length >= 2 ? evidence[0].version : "unknown"
  return {
    version,
    evidence,
    compatibilityWarnings,
    requestedVersion: requestedVersion ?? null,
    targetMismatch: !!requestedVersion && version !== requestedVersion,
    inspectionRequired: version === "mixed" || version === "unknown",
  }
}

export function inspectProject(projectRoot) {
  const root = path.resolve(projectRoot)
  const config = parseJsonc(fs.readFileSync(path.join(root, "components.json"), "utf8"))
  const uiDirectory = resolveUIDirectory(root, config)
  const files = {}
  for (const name of ["modal", "dialog", "sheet", "menu", "popover", "tooltip"]) {
    const file = path.join(uiDirectory, `${name}.tsx`)
    if (fs.existsSync(file)) files[path.relative(root, file)] = fs.readFileSync(file, "utf8")
  }
  const cssPath = config.tailwind?.css ? path.resolve(root, config.tailwind.css) : null
  const css = cssPath && fs.existsSync(cssPath) ? fs.readFileSync(cssPath, "utf8") : ""
  return { uiDirectory, cssPath, commercialTarget: "v4", ...detectVersion({ files, css }) }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    process.stdout.write(
      JSON.stringify(inspectProject(process.argv[2] ?? process.cwd()), null, 2) + "\n"
    )
  } catch {
    process.stderr.write(
      "Inspection incomplete: check components.json, TypeScript aliases, and workspace configuration manually.\n"
    )
    process.exitCode = 1
  }
}
