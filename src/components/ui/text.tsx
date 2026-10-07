import { cn } from "cn"
import { tv } from "tailwind-variants"
import { cx } from "@/lib/primitive"
import { Link } from "./link"

export function Text({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      data-slot="text"
      {...props}
      className={cn("text-base/6 text-muted-foreground sm:text-sm/6", className)}
    />
  )
}

export const textLinkStyles = tv({
  base: "text-primary-subtle-foreground decoration-primary-subtle-foreground/50 hover:underline hover:decoration-primary-subtle-foreground has-data-[slot=icon]:inline-flex has-data-[slot=icon]:items-center has-data-[slot=icon]:gap-x-1",
})

export function TextLink({ className, ...props }: React.ComponentPropsWithoutRef<typeof Link>) {
  return <Link {...props} className={cx(textLinkStyles(), className)} />
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<"strong">) {
  return <strong {...props} className={cn("font-medium", className)} />
}

export function Code({ className, ...props }: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={cn(
        "rounded-sm border bg-muted px-0.5 font-medium text-sm sm:text-[0.8125rem]",
        className
      )}
    />
  )
}
