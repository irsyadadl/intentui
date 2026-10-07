"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  SheetClose,
  type SheetProps,
  Sheet,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { title } from "@/lib/utils"

type Position = NonNullable<SheetProps["position"]>
export default function SheetPositionDemo() {
  const [position, setPosition] = useState<Position>("left")
  const [isOpen, setIsOpen] = useState(false)

  const positions: Position[] = ["left", "right", "top", "bottom", "start", "end", "center"]

  const pressHandler = (position: Position, open: boolean) => {
    setPosition(position)
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
      <Sheet isOpen={isOpen} onOpenChange={setIsOpen} position={position}>
        <SheetHeader>
          <SheetTitle>{title(position)}</SheetTitle>
          <SheetDescription>The sheet is positioned at {position}.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose>Close</SheetClose>
        </SheetFooter>
      </Sheet>
    </>
  )
}
