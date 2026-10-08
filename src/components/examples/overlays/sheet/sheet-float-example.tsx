"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetFloatDemo() {
  return (
    <SheetTrigger>
      <Button intent="outline">Float</Button>
      <Sheet isFloat>
        <SheetHeader>
          <SheetTitle>Floating sheet</SheetTitle>
          <SheetDescription>This sheet floats with spacing from the screen edges.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose>Cancel</SheetClose>
          <Button intent="primary">Save</Button>
        </SheetFooter>
      </Sheet>
    </SheetTrigger>
  )
}
