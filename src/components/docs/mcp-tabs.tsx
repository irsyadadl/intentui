"use client"

import { useState } from "react"
import type { Key } from "react-aria-components/Breadcrumbs"
import { CodeHighlighter } from "@/components/docs/code-highlighter"
import {
  Snippet,
  SnippetTab,
  SnippetTabPanel,
  SnippetTabPanels,
  SnippetTabsList,
} from "@/components/ui/snippet"

const commands = [
  {
    label: "Codex",
    id: "codex",
    code: "npx shadcn@latest mcp init --client codex",
  },
  {
    label: "Claude",
    id: "claude",
    code: "npx shadcn@latest mcp init --client claude",
  },
  {
    label: "Cursor",
    id: "cursor",
    code: "npx shadcn@latest mcp init --client cursor",
  },
  {
    label: "Gemini",
    id: "gemini",
    code: "gemini mcp add shadcn -- npx shadcn@latest mcp",
  },
  {
    label: "VS Code",
    id: "vscode",
    code: "npx shadcn@latest mcp init --client vscode",
  },
]

export function McpTabs() {
  const [tab, setTab] = useState<Key>("codex")
  return (
    <div className="mt-6">
      <Snippet
        className="border-border dark:border-muted-foreground/15 bg-background dark:bg-muted"
        onSelectionChange={setTab}
        selectedKey={tab}
      >
        <SnippetTabsList
          className="border-border dark:border-muted-foreground/15 bg-background dark:bg-muted"
          items={commands}
        >
          {(command) => <SnippetTab key={command.label}>{command.label}</SnippetTab>}
        </SnippetTabsList>

        <SnippetTabPanels items={commands}>
          {(command) => (
            <SnippetTabPanel className="bg-background dark:bg-muted">
              {command.code}
            </SnippetTabPanel>
          )}
        </SnippetTabPanels>
      </Snippet>
      <>
        {tab === "codex" && (
          <div className="mt-6">
            <p>
              Add the following to <code>~/.codex/config.toml</code>:
            </p>
            <CodeHighlighter
              className="mt-6"
              lang="toml"
              code={`[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]`}
            />
            {}
          </div>
        )}
      </>
    </div>
  )
}
