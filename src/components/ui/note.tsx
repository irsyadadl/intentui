import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid"
import { twJoin, cn } from "cn"

export interface NoteProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  intent?: "default" | "info" | "warning" | "danger" | "success"
  indicator?: boolean
}

export function Note({ indicator = true, intent = "default", className, ...props }: NoteProps) {
  const iconMap: Record<string, React.ElementType | null> = {
    info: InformationCircleIcon,
    warning: ExclamationCircleIcon,
    danger: ExclamationCircleIcon,
    success: CheckCircleIcon,
    default: null,
  }

  const IconComponent = iconMap[intent] || null

  return (
    <div
      data-slot="note"
      className={cn([
        "grid w-full grid-cols-[auto_1fr] overflow-hidden rounded-lg border border-current/15 p-4 text-base/6 backdrop-blur-2xl sm:text-sm/6",
        "*:[a]:hover:underline **:[strong]:font-medium",
        intent === "default" && "bg-muted/50 text-secondary-foreground",
        intent === "info" &&
          "bg-info-subtle text-info-subtle-foreground **:[.text-muted-foreground]:text-info-subtle-foreground/70",
        intent === "warning" &&
          "bg-warning-subtle text-warning-subtle-foreground **:[.text-muted-foreground]:text-warning-subtle-foreground/80",
        intent === "danger" &&
          "bg-danger-subtle text-danger-subtle-foreground **:[.text-muted-foreground]:text-danger-subtle-foreground/80",
        intent === "success" &&
          "bg-success-subtle text-success-subtle-foreground **:[.text-muted-foreground]:text-success-subtle-foreground/80",
        className,
      ])}
      {...props}
    >
      {IconComponent && indicator && (
        <div
          className={twJoin(
            "me-3 grid size-8 place-content-center rounded-full border-2",
            intent === "warning" && "border-warning-subtle-foreground/40",
            intent === "success" && "border-success-subtle-foreground/40",
            intent === "danger" && "border-danger-subtle-foreground/40",
            intent === "info" && "border-info-subtle-foreground/40"
          )}
        >
          <div
            className={twJoin(
              "grid size-6 place-content-center rounded-full border-2",
              intent === "warning" && "border-warning-subtle-foreground/85",
              intent === "success" && "border-success-subtle-foreground/85",
              intent === "danger" && "border-danger-subtle-foreground/85",
              intent === "info" && "border-info-subtle-foreground/85"
            )}
          >
            <IconComponent className="size-5 shrink-0" />
          </div>
        </div>
      )}
      <div className="text-pretty group-has-[svg]:col-start-2">{props.children}</div>
    </div>
  )
}
