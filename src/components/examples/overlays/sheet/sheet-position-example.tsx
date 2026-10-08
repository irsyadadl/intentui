"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  type SheetContentProps,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { title } from "@/lib/utils"

type Position = NonNullable<SheetContentProps["position"]>
export default function SheetPositionDemo() {
  const [sheetPosition, setSheetPosition] = useState<Position>("bottom")
  const [isOpen, setIsOpen] = useState(false)

  const positions: Position[] = ["bottom", "top", "left", "right", "start", "end", "center"]

  const pressHandler = (position: Position, open: boolean) => {
    setSheetPosition(position)
    setIsOpen(open)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {positions.map((position) => (
          <Button intent="outline" onPress={() => pressHandler(position, true)} key={position}>
            {title(position)}
          </Button>
        ))}
      </div>
      <SheetContent isOpen={isOpen} onOpenChange={setIsOpen} position={sheetPosition}>
        <SheetHeader>
          <SheetTitle>{title(sheetPosition)}</SheetTitle>
          <SheetDescription>The sheet opens at the {sheetPosition} position.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </>
  )
}
