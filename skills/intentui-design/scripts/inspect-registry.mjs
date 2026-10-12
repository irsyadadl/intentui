import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export function inspectRegistry(config, purpose = "premium", environment = {}) {
  if (!["premium", "public"].includes(purpose)) throw new Error("Purpose must be premium or public")
  const namespace = purpose === "premium" ? "@irsyad" : "@intentui"
  const registry = config.registries?.[namespace]
  if (!registry)
    return { namespace, status: "missing-registry", configured: false, authenticated: false }
  const url = typeof registry === "string" ? registry : registry.url
  if (typeof url !== "string" || !url.includes("{name}"))
    return { namespace, status: "incomplete-registry-url", configured: false, authenticated: false }
  if (purpose === "public")
    return { namespace, status: "configured", configured: true, authenticated: false }
  const header = typeof registry === "object" ? registry.headers?.Authorization : null
  const match =
    typeof header === "string" ? /^Bearer\s+\$\{([A-Za-z_][A-Za-z0-9_]*)\}$/.exec(header) : null
  if (!match)
    return {
      namespace,
      status: header ? "unsafe-or-unsupported-auth" : "missing-auth-header",
      configured: true,
      authenticated: false,
    }
  const variable = match[1]
  if (/^(NEXT_PUBLIC_|VITE_)/.test(variable))
    return { namespace, status: "frontend-secret-variable", configured: true, authenticated: false }
  const available =
    typeof environment[variable] === "string" && environment[variable].trim().length > 0
  return {
    namespace,
    status: available ? "ready-to-verify-access" : "variable-unavailable-in-process",
    variable,
    configured: true,
    variableAvailable: available,
    authenticated: false,
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
      JSON.stringify(inspectRegistry(config, process.argv[3] ?? "premium", process.env), null, 2) +
        "\n"
    )
  } catch {
    process.stderr.write(
      "Registry inspection incomplete: check the workspace and components.json without printing credentials.\n"
    )
    process.exitCode = 1
  }
}
