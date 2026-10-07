"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal"
import { TextField } from "@/components/ui/text-field"

export default function ModalDemo() {
  return (
    <ModalTrigger>
      <Button intent="outline">Rename</Button>
      <Modal>
        {({ close }) => (
          <>
            <ModalHeader>
              <ModalTitle>Rename project</ModalTitle>
              <ModalDescription>
                Change how this project will appear across the dashboard.
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <TextField aria-label="Name">
                <Input placeholder="Enter a name" />
              </TextField>
            </ModalBody>
            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button onPress={close} intent="primary">
                Save changes
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </ModalTrigger>
  )
}
