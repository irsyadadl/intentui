"use client"

import { TrashIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"
import {
  Popover,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { wait } from "@/lib/utils"

export default function PopoverControlledDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState<"idle" | "loading" | "success">("idle")

  const deleteAccount = async () => {
    setLoading("loading")
    await wait(3000)
    setLoading("success")

    await wait(2000)
    setLoading("idle")
    setIsOpen(false)
  }
  return (
    <PopoverTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button intent="danger">Delete Account</Button>
      <Popover aria-labelledby="" aria-label="Confirm deletion" className="sm:max-w-sm">
        <PopoverHeader>
          <PopoverTitle>Confirm Deletion</PopoverTitle>
          <PopoverDescription>
            Are you sure you want to delete your account? This action cannot be undone.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverFooter>
          <Button intent="outline" onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            isDisabled={loading === "loading"}
            onPress={deleteAccount}
            intent={["loading", "idle"].includes(loading) ? "danger" : "primary"}
          >
            {loading === "loading" ? (
              <>
                <Loader variant="spin" />
                Deleting...
              </>
            ) : loading === "success" ? (
              <>
                <CheckCircleIcon />
                Deleted
              </>
            ) : (
              <>
                <TrashIcon />
                Delete
              </>
            )}
          </Button>
        </PopoverFooter>
      </Popover>
    </PopoverTrigger>
  )
}
