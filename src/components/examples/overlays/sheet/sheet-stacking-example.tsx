"use client"

import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox, CheckboxField, CheckboxGroup } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Radio, RadioField, RadioGroup } from "@/components/ui/radio"
import {
  SheetTrigger,
  SheetBody,
  SheetClose,
  Sheet,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet"
import { TextField } from "@/components/ui/text-field"

export default function SheetStackingExample() {
  const [workspaceName, setWorkspaceName] = useState("Design studio")
  const [access, setAccess] = useState("invite-only")
  const [permissions, setPermissions] = useState(["comments", "downloads"])

  return (
    <SheetTrigger>
      <Button intent="secondary">Workspace settings</Button>
      <Sheet position="bottom" className="mx-auto h-96 max-w-lg">
        <SheetHeader
          title="Workspace settings"
          description="Set up your workspace and manage how your team collaborates."
        />
        <SheetBody className="gap-4">
          <TextField value={workspaceName} onChange={setWorkspaceName}>
            <Label>Workspace name</Label>
            <Input />
          </TextField>
          <SheetTrigger>
            <Button intent="secondary" className="self-start">
              Team access
              <ChevronRightIcon />
            </Button>
            <Sheet position="bottom" className="mx-auto h-96 max-w-lg">
              <SheetHeader
                title="Team access"
                description="Choose who can join. Close this sheet to return to your workspace."
              />
              <SheetBody className="gap-4">
                <RadioGroup value={access} onChange={setAccess}>
                  <Label>Who can join?</Label>
                  <RadioField value="invite-only">
                    <Radio>Invited people only</Radio>
                  </RadioField>
                  <RadioField value="domain">
                    <Radio>Anyone with your company email</Radio>
                  </RadioField>
                </RadioGroup>
                <SheetTrigger>
                  <Button intent="secondary" className="self-start">
                    Member permissions
                    <ChevronRightIcon />
                  </Button>
                  <Sheet position="bottom" className="mx-auto h-96 max-w-lg">
                    <SheetHeader
                      title="Member permissions"
                      description="Choose what members can do. Close this sheet to return to team access."
                    />
                    <SheetBody>
                      <CheckboxGroup value={permissions} onChange={setPermissions}>
                        <Label>Allow members to</Label>
                        <CheckboxField value="comments">
                          <Checkbox>Leave comments</Checkbox>
                        </CheckboxField>
                        <CheckboxField value="downloads">
                          <Checkbox>Download files</Checkbox>
                        </CheckboxField>
                        <CheckboxField value="invites">
                          <Checkbox>Invite teammates</Checkbox>
                        </CheckboxField>
                        <CheckboxField value="projects">
                          <Checkbox>Create projects</Checkbox>
                        </CheckboxField>
                      </CheckboxGroup>
                    </SheetBody>
                    <SheetFooter>
                      <SheetClose intent="primary">Back to team access</SheetClose>
                    </SheetFooter>
                  </Sheet>
                </SheetTrigger>
              </SheetBody>
              <SheetFooter>
                <SheetClose intent="primary">Back to workspace</SheetClose>
              </SheetFooter>
            </Sheet>
          </SheetTrigger>
        </SheetBody>
        <SheetFooter>
          <SheetClose intent="primary">Done</SheetClose>
        </SheetFooter>
      </Sheet>
    </SheetTrigger>
  )
}
