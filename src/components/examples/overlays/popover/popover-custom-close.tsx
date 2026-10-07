"use client"

import { useRef, useState } from "react"
import { Form } from "react-aria-components/Form"
import { Button } from "@/components/ui/button"
import { Checkbox, CheckboxField } from "@/components/ui/checkbox"
import { FieldError, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "@/components/ui/link"
import {
  Popover,
  PopoverBody,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover"
import { TextField } from "@/components/ui/text-field"

export default function PopoverCustomClose() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onPress={() => setIsOpen(true)}
      >
        Login
      </Button>
      <Popover
        aria-label="Login"
        triggerRef={triggerRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="w-full min-w-96"
      >
        <PopoverHeader>
          <PopoverTitle>Login</PopoverTitle>
          <PopoverDescription>Enter your credentials to sign in.</PopoverDescription>
        </PopoverHeader>
        <Form
          onSubmit={(event) => {
            event.preventDefault()
            setIsOpen(false)
          }}
          className="overflow-auto"
        >
          <PopoverBody>
            <div className="space-y-4">
              <TextField autoFocus isRequired>
                <Label>Email</Label>
                <Input type="email" placeholder="Enter your email" />
              </TextField>
              <TextField isRequired>
                <Label>Password</Label>
                <Input type="password" placeholder="Enter your password" />
                <FieldError />
              </TextField>
              <div className="flex items-center justify-between">
                <CheckboxField name="remember-me">
                  <Checkbox>Remember me</Checkbox>
                </CheckboxField>
                <Link
                  className="text-base/6 text-primary-subtle-foreground hover:underline sm:text-sm/6"
                  href="#"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </PopoverBody>
          <PopoverFooter>
            <Button intent="plain" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Login</Button>
          </PopoverFooter>
        </Form>
      </Popover>
    </>
  )
}
