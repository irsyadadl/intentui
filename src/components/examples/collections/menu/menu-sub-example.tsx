"use client"

import { Button } from "@/components/ui/button"
import {
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuSubMenu,
  Menu,
  MenuTrigger,
} from "@/components/ui/menu"

export default function MenuSubDemo() {
  return (
    <MenuTrigger>
      <Button intent="outline">Open</Button>
      <Menu popover={{ placement: "bottom" }}>
        <MenuItem>
          <MenuLabel>Dashboard</MenuLabel>
        </MenuItem>
        <MenuItem>
          <MenuLabel>Reports</MenuLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuSubMenu>
          <MenuItem>
            <MenuLabel>Settings</MenuLabel>
          </MenuItem>
          <Menu>
            <MenuItem>
              <MenuLabel>General</MenuLabel>
            </MenuItem>
            <MenuItem>
              <MenuLabel>Security</MenuLabel>
            </MenuItem>
            <MenuSeparator />
            <MenuSubMenu>
              <MenuItem>
                <MenuLabel>Privacy</MenuLabel>
              </MenuItem>
              <Menu>
                <MenuItem>
                  <MenuLabel>Data Sharing</MenuLabel>
                </MenuItem>
                <MenuItem>
                  <MenuLabel>Cookies</MenuLabel>
                </MenuItem>
                <MenuSeparator />
                <MenuSubMenu>
                  <MenuItem>
                    <MenuLabel>Advanced</MenuLabel>
                  </MenuItem>
                  <Menu>
                    <MenuItem>
                      <MenuLabel>Encryption</MenuLabel>
                    </MenuItem>
                    <MenuItem>
                      <MenuLabel>Access Logs</MenuLabel>
                    </MenuItem>
                    <MenuItem>
                      <MenuLabel>API Keys</MenuLabel>
                    </MenuItem>
                  </Menu>
                </MenuSubMenu>
              </Menu>
            </MenuSubMenu>
          </Menu>
        </MenuSubMenu>
        <MenuItem>
          <MenuLabel>Help</MenuLabel>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
