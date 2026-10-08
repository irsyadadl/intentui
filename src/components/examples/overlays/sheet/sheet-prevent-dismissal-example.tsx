"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetContent,
} from "@/components/ui/sheet"

export default function SheetPreventDismissalExample() {
  return (
    <Sheet>
      <Button intent="outline">Review changes</Button>
      <SheetContent preventDismissal>
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
      </SheetContent>
    </Sheet>
  )
}
