"use client"

import {
  BookOpenIcon,
  CubeIcon,
  HeartIcon,
  HomeIcon,
  Squares2X2Icon,
  SwatchIcon,
} from "@heroicons/react/24/outline"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useState } from "react"
import { Link } from "react-aria-components/Link"
import { twJoin, cn } from "cn"
import { Aside, AsideLink } from "@/components/docs/aside"
import { BrandDiscordIcon } from "@/components/icons/brand-discord-icon"
import { BrandGithubIcon } from "@/components/icons/brand-github-icon"
import { BrandXIcon } from "@/components/icons/brand-x-icon"
import { Button } from "@/components/ui/button"
import { Sheet, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { app } from "@/config/app"
import { Logo } from "@/components/logo"

export const menus = [
  {
    href: "/docs/getting-started/introduction",
    label: "Docs",
    icon: BookOpenIcon,
  },
  { href: "/components", label: "Components", icon: CubeIcon },
  { href: "/blocks", label: "Blocks", icon: Squares2X2Icon },
  { href: "/sponsor", label: "Sponsor", icon: HeartIcon },
  { href: "/showcase", label: "Showcase", icon: Squares2X2Icon },
  { href: "/colors", label: "Colors", icon: SwatchIcon },
  { href: "https://design.intentui.com/themes", label: "Themes", on: true },
  {
    href: "https://design.intentui.com/?utm_source=intentui.com&utm_medium=referral&utm_campaign=navprobutton",
    label: "Design.",
    on: true,
    icon: Logo,
  },
]

interface ResponsiveNavigationProps {
  className?: string
}

export function ResponsiveNavigation({ className }: ResponsiveNavigationProps) {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const scrollDecorationOpacity = useTransform(scrollY, [0, 16], [0, 1])
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])
  return (
    <nav
      className={cn(
        "sticky top-0 z-40 flex items-center bg-background px-2 py-2 lg:hidden",
        pathname === "/" && "bg-background",
        className
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 border-page border-b shadow-sm"
        style={{ opacity: scrollDecorationOpacity }}
      />
      <div className="flex items-center gap-x-2">
        <Logo />
        <Link href="/" className="font-semibold text-base text-foreground">
          Intent <span className="text-muted-foreground">UI</span>
        </Link>
      </div>
      <div className="flex-1" aria-hidden />
      <div className="flex items-center gap-x-0.5">
        <SheetTrigger isOpen={open} onOpenChange={setOpen}>
          <Button size="sq-sm" intent="plain" className="pressed:bg-transparent outline-hidden">
            <span className="relative flex h-8 w-(--width) items-center justify-center [--width:--spacing(4.5)]">
              <span className="relative size-(--width)">
                <span
                  className={twJoin(
                    "absolute left-0 block h-0.5 w-(--width) bg-foreground transition-all duration-100",
                    open ? "top-[0.4rem] -rotate-45" : "top-1"
                  )}
                />
                <span
                  className={twJoin(
                    "absolute left-0 block h-0.5 w-(--width) bg-foreground transition-all duration-100",
                    open ? "top-[0.4rem] rotate-45" : "top-[--spacing(2.6)]"
                  )}
                />
              </span>
              <span className="sr-only">Toggle Menu</span>
            </span>
          </Button>
          <Sheet
            position="right"
            isFloat={false}
            aria-label="Navigation"
            className="w-[min(22rem,90vw)] sm:max-w-88 **:data-[slot=dialog]:h-full **:data-[slot=dialog]:max-h-full [--visual-viewport-vertical-padding:0px]"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-x-3">
                <Logo />{" "}
                <span>
                  Intent <span className="text-muted-foreground">UI</span>
                </span>
              </SheetTitle>
            </SheetHeader>
            <Aside
              onNavigate={() => setOpen(false)}
              className="relative min-h-0 flex-1 h-auto sm:top-auto sm:h-auto sm:w-full [&>[data-docs-sidebar-scroll]]:py-6"
            >
              <AsideLink href="/" onPress={() => setOpen(false)}>
                <HomeIcon />
                Home
              </AsideLink>
              {menus
                .filter((menu) => !["Components", "Blocks", "Themes"].includes(menu.label))
                .map((menu) => (
                  <AsideLink
                    key={menu.href}
                    href={menu.href}
                    target={menu.on ? "_blank" : undefined}
                    onPress={() => setOpen(false)}
                  >
                    {menu.icon && <menu.icon />}
                    {menu.label}
                  </AsideLink>
                ))}
            </Aside>
            <SheetFooter className="p-2 border-t bg-background/60">
              <ul className="rounded-lg mt-2 p-2 bg-overlay border">
                <AsideLink href={app.links.twitter} target="_blank" onPress={() => setOpen(false)}>
                  <BrandXIcon /> Twitter
                </AsideLink>
                <AsideLink href={app.links.discord} target="_blank" onPress={() => setOpen(false)}>
                  <BrandDiscordIcon /> Discord
                </AsideLink>
                <AsideLink href={app.links.github} target="_blank" onPress={() => setOpen(false)}>
                  <BrandGithubIcon /> Github
                </AsideLink>
              </ul>
            </SheetFooter>
          </Sheet>
        </SheetTrigger>
      </div>
    </nav>
  )
}
