"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Size = Pick<React.ComponentProps<typeof Dialog>, "size">["size"]
const sizes: Size[] = [
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "fullscreen",
]
export default function DialogSizeDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogSize, setDialogSize] = useState<Size>("md")

  const handlePress = (size: Size, open: boolean) => {
    setDialogSize(size)
    setIsOpen(open)
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {sizes.map((size, idx) => (
          <div key={idx}>
            <Button intent="outline" onPress={() => handlePress(size, true)}>
              Open {size}
            </Button>
          </div>
        ))}
      </div>

      <Dialog isOpen={isOpen} onOpenChange={setIsOpen} size={dialogSize}>
        <DialogHeader>
          <DialogTitle>Project Update</DialogTitle>
          <DialogDescription>
            Dive deep into our project’s latest updates where we've streamlined workflow and
            improved user interfaces.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
          <Button onPress={() => setIsOpen(false)}>Confirm</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
