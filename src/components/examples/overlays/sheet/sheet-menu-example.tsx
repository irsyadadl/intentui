"use client"

import {
  ArrowRightStartOnRectangleIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  HeartIcon,
  PencilSquareIcon,
  SparklesIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Button as PrimitiveButton } from "react-aria-components/Button"
import { Checkbox, CheckboxField } from "@/components/ui/checkbox"
import { Description, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  DialogBody,
  DialogClose,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import {
  Sheet,
  SheetBody,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TextField } from "@/components/ui/text-field"
import { Link } from "@/components/ui/link"
import { dropdownItemStyles } from "@/components/ui/dropdown"

const menuGroups: {
  id: string
  items: { label: string; icon?: typeof UserIcon }[]
}[] = [
  {
    id: "account",
    items: [
      { label: "Your profile", icon: UserIcon },
      { label: "Your repositories", icon: BookOpenIcon },
      { label: "Copilot", icon: SparklesIcon },
      { label: "Your projects" },
      { label: "Your stars", icon: StarIcon },
      { label: "Your gists" },
      { label: "Your organizations" },
      { label: "Your enterprises" },
      { label: "Your sponsors", icon: HeartIcon },
    ],
  },
  {
    id: "settings",
    items: [{ label: "Feature preview" }, { label: "Settings", icon: Cog6ToothIcon }],
  },
  {
    id: "support",
    items: [
      { label: "GitHub Docs" },
      { label: "GitHub Support" },
      { label: "GitHub Community", icon: ChatBubbleLeftRightIcon },
    ],
  },
]

export default function SheetMenuDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const closeDialog = () => setIsOpen(false)
  return (
    <>
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <DialogHeader>
          <DialogTitle>Edit status</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PencilSquareIcon className="size-5" />
              <TextField>
                <Label>Status</Label>
                <Input placeholder="What's your status?" />
              </TextField>
            </div>
            <Select>
              <Label>Clear Status</Label>
              <SelectTrigger />
              <SelectContent>
                <SelectItem>Never</SelectItem>
                <SelectItem>in 30 Minutes</SelectItem>
                <SelectItem>in 1 Hour</SelectItem>
                <SelectItem>in 8 Hours</SelectItem>
                <SelectItem>after Today</SelectItem>
                <SelectItem>after a Week</SelectItem>
                <SelectItem>after a Month</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <Label>Visible to</Label>
              <SelectTrigger />
              <SelectContent>
                <SelectItem>Everyone</SelectItem>
                <SelectItem>Organization</SelectItem>
                <SelectItem>Public</SelectItem>
              </SelectContent>
            </Select>
            <CheckboxField>
              <Checkbox>Busy</Checkbox>
              <Description>
                When others mention you, assign you, or request your review, GitHub will let them
                know that you have limited availability.
              </Description>
            </CheckboxField>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose>Clear Status</DialogClose>
          <Button onPress={closeDialog}>Set Status</Button>
        </DialogFooter>
      </Dialog>
      <SheetTrigger>
        <PrimitiveButton aria-label="Open menu">
          <Avatar src="https://intentui.com/images/avatar/cobain.jpg" alt="irsyadadl" />
        </PrimitiveButton>
        <Sheet position="right" isFloat={false} closeButton={false}>
          <SheetHeader className="flex flex-row gap-x-3.5 border-b sm:gap-x-3 sm:px-4 sm:pt-3 sm:pb-2">
            <Avatar src="https://intentui.com/images/avatar/cobain.jpg" isSquare alt="cobain" />
            <div>
              <SheetTitle className="text-base/4 sm:text-base/4">Kurt Cobain</SheetTitle>
              <SheetDescription>@cobain</SheetDescription>
            </div>
          </SheetHeader>
          <SheetBody className="px-0 sm:px-0">
            <ul className="divide-y [&_li_ul]:p-4">
              {menuGroups.map((group) => (
                <li key={group.id}>
                  <ul className="grid grid-cols-[auto_1fr]">
                    {group.items.map(({ label, icon: Icon }) => (
                      <li key={label} className="col-span-full grid grid-cols-subgrid">
                        <Link href="#" className={dropdownItemStyles}>
                          {Icon && <Icon />}
                          <span slot="label" className="col-start-2">
                            {label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </SheetBody>
          <SheetFooter className="border-t bg-muted/20 sm:p-4">
            <Button size="sm" className="w-full justify-between" intent="secondary">
              <span>Sign out</span>
              <ArrowRightStartOnRectangleIcon />
            </Button>
          </SheetFooter>
        </Sheet>
      </SheetTrigger>
    </>
  )
}
