"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TextField } from "@/components/ui/text-field"
import { Input } from "@/components/ui/input"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <DialogTrigger>
        <Button intent="outline">Rename</Button>
        <Dialog>
          {({ close }) => (
            <>
              <DialogHeader>
                <DialogTitle>Rename project</DialogTitle>
                <DialogDescription>
                  Change how this project will appear across the dashboard.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <TextField aria-label="Name">
                  <Input placeholder="Enter a name" />
                </TextField>
              </DialogBody>
              <DialogFooter>
                <DialogClose>Cancel</DialogClose>
                <Button onPress={close} intent="primary">
                  Save changes
                </Button>
              </DialogFooter>
            </>
          )}
        </Dialog>
      </DialogTrigger>
    </div>
  )
}
