"use client"

import { Button } from "@/components/ui/button"
import { MenuItem, MenuLabel, Menu, MenuTrigger } from "@/components/ui/menu"

export default function MenuDynamicDemo() {
  return (
    <MenuTrigger>
      <Button intent="outline">Open</Button>
      <Menu popover={{ placement: "bottom" }} items={categories}>
        {(item) => (
          <MenuItem id={item.slug}>
            <MenuLabel>{item.name}</MenuLabel>
          </MenuItem>
        )}
      </Menu>
    </MenuTrigger>
  )
}

const categories = [
  {
    name: "Technology",
    slug: "technology",
  },
  {
    name: "Health",
    slug: "health",
  },
  {
    name: "Business",
    slug: "business",
  },
  {
    name: "Travel",
    slug: "travel",
  },
  {
    name: "Education",
    slug: "education",
  },
  {
    name: "Entertainment",
    slug: "entertainment",
  },
  {
    name: "Sports",
    slug: "sports",
  },
  {
    name: "Fashion",
    slug: "fashion",
  },
  {
    name: "Food",
    slug: "food",
  },
  {
    name: "Science",
    slug: "science",
  },
]
