# Breaking changes and dependency review

Read [components](components.md) and [themes](themes.md) for verified transformations. Upstream branch source takes precedence over an old catalog or this reference if it changes.

- Removed modules: `modal.tsx` and `context-menu.tsx`. Update all consumers and type-only imports before removal.
- Removed/redefined exports: Modal family, MenuContent/MenuContentProps/menuContentStyles/MenuTriggerProps, SheetContent/SheetContentProps, PopoverContent/PopoverContentProps/PopoverTrigger. DialogTrigger, MenuTrigger, Sheet and Popover retain names with changed roles. Do not rely on names alone.
- Sheet surface becomes SheetProps, includes swipeAnimation/swipeAnimationRange from the React Aria Sheet primitive; isFloat defaults to false instead of true. `position` remains the side-selection prop. v4 forwards logical start/end to React Aria rather than resolving them in the wrapper. Review snap point ranges, prevented dismissal and reduced motion.
- Dialog now supplies ModalOverlay/Modal internally. Existing direct primitive Dialog consumers, nested Dialog uses, and custom portal/layout behavior require review. Alert dialogs and `closeButton` settings need interaction tests.
- Menu trigger button props move onto an actual Button; open-state props remain on the trigger container. Surface selection/items/action props move from MenuContent onto Menu.
- SelectContent and ComboBoxContent retain consumer names but depend internally on the new Popover. Update their dependency closure if changing Popover; also review CommandMenu, Navbar and Sidebar overlay consumers. Do not assume only files with renamed exports are affected.
- Audited branch diffs show shared form and collection wrappers mostly retain their public structure while colors and overlay dependencies change. Installed React Aria versions may use different selection props: verify their `.d.ts` and matching upstream consumers. No universal selectedKey-to-value transform is justified by this branch diff.
- Existing Drawer guidance is not a verified upstream mapping: neither audited branch includes a UI drawer file. Preserve and inspect customized historical implementations rather than deleting them.

Compare npm dependencies and registryDependencies for the selected targets. Inspect react-aria-components and required subpath exports (especially Sheet), React, Tailwind v4 plugin/animations, cn, tailwind-variants, motion where used, icons, hooks and primitives. Use the project's package manager and lockfile; do not install arbitrary latest versions as a migration shortcut. No new base library, custom MCP server, or namespace switch is required.

Review locally altered props, render functions, CSS/data slots, ref forwarding, focus restoration, dismissal, gestures and collection behavior. Classify mechanical token changes separately from structural/behavioral changes. Safe automation requires matching the expected v3 shape; customized or mixed files require source-aware review.
