# Overlays

Determine version from the actual affected component source, then read [v3 overlays](v3/overlays.md) or [v4 overlays](v4/overlays.md). v3 and v4 share names with different meanings; import renaming alone is unsafe.

Give Dialog/Sheet an accessible title or `aria-label`. Use the installed close components or children render function's `close`, preserve controlled open state, and test focus return, Escape, outside dismissal, nested overlays, and touch/keyboard behavior. Keep alert dialogs deliberately non-dismissable where required. Do not replace React Aria focus management with hand-rolled handlers.

v3 uses `Tooltip` → trigger control + `TooltipContent`. Current v4 uses `TooltipTrigger` → trigger control + `Tooltip`; timing/open state belong on TooltipTrigger, placement/appearance on Tooltip. TooltipContent is no longer exported in current v4. Tooltips need a focusable trigger; do not put essential information only in a tooltip. Context interactions differ by version. Drawer instructions from the old standalone skill are obsolete for the audited branches: no `drawer.tsx` exists there. Use the installed Sheet only when it meets the requested behavior; customized older Drawer files need direct inspection.
