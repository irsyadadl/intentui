"use client"

import { useState } from "react"
import { Form } from "react-aria-components/Form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/field"
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
import { Textarea } from "@/components/ui/textarea"

export default function DialogNestedDemo() {
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false)
  const [isProfileSetupDialogOpen, setIsProfileSetupDialogOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  return (
    <>
      <Button intent="outline" onPress={() => setIsRegistrationDialogOpen(true)}>
        Register
      </Button>

      <Dialog
        isOpen={isRegistrationDialogOpen}
        onOpenChange={() => setIsRegistrationDialogOpen(false)}
        aria-label="Confirm Registration"
      >
        <DialogHeader>
          <DialogTitle>Confirm Registration</DialogTitle>
          <DialogDescription>Please confirm your registration details.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button
            onPress={() => {
              setIsProfileSetupDialogOpen(true)
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        isOpen={isProfileSetupDialogOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen && isTyping) {
            toast("Profile setup incomplete")
          }
          setIsProfileSetupDialogOpen(isOpen)
        }}
        aria-label="Profile Setup"
      >
        <DialogHeader>
          <DialogTitle>Set Up Your Profile</DialogTitle>
          <DialogDescription>
            We need a bit more information before you can get started.
          </DialogDescription>
        </DialogHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            toast.success("Profile setup complete")
            setIsProfileSetupDialogOpen(false)
            setIsRegistrationDialogOpen(false)
          }}
        >
          <DialogBody className="space-y-4">
            <TextField>
              <Label>Bio</Label>
              <Textarea
                placeholder="Tell us something about yourself"
                onInput={() => setIsTyping(true)}
              />
            </TextField>
          </DialogBody>
          <DialogFooter>
            <DialogClose>Skip for now</DialogClose>
            <Button type="submit">Complete Setup</Button>
          </DialogFooter>
        </Form>
      </Dialog>
    </>
  )
}
