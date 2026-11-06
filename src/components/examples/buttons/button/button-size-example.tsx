"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  AdjustmentsHorizontalIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"

export default function ButtonSizeDemo() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-wrap items-end gap-2">
        <Button intent="secondary" size="xs">
          Label
        </Button>
        <Button intent="secondary" size="sm">
          Label
        </Button>
        <Button intent="secondary">Label</Button>
        <Button intent="secondary" size="lg">
          Label
        </Button>
      </div>
      <Separator />
      <div className="flex flex-wrap items-end gap-2">
        <Button intent="secondary" size="sq-xs" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button intent="secondary" size="sq-sm" aria-label="Edit">
          <PencilIcon />
        </Button>
        <Button intent="secondary" size="sq-md" aria-label="Adjust">
          <AdjustmentsHorizontalIcon />
        </Button>
        <Button intent="secondary" size="sq-lg" aria-label="Delete">
          <TrashIcon />
        </Button>
      </div>
    </div>
  )
}
