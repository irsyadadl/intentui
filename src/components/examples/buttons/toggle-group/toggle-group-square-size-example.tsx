"use client"

import {
  ArchiveBoxIcon,
  BellAlertIcon,
  BellIcon,
  BugAntIcon,
  CameraIcon,
  CloudIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  DocumentIcon,
  DocumentTextIcon,
  EnvelopeOpenIcon,
  ExclamationTriangleIcon,
  MusicalNoteIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupSquareSizeDemo() {
  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <ToggleGroup aria-label="Notification options" size="sq-xs">
          <ToggleGroupItem id="bell" aria-label="Bell">
            <BellIcon />
          </ToggleGroupItem>
          <ToggleGroupItem id="alarm" aria-label="Alarm">
            <BellAlertIcon />
          </ToggleGroupItem>
          <ToggleGroupItem id="notification" aria-label="Notifications">
            <EnvelopeOpenIcon />
          </ToggleGroupItem>
          <ToggleGroupItem id="alert" aria-label="Alerts">
            <ExclamationTriangleIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <ToggleGroup aria-label="Developer tools" size="sq-sm">
          <ToggleGroupItem id="code" aria-label="Code">
            <CodeBracketIcon />
          </ToggleGroupItem>
          <ToggleGroupItem id="terminal" aria-label="Terminal">
            <CommandLineIcon />
          </ToggleGroupItem>
          <ToggleGroupItem id="bug" aria-label="Bug">
            <BugAntIcon />
          </ToggleGroupItem>
          <ToggleGroupItem id="settings" aria-label="Settings">
            <Cog6ToothIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <ToggleGroup aria-label="Media types" size="sq-md">
          <ToggleGroupItem id="image" aria-label="Images">
            <PhotoIcon />
          </ToggleGroupItem>
          <ToggleGroupItem id="camera" aria-label="Camera">
            <CameraIcon />
          </ToggleGroupItem>
          <ToggleGroupItem id="video" aria-label="Video">
            <VideoCameraIcon />
          </ToggleGroupItem>
          <ToggleGroupItem id="music" aria-label="Music">
            <MusicalNoteIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <ToggleGroup aria-label="File types" size="sq-lg">
          <ToggleGroupItem id="file" aria-label="Files">
            <DocumentIcon />
          </ToggleGroupItem>
          <ToggleGroupItem id="doc" aria-label="Documents">
            <DocumentTextIcon />
          </ToggleGroupItem>
          <ToggleGroupItem id="pdf" aria-label="PDFs">
            <CloudIcon />
          </ToggleGroupItem>
          <ToggleGroupItem id="archive" aria-label="Archive">
            <ArchiveBoxIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
