import { Badge } from "@/components/ui/badge"

export function ApiParameters({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-typeset my-6 divide-y overflow-hidden rounded-lg border">{children}</div>
  )
}

export function ApiDescription({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/60 px-4 py-2 text-muted-foreground text-sm/6 [&_a]:text-primary-subtle-foreground [&_a]:underline-offset-4 [&_a]:hover:underline [&_code]:font-medium [&_code]:text-foreground [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-foreground">
      {children}
    </div>
  )
}

export function ApiReference({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/30 px-4 py-2 text-muted-foreground text-sm/5 [&_a]:text-primary-subtle-foreground [&_a]:underline-offset-4 [&_a]:hover:underline [&_p]:m-0">
      {children}
    </div>
  )
}

interface ApiParameterProps {
  name: string
  type: string
  required?: boolean
  defaultValue?: string
  children?: React.ReactNode
}

export function ApiParameter({ name, type, required, defaultValue, children }: ApiParameterProps) {
  return (
    <div className="p-4 text-xs">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <code className="bg-transparent p-0 font-medium">{name}</code>
        <code className="bg-transparent p-0 text-primary-subtle-foreground">{type}</code>
        {required !== undefined ? (
          <Badge intent={required ? "danger" : "secondary"}>
            {required ? "required" : "optional"}
          </Badge>
        ) : null}
      </div>
      {children ? <div className="mt-2 text-muted-foreground/6">{children}</div> : null}
      {defaultValue ? (
        <div className="mt-2 text-muted-foreground">
          Default: <code className="bg-transparent p-0 text-foreground">{defaultValue}</code>
        </div>
      ) : null}
    </div>
  )
}
