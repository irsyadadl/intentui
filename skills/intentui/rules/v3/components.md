# v3 components

Use the installed source and the [3.x examples](https://github.com/irsyadadl/intentui/tree/3.x/src/components/examples) to verify composition. Shared Button usage:

```tsx
import { Button } from "@/components/ui/button"

export function SaveButton() {
  return (
    <Button intent="primary" type="submit">
      Save
    </Button>
  )
}
```

The `@/components/ui` import here is an example alias. Resolve it from the consuming project.

v3 has `modal.tsx`, `context-menu.tsx`, `MenuContent`, `SheetContent`, and `PopoverContent`. `Dialog` is the inner dialog primitive; it does not supply the v4 modal surface. See [overlays](overlays.md).
