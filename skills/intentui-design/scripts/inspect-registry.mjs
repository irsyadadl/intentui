import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export function inspectRegistry(config, purpose = "premium", environment = {}, options = {}) {
  if (!["premium", "public"].includes(purpose)) throw new Error("Purpose must be premium or public")
  const version = options.version ?? "unknown"
  const premiumConfigured = Object.hasOwn(config.registries ?? {}, "@irsyad")
  const namespace =
    purpose === "premium" ||
    (version === "v4" && premiumConfigured) ||
    (premiumConfigured && !config.registries?.["@intentui"])
      ? "@irsyad"
      : "@intentui"
  const base = {
    namespace,
    selectedPurpose: purpose,
    registryPurpose: namespace === "@irsyad" ? "unified-v4" : "public",
    version,
    configured: false,
    authenticationPresent: false,
    access: "unverified",
    authenticated: false,
  }
  const registry = config.registries?.[namespace]
  if (!registry) return { ...base, status: "missing-registry" }
  const url = typeof registry === "string" ? registry : registry.url
  if (typeof url !== "string" || !url.includes("{name}"))
    return { ...base, status: "incomplete-registry-url" }
  base.configured = true
  if (namespace === "@irsyad" && version !== "v4")
    return { ...base, status: version === "v3" ? "requires-v4" : "inspect-v4-dependencies" }
  if (namespace === "@intentui") return { ...base, status: "configured" }
  const header =
    typeof registry === "object"
      ? Object.entries(registry.headers ?? {}).find(
          ([name]) => name.toLowerCase() === "authorization"
        )?.[1]
      : null
  const match =
    typeof header === "string" ? /^Bearer\s+\$\{([A-Za-z_][A-Za-z0-9_]*)\}$/.exec(header) : null
  if (!match)
    return { ...base, status: header ? "unsafe-or-unsupported-auth" : "missing-auth-header" }
  const variable = match[1]
  if (/^(NEXT_PUBLIC_|VITE_)/.test(variable)) return { ...base, status: "frontend-secret-variable" }
  const available =
    typeof environment[variable] === "string" && environment[variable].trim().length > 0
  const verified = options.verifiedAccess
  const accessVerified =
    available &&
    verified?.mode === "live" &&
    verified.namespace === namespace &&
    verified.statusCode >= 200 &&
    verified.statusCode < 300 &&
    ["catalog", "item"].includes(verified.operation)
  return {
    ...base,
    status: accessVerified
      ? "access-verified"
      : available
        ? "ready-to-verify-access"
        : "variable-unavailable-in-process",
    variable,
    variableAvailable: available,
    authenticationPresent: available,
    access: accessVerified ? "verified-live" : "unverified",
    authenticated: accessVerified,
  }
}

export function registryFailure(status) {
  if (status === 401) return "authentication-failed-stop"
  if (status === 403) return "license-or-permission-failed-stop"
  if (status === 404) return "verify-documented-item-and-url"
  return "inspect-sanitized-failure"
}

export function discoveryPlan(namespace, query, availableTools = []) {
  if (!["@irsyad", "@intentui"].includes(namespace))
    throw new Error("Select a documented registry purpose")
  const needed = [
    "search_items_in_registries",
    "view_items_in_registries",
    "get_add_command_for_items",
  ]
  if (needed.every((tool) => availableTools.includes(tool)))
    return {
      transport: "mcp",
      search: { tool: needed[0], arguments: { registries: [namespace], query } },
      inspectTool: needed[1],
      commandTool: needed[2],
    }
  return {
    transport: "cli",
    searchArguments: ["search", namespace, "-q", query],
    next: [
      "view verified item",
      "review compatibility and conflicts",
      "add verified item with project runner",
    ],
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const config = JSON.parse(
      fs.readFileSync(
        path.join(path.resolve(process.argv[2] ?? process.cwd()), "components.json"),
        "utf8"
      )
    )
    process.stdout.write(
      JSON.stringify(
        inspectRegistry(config, process.argv[3] ?? "premium", process.env, {
          version: process.argv[4] ?? "unknown",
        }),
        null,
        2
      ) + "\n"
    )
  } catch {
    process.stderr.write(
      "Registry inspection incomplete: check the workspace and components.json without printing credentials.\n"
    )
    process.exitCode = 1
  }
}
