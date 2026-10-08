"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetPreventDismissalExample() {
  return (
    <SheetTrigger>
      <Button intent="outline">Review changes</Button>
      <Sheet preventDismissal>
        <SheetHeader
          title="Review changes"
          description="Close this sheet using the button below."
        />
        <SheetBody>
          Clicking outside, pressing Escape, or swiping will keep this sheet open.
        </SheetBody>
        <SheetFooter>
          <SheetClose intent="primary">Done</SheetClose>
        </SheetFooter>
      </Sheet>
    </SheetTrigger>
  )
}
