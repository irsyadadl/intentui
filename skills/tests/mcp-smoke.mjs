import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "intentui-shadcn-mcp-"))
const client = new Client({ name: "intentui-skills-validation", version: "1.0.0" })
fs.writeFileSync(
  path.join(directory, "components.json"),
  JSON.stringify({
    $schema: "https://ui.shadcn.com/schema.json",
    style: "default",
    rsc: false,
    tsx: true,
    tailwind: { config: "", css: "app.css", baseColor: "zinc", cssVariables: true },
    aliases: { components: "@/components", utils: "@/lib/utils", ui: "@/components/ui" },
    registries: {
      "@irsyad": {
        url: "https://design.intentui.com/r/{name}",
        headers: { Authorization: "Bearer ${REGISTRY_TOKEN}" },
      },
    },
  })
)
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [path.join(root, "node_modules/shadcn/dist/index.js"), "mcp", "--cwd", directory],
  cwd: directory,
  stderr: "pipe",
})
try {
  await client.connect(transport)
  const { tools } = await client.listTools()
  const required = [
    "get_project_registries",
    "list_items_in_registries",
    "search_items_in_registries",
    "view_items_in_registries",
    "get_item_examples_from_registries",
    "get_add_command_for_items",
  ]
  for (const name of required)
    assert.ok(
      tools.some((tool) => tool.name === name),
      `Missing tool ${name}`
    )
  const search = tools.find((tool) => tool.name === "search_items_in_registries")
  assert.equal(search.inputSchema.properties.registries.type, "array")
  assert.equal(search.inputSchema.properties.query.type, "string")
  const response = await client.callTool({ name: "get_project_registries", arguments: {} })
  assert.ok(!response.isError)
  const text = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
  assert.ok(text.includes("@irsyad") && !text.includes("@intentui"))
  const command = await client.callTool({
    name: "get_add_command_for_items",
    arguments: { items: ["@irsyad/button"] },
  })
  assert.ok(!command.isError)
  assert.ok(
    command.content.some((block) => block.type === "text" && block.text.includes("@irsyad/button"))
  )
  process.stdout.write(
    "PASS actual shadcn MCP: six registry tools, search schema, local namespace discovery, installation command. No registry fetch or premium install.\n"
  )
} finally {
  await client.close()
  await transport.close()
  fs.rmSync(directory, { recursive: true, force: true })
}
