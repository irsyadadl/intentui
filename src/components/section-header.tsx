import { cn } from "cn"

export function SectionHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("border-page bg-background space-y-2 py-6 sm:border-x sm:p-6", className)}
      {...props}
    />
  )
}

export type HeadingType = { level?: 2 | 3 } & React.ComponentPropsWithoutRef<"h2" | "h3">

export interface SectionTitleProps extends HeadingType {
  className?: string | undefined
}
export function SectionTitle({ className, level = 2, ...props }: SectionTitleProps) {
  const Element: `h${typeof level}` = `h${level}`
  return (
    <Element
      {...props}
      className={cn(
        "font-medium tracking-tighter text-balance",
        level === 2 && "max-w-lg text-3xl/10",
        level === 3 && "text-2xl/8",
        className
      )}
    />
  )
}

export function SectionDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn("block text-muted-foreground text-base/7 max-w-2xl", className)}
    ></p>
  )
}
