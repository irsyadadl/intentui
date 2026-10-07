"use client"

import { PlusIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/field"
import { Input, InputGroup } from "@/components/ui/input"
import {
  DialogBody,
  DialogClose,
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TextField } from "@/components/ui/text-field"

export default function TextFieldSuffixButtonDemo() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <Dialog isOpen={open} onOpenChange={close}>
        <DialogHeader>
          <DialogTitle>New User</DialogTitle>
          <DialogDescription>Create a new user account</DialogDescription>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <TextField name="username">
            <Label>Username</Label>
            <Input placeholder="Username" />
          </TextField>
          <TextField name="email">
            <Label>Email</Label>
            <Input type="email" placeholder="Email" />
          </TextField>
        </DialogBody>
        <DialogFooter>
          <DialogClose intent="outline">Cancel</DialogClose>
          <Button onPress={close}>Continue</Button>
        </DialogFooter>
      </Dialog>
      <TextField>
        <Label>Username</Label>
        <InputGroup>
          <Input />
          <Button aria-label="New user" onPress={() => setOpen(true)} intent="secondary">
            <PlusIcon />
          </Button>
        </InputGroup>
      </TextField>
    </>
  )
}
