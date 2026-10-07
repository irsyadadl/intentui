"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function DialogControlledDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onPress={() => setOpen(true)} intent="primary">
        Subscribe
      </Button>
      <Dialog isOpen={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
          <DialogDescription>
            Get the latest news and updates right to your inbox.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onPress={() => setOpen(false)}>Sign Up</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
