import { cn } from "cn"

export function DescriptionList({ className, ref, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      ref={ref}
      className={cn(
        "grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,calc(var(--spacing)*80))_auto] sm:text-sm/6",
        className
      )}
      {...props}
    />
  )
}

export function DescriptionTerm({ className, ref, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      ref={ref}
      className={cn(
        "col-start-1 border-t pt-3 text-muted-foreground first:border-none sm:py-3",
        className
      )}
      {...props}
    />
  )
}

export function DescriptionDetails({ className, ...props }: React.ComponentProps<"dd">) {
  return (
    <dd
      {...props}
      data-slot="description-details"
      className={cn(
        "pt-1 pb-3 text-foreground sm:border-t sm:nth-2:border-none sm:py-3",
        className
      )}
    />
  )
}
