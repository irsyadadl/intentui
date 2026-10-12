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
// Bare dependencies are shadcn items, never relative to the parent registry.
export function resolveDependency(dependency, config, environment = {}) {
  if (/^https?:/.test(dependency)) return { url: dependency, headers: {}, namespace: null }
  const match = /^(@[\w-]+)\/([^/]+)$/.exec(dependency)
  if (!match && !/^[\w-]+$/.test(dependency)) return { status: "unsupported-dependency-address" }
  const namespace = match?.[1] ?? "@shadcn"
  const name = match?.[2] ?? dependency
  const registry =
    namespace === "@shadcn"
      ? "https://ui.shadcn.com/r/styles/{style}/{name}.json"
      : config.registries?.[namespace]
  if (!registry) return { status: "namespace-not-configured", namespace }
  const template = typeof registry === "string" ? registry : registry.url
  if (typeof template !== "string" || !template.includes("{name}"))
    return { status: "incomplete-registry-url", namespace }
  function expand(value) {
    return value.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g, (_, variable) => {
      if (/^(NEXT_PUBLIC_|VITE_)/.test(variable) || !environment[variable]?.trim())
        throw new Error("Registry environment variable unavailable or unsafe")
      return environment[variable]
    })
  }
  try {
    // Matches shadcn's v4 fallback for legacy new-york configurations.
    const style =
      !config.style || (config.style === "new-york" && config.tailwind?.config === "")
        ? "new-york-v4"
        : config.style
    const url = new URL(expand(template.replace("{name}", name).replace("{style}", style)))
    for (const [key, value] of Object.entries(registry.params ?? {}))
      url.searchParams.append(key, expand(value))
    const headers = Object.fromEntries(
      Object.entries(registry.headers ?? {}).map(([key, value]) => [key, expand(value)])
    )
    return { url: url.href, headers, namespace }
  } catch {
    return { status: "registry-configuration-unavailable", namespace }
  }
}

export function auditPayload(item, namespaces = ["@irsyad"]) {
  const externalEdges = (item.registryDependencies ?? [])
    .filter((dependency) => !namespaces.includes(dependency.split("/")[0]))
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
  const catalogAddress = resolveDependency("@irsyad/registry", config, environment)
  if (catalogAddress.status)
    return { mode, status: "skipped", reason: catalogAddress.status, installed: false }
  const base = new URL(catalogAddress.url)
  const seen = new Set(),
    metadata = [],
    externalEdges = []
  async function request(resolved) {
    const url = new URL(resolved.url)
    if (
      (url.protocol !== "https:" &&
        !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) ||
      url.username ||
      url.password
    )
      throw new Error("Registry access requires HTTPS or local HTTP without URL credentials")
    const response = await fetcher(url.href, {
      headers: resolved.headers,
      redirect: "error",
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok)
      return { failure: registryFailure(response.status), statusCode: response.status }
    return { payload: await response.json() }
  }
  const catalog = await request(catalogAddress)
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
    const resolved = resolveDependency(name, config, environment)
    if (resolved.status) return resolved.status
    const url = new URL(resolved.url)
    // Direct URLs never inherit registry credentials, even on the same host.
    if (resolved.namespace === null && url.origin !== base.origin)
      return "external-url-requires-separate-inspection"
    url.hash = ""
    const key = url.href
    if (seen.has(key)) return "payload-inspected"
    if (seen.size >= 100)
      throw new Error("Dependency limit exceeded; inspect remaining closure manually")
    seen.add(key)
    const result = await request({ ...resolved, url: key })
    if (result.failure) throw new Error(result.failure)
    const item = result.payload,
      audit = auditPayload(item)
    audit.namespace = resolved.namespace
    audit.externalEdges = []
    metadata.push(audit)
    for (const dependency of item.registryDependencies ?? []) {
      const status = await visit(dependency)
      if (status !== "payload-inspected" || !dependency.startsWith("@irsyad/")) {
        const edge = { item: item.name, dependency: safeAddress(dependency), status }
        audit.externalEdges.push(edge)
        externalEdges.push(edge)
      }
    }
    audit.resolution = audit.externalEdges.some((edge) => edge.status !== "payload-inspected")
      ? "dependency-resolution-unverified"
      : "dependency-payloads-inspected"
    return "payload-inspected"
  }
  for (const name of selected) {
    const status = await visit(`@irsyad/${name}`)
    if (status !== "payload-inspected") throw new Error(status)
  }
  return {
    mode,
    status: externalEdges.some((edge) => edge.status !== "payload-inspected")
      ? "dependency-resolution-unverified"
      : "dependency-payload-closure-inspected",
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
