import {
  IconArrowUp,
  IconBrandIntentui,
  IconColorPalette,
  IconColors,
  IconNotes,
  IconPackage,
  IconWindow,
  IconWindowVisit,
} from "@intentui/icons"

export const menus = [
  { href: "/docs/getting-started/introduction", label: "Docs", icon: IconNotes },
  { href: "/components", label: "Components", icon: IconPackage },
  { href: "/themes", label: "Themes", icon: IconColors },
  { href: "https://intentui.com/icons", label: "Icons", icon: IconArrowUp },
  { href: "https://intentui.com/colors", label: "Colors", icon: IconColorPalette },
  { href: "/blocks", label: "Blocks", icon: IconWindow },
  {
    href: "https://design.intentui.com",
    label: "Premium blocks",
    icon: IconBrandIntentui,
    external: true,
  },
  {
    href: "https://design.intentui.com/templates",
    label: "Templates",
    icon: IconWindowVisit,
    external: true,
  },
]
