"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AlertDialogDemo() {
  return (
    <DialogTrigger>
      <Button intent="danger">Revoke Access</Button>
      <Dialog role="alertdialog">
        <DialogHeader>
          <DialogTitle>Revoke User Access?</DialogTitle>
          <DialogDescription>
            This will immediately remove all access for the selected user. This action is permanent
            and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button intent="danger">Revoke Access</Button>
        </DialogFooter>
      </Dialog>
    </DialogTrigger>
  )
}
