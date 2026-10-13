# v4 components

Use the relevant official v4 `.md` docs discovered through [llms.txt](https://intentui.com/llms.txt), then installed source to verify composition. The [4.x examples](https://github.com/irsyadadl/intentui/tree/4.x/src/components/examples) are fallback provenance under the entry point's source priority. Shared Button usage:

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

v4 removes `modal.tsx` and `context-menu.tsx`. `Dialog` supplies the modal surface; `Sheet` and `Menu` are content components with separate trigger wrappers. `MenuContent`, `SheetContent`, `PopoverContent`, and `PopoverTrigger` are not exported by their target files. Do not invent Drawer exports: inspect local source and registry availability. See [overlays](overlays.md).
