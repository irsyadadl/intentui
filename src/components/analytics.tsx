"use client"
import { configure } from "onedollarstats"
import { useEffect } from "react"

export function Analytics() {
  useEffect(() => {
    configure({ hostname: "intentui.com", devmode: false })
  }, [])

  return null
}
