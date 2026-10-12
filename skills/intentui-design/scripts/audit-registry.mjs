import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { inspectRegistry, registryFailure } from "./inspect-registry.mjs"

function safeAddress(address) {
  if (!/^https?:/.test(address)) return address
  try {
    const url = new URL(address)
    return url.origin + url.pathname
  } catch {
    return "invalid-address"
  }
}
export function auditPayload(item, namespaces = ["@irsyad"]) {
  const externalEdges = (item.registryDependencies ?? [])
    .filter(
      (dependency) => dependency.startsWith("@") && !namespaces.includes(dependency.split("/")[0])
    )
    .map((dependency) => ({
      item: item.name,
      dependency: safeAddress(dependency),
      status: "requires-resolution-verification",
    }))
  const signals = new Set()
  for (const file of item.files ?? []) {
    const source = file.content ?? ""
    for (const symbol of [
      "ModalContent",
      "SheetContent",
      "MenuContent",
      "PopoverContent",
      "TooltipContent",
    ])
      if (new RegExp(`\\b${symbol}\\b`).test(source)) signals.add(symbol)
    if (/(?:from\s*["'][^"']*\/(?:modal|context-menu)["'])/.test(source))
      signals.add("v3-module-import")
    if (/\b(?:bg-bg|text-fg|text-[\w-]+-fg)\b/.test(source)) signals.add("v3-semantic-utilities")
  }
  return {
    item: item.name,
    dependencies: (item.registryDependencies ?? []).map(safeAddress),
    externalEdges,
    compatibilitySignals: [...signals],
    compatible: signals.size ? "manual-source-review" : "inspect-local-v4-APIs",
    resolution: externalEdges.length
      ? "unverified-external-namespace"
      : "verify-dependency-closure",
  }
}
export async function auditLive(config, environment, block, fetcher = fetch) {
  const mode = fetcher === fetch ? "live" : "mock"
  const inspection = inspectRegistry(config, "premium", environment, { version: "v4" })
  if (inspection.status !== "ready-to-verify-access")
    return { mode, status: "skipped", reason: inspection.status, installed: false }
  const registry = config.registries["@irsyad"],
    base = new URL(registry.url.replace("{name}", "registry"))
  if (base.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(base.hostname))
    throw new Error("HTTPS is required for authenticated registry access")
  const headers = Object.fromEntries(
    Object.entries(registry.headers ?? {}).map(([key, value]) => [
      key,
      value.replace(
        /\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,
        (_, variable) => environment[variable] ?? ""
      ),
    ])
  )
  const seen = new Set(),
    metadata = [],
    externalEdges = []
  async function request(address) {
    const url = new URL(address)
    if (url.origin !== base.origin || url.username || url.password)
      throw new Error("External dependency origin requires separate authorized inspection")
    const response = await fetcher(url.href, {
      headers,
      redirect: "error",
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok)
      return { failure: registryFailure(response.status), statusCode: response.status }
    return { payload: await response.json() }
  }
  const catalog = await request(base.href)
  if (catalog.failure)
    return { mode, status: catalog.failure, statusCode: catalog.statusCode, installed: false }
  if (!Array.isArray(catalog.payload.items))
    return { mode, status: "catalog-unavailable", installed: false }
  const selected = ["button", "dialog", "table"]
  if (block) {
    if (
      !catalog.payload.items.some((item) => item.name === block && item.type === "registry:block")
    )
      return { mode, status: "requested-block-not-in-catalog", installed: false }
    selected.push(block)
  }
  async function visit(name) {
    const address = /^https?:/.test(name)
      ? name
      : registry.url.replace("{name}", name.replace(/^@irsyad\//, ""))
    const key = new URL(address).href
    if (seen.has(key)) return
    if (seen.size >= 100)
      throw new Error("Dependency limit exceeded; inspect remaining closure manually")
    seen.add(key)
    const result = await request(address)
    if (result.failure) throw new Error(result.failure)
    const item = result.payload,
      audit = auditPayload(item)
    metadata.push(audit)
    externalEdges.push(...audit.externalEdges)
    for (const dependency of item.registryDependencies ?? []) {
      if (dependency.startsWith("@") && !dependency.startsWith("@irsyad/")) continue
      await visit(dependency)
    }
  }
  for (const name of selected) await visit(name)
  return {
    mode,
    status: externalEdges.length
      ? "dependency-resolution-unverified"
      : "same-origin-payload-closure-inspected",
    namespace: "@irsyad",
    accessEvidence: { mode, namespace: "@irsyad", operation: "catalog", statusCode: 200 },
    blockIncluded: !!block,
    items: metadata,
    externalEdges,
    installed: false,
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv[2] !== "--live" || !process.argv[3])
      throw new Error(
        "Use --live PROJECT [verified-catalog-block-name]; process environment credentials required"
      )
    const config = JSON.parse(
      fs.readFileSync(path.join(path.resolve(process.argv[3]), "components.json"), "utf8")
    )
    process.stdout.write(
      JSON.stringify(await auditLive(config, process.env, process.argv[4]), null, 2) + "\n"
    )
  } catch {
    process.stderr.write(
      "Registry audit failed; inspect configuration, access and dependency origins without logging credentials.\n"
    )
    process.exitCode = 1
  }
}
