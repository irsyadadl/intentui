import bash from "@shikijs/langs/bash"
import css from "@shikijs/langs/css"
import html from "@shikijs/langs/html"
import javascript from "@shikijs/langs/javascript"
import json from "@shikijs/langs/json"
import jsx from "@shikijs/langs/jsx"
import markdown from "@shikijs/langs/markdown"
import mdx from "@shikijs/langs/mdx"
import php from "@shikijs/langs/php"
import tsx from "@shikijs/langs/tsx"
import typescript from "@shikijs/langs/typescript"
import githubDark from "@shikijs/themes/github-dark"
import githubDarkDefault from "@shikijs/themes/github-dark-default"
import githubLight from "@shikijs/themes/github-light"
import { type CodeToHastOptions, createHighlighterCore } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

let highlighter: ReturnType<typeof createHighlighterCore> | undefined

export async function codeToHtml(code: string, options: CodeToHastOptions<string, string>) {
  highlighter ??= createHighlighterCore({
    langs: [bash, css, html, javascript, json, jsx, markdown, mdx, php, tsx, typescript],
    themes: [githubLight, githubDark, githubDarkDefault],
    engine: createJavaScriptRegexEngine(),
  })
  return (await highlighter).codeToHtml(code, options)
}
