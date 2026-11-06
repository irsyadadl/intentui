"use client"

import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import {
  BellIcon as BellIconOutline,
  BookmarkIcon as BookmarkIconOutline,
  HeartIcon as HeartIconOutline,
  StarIcon as StarIconOutline,
} from "@heroicons/react/24/outline"
import {
  BellIcon as BellIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid"
export default function ToggleSizeDemo() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-wrap items-end gap-2">
        <Toggle intent="outline" size="xs">
          {({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}
        </Toggle>
        <Toggle intent="outline" size="sm">
          {({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}
        </Toggle>
        <Toggle intent="outline" size="md">
          {({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}
        </Toggle>
        <Toggle intent="outline" size="lg">
          {({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}
        </Toggle>
      </div>

      <Separator />
      <div className="flex flex-wrap items-end gap-2">
        <Toggle aria-label="Favorite" intent="outline" size="sq-xs">
          {({ isSelected }) => <>{isSelected ? <HeartIconSolid /> : <HeartIconOutline />}</>}
        </Toggle>
        <Toggle aria-label="Bookmark" intent="outline" size="sq-sm">
          {({ isSelected }) => <>{isSelected ? <BookmarkIconSolid /> : <BookmarkIconOutline />}</>}
        </Toggle>
        <Toggle aria-label="Notifications" intent="outline" size="sq-md">
          {({ isSelected }) => <>{isSelected ? <BellIconSolid /> : <BellIconOutline />}</>}
        </Toggle>
        <Toggle aria-label="Star" intent="outline" size="sq-lg">
          {({ isSelected }) => <>{isSelected ? <StarIconSolid /> : <StarIconOutline />}</>}
        </Toggle>
      </div>
    </div>
  )
}
