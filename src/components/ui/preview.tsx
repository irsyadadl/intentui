import { PreviewTrigger as PreviewTriggerPrimitive } from "react-aria-components/PreviewTrigger"
import { Popover, type PopoverProps } from "@/components/ui/popover"
import { cx } from "@/lib/primitive"

const PreviewTrigger = PreviewTriggerPrimitive
const Preview = ({ className, ...props }: PopoverProps) => {
  return <Popover className={cx("p-4 max-w-xs", className)} {...props} />
}

export { PreviewTrigger, Preview }
