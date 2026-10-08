"use client"

import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetBody, SheetClose, Sheet, SheetHeader } from "@/components/ui/sheet"

const itinerary = [
  { time: "09:00", title: "Coffee at the studio", description: "Meet the team and plan the day." },
  { time: "10:00", title: "Design workshop", description: "Explore ideas for the next release." },
  {
    time: "12:00",
    title: "Lunch together",
    description: "Take a break at our favorite local spot.",
  },
  { time: "14:00", title: "Prototype review", description: "Walk through the new interactions." },
  {
    time: "16:00",
    title: "Team retrospective",
    description: "Share what worked and what to improve.",
  },
  { time: "17:00", title: "Wrap up", description: "Capture next steps before heading home." },
]

export default function SheetSnapPointsExample() {
  return (
    <SheetTrigger>
      <Button intent="outline">View itinerary</Button>
      <Sheet
        position="bottom"
        snapPoints={["50%", "100%"]}
        className="group/itinerary mx-auto h-[80dvh] max-w-lg"
      >
        <SheetHeader
          title="Team day itinerary"
          description="Swipe up to see the full schedule, or down to collapse or dismiss."
        />
        <SheetBody className="overflow-hidden group-data-expanded/itinerary:overflow-auto">
          <ol className="divide-y divide-border">
            {itinerary.map((event) => (
              <li key={event.time} className="flex gap-4 py-5">
                <span className="w-12 shrink-0 text-muted-foreground text-sm tabular-nums">
                  {event.time}
                </span>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-muted-foreground text-sm">{event.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="py-4">
            <SheetClose intent="secondary" className="w-full">
              Done
            </SheetClose>
          </div>
        </SheetBody>
      </Sheet>
    </SheetTrigger>
  )
}
