"use client"

import { useEffect, useState } from "react"

import { codeToHtml } from "shiki"
import { cn } from "cn"
import { app } from "@/config/app"

export interface CodeHighlighterProps {
  plain?: boolean
  lang?: string
  code: string
  max96?: boolean
  className?: string
}

export const CodeHighlighter = ({
  max96 = true,
  plain = false,
  lang = "tsx",
  code,
  className,
  ...props
}: CodeHighlighterProps) => {
  const [loading, setLoading] = useState(false)
  const [formattedCode, setFormattedCode] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    const processCode = async () => {
      try {
        const file = await codeToHtml(code.trimEnd(), {
          lang: lang,
          themes: app.editorThemes,
        })
        setFormattedCode(String(file))
      } catch (err) {
        setError("Failed to process code. Please check the configuration.")
        console.error(err)
      }
    }
    processCode().then(() => setLoading(false))
  }, [code, lang])

  if (error) {
    return <p>Error: {error}</p>
  }

  return loading ? (
    <div />
  ) : (
    <div
      {...props}
      className={cn(
        "not-typeset scrollbar-thin overflow-auto font-mono **:[pre]:outline-hidden **:[pre]:*:[code]:text-sm/9",
        max96 && "max-h-96",
        !plain &&
          "rounded-lg border border-border dark:border-muted-foreground/15 bg-background dark:bg-muted px-4 py-2.5",
        className
      )}
      dangerouslySetInnerHTML={{ __html: formattedCode }}
    />
  )
}
