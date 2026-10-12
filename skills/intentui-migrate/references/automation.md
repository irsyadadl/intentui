# Narrow migration automation

The [codemod](../scripts/migrate.mjs) resolves TypeScript and PostCSS from the consuming project's installed dependencies. It has no framework/service dependency and works after independent skill installation. Install missing development tools with the project's package manager only when authorized; otherwise use manual mappings.

Default is read-only preview. Provide explicit files within the consuming project, not a directory or glob expansion over the whole app:

```bash
node <installed-skill>/scripts/migrate.mjs --project /path/to/app --tokens resources/js/pages/settings.tsx resources/css/app.css
node <installed-skill>/scripts/migrate.mjs --project /path/to/app --modal resources/js/pages/rename.tsx
```

Review the reported files, transformations, skipped shapes and source; rerun with `--write` only within the requested migration scope. Each file includes a unified code `diff` with three lines of context (Git is required), transformation counts and skipped shapes. Unchanged files have an empty diff. Modal edits change only import names, the module suffix and binding references; unrelated TSX formatting and comments remain intact. Before writing, all inputs are parsed and checked for concurrent edits. Secrets, registry config and lockfiles are protected; no wrapper overwrite or namespace edits occur. Repeating a completed transformation produces no changes.

- **Semantic tokens:** only static className string literals/expressions are transformed in TSX; ordinary text, identifiers and URLs are untouched. Dynamic templates are flagged for manual review. CSS uses declaration ASTs and a quote/comment-aware var() scanner to rename exact semantic variables and `var()` references, preserving values/comments/quoted text. See [theme mapping](themes.md).
- **Modal:** only named local modal imports with known exports and an unambiguous Modal → direct imported Button + ModalContent shape are automated. Imports/JSX binding names are updated to DialogTrigger/Dialog/dialog children; aliases and customized content/styles are preserved. Collisions, shadowing, namespace/default/type imports, ModalTrigger buttons, non-JSX binding use, spreads, conditional/custom triggers and unpaired surfaces are explicitly skipped. No generated whole-library replacement is performed.
- **Manual:** Sheet, Menu, Context Menu and Popover structural conversions still require the verified [component mappings](components.md). Their changing trigger/state/positioning behavior makes a broad automated rename unsafe. Dynamic class builders outside className also need targeted inspection.

Preview does not typecheck or prove behavior. Run the consuming project's TypeScript/lint/build and affected interaction tests afterwards, review skips, and confirm preserved customizations. Audit mode uses dry-run only. A successful codemod is not a full-app upgrade.
