# Component compatibility

Inspect installed UI source and CSS, not package metadata alone. v3 commonly has Modal/ModalContent, Sheet/SheetContent, Menu/MenuContent and `*-fg` tokens. v4 has DialogTrigger/Dialog, SheetTrigger/Sheet, MenuTrigger/Menu and `*-foreground` tokens. Confirm at least two signals and inspect the specific dependencies of the selected resource.

If the intentui skill is installed, consult its version-detection and relevant component/overlay rules. Independently, read the [3.x source](https://github.com/irsyadadl/intentui/tree/3.x/src/components/ui) and [4.x source](https://github.com/irsyadadl/intentui/tree/4.x/src/components/ui). Record mixed component families rather than imposing a global version.

Compare block imports/props, theme variables, React Aria APIs and package requirements to installed source. A block importing ModalContent is not ready for a v4 project merely because it comes from @irsyad. Prefer a compatible catalog item; when the requested integration authorizes a local conversion, adapt only that block with verified mappings and report the conversion. Explicit wider upgrade requests may use intentui-migrate. Preserve premium registry configuration and local customizations.

Do not automatically migrate the whole application, claim unverified v4 support for all commercial resources, or copy licensed implementation into public compatibility fixtures.
