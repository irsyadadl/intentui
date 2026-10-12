import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "intentui-skills-cli-"))
const names = ["intentui", "intentui-design", "intentui-migrate"]
const source = path.join(temp, "repository-export")
fs.mkdirSync(source)
fs.mkdirSync(path.join(source, "skills"))
for (const name of names)
  fs.cpSync(path.join(root, "skills", name), path.join(source, "skills", name), { recursive: true })
const env = { ...process.env, DISABLE_TELEMETRY: "1", DO_NOT_TRACK: "1" }
function cli(args, cwd) {
  return execFileSync("npx", ["--yes", "skills", ...args], {
    cwd,
    env,
    encoding: "utf8",
    timeout: 60000,
    stdio: ["ignore", "pipe", "pipe"],
  })
}
function files(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? files(path.join(directory, entry.name))
        : [path.join(directory, entry.name)]
    )
}
function verify(cwd, selected) {
  const directory = path.join(cwd, ".agents/skills")
  assert.deepEqual(fs.readdirSync(directory).sort(), [...selected].sort())
  for (const name of selected) {
    for (const file of files(path.join(source, "skills", name))) {
      const relative = path.relative(path.join(source, "skills"), file)
      assert.equal(
        fs.readFileSync(path.join(directory, relative), "utf8"),
        fs.readFileSync(file, "utf8"),
        `Missing or changed installed resource ${relative}`
      )
    }
  }
}
try {
  const listing = cli(["add", source, "--list"], temp)
  assert.ok(listing.includes("Found 3 skills"))
  for (const name of names) assert.ok(listing.includes(name))
  const all = path.join(temp, "all-skills")
  fs.mkdirSync(all)
  cli(["add", source, "--skill", ...names, "--agent", "codex", "--copy", "--yes"], all)
  verify(all, names)
  for (const name of names) {
    const cwd = path.join(temp, `${name}-only`)
    fs.mkdirSync(cwd)
    cli(["add", source, "--skill", name, "--agent", "codex", "--copy", "--yes"], cwd)
    verify(cwd, [name])
  }
  const version = cli(["--version"], temp).trim()
  process.stdout.write(
    `PASS Skills CLI ${version}: root skills/ discovery, all three installed, each skill installed alone, every reference/helper copied unchanged. Temporary projects removed.\n`
  )
} finally {
  fs.rmSync(temp, { recursive: true, force: true })
}
