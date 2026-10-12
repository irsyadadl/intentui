# v4-only compatibility guard

Design Intent UI targets v4 exclusively. Establish compatibility for the consuming project once, then retain that evidence for this task. Reinspect only changed components or newly selected dependency closures; do not rescan the entire project for every search.

Verify local DialogTrigger/Dialog, SheetTrigger/Sheet, MenuTrigger/Menu, TooltipTrigger/Tooltip and foreground/background theme variables against [v4 source](https://github.com/irsyadadl/intentui/tree/4.x/src/components/ui) and its matching examples. Use installed customized exports/types first. Read relevant component rules from intentui when installed; this skill does not require its sibling files.

For a v3 project, explain that Design requires v4 and offer intentui-migrate for a separately requested upgrade/audit. Do not install v4 public components from @irsyad into v3, downgrade premium blocks, generate v3 commercial variants or automatically migrate the application. For mixed projects identify the incompatible affected wrappers/tokens, not just a generic warning; require a compatible dependency closure before installing the selected resource.

Inspect actual registry files and dependencies. Old modal/context-menu imports, ModalContent, SheetContent/MenuContent/PopoverContent/TooltipContent and -fg tokens indicate a resource needing source verification. Report stale commercial items with their actual addresses. Prefer an already compatible candidate; an authorized local v4 correction is possible only after verified mappings and review. It does not establish that the published resource is v4-compatible.

Preserve @irsyad configuration/credentials during migration. An additional @intentui entry is not required. No automatic namespace removal or endpoint change.
