# Semantic theme migration

Audited all color aliases in `src/stubs/installation/main.css.stub` on both branches. Each row maps token suffix, raw CSS variable, and the Tailwind `--color-*` alias. Prefix utilities as appropriate: `bg-bg` → `bg-background`, `text-fg` → `text-foreground`, `text-muted-fg` → `text-muted-foreground`, `text-primary-fg` → `text-primary-foreground`, `bg-overlay` stays unchanged.

| v3 token             | v4 token                     | v3 CSS variable        | v4 CSS variable                |
| -------------------- | ---------------------------- | ---------------------- | ------------------------------ |
| `border`             | `border`                     | `--border`             | `--border`                     |
| `input`              | `input`                      | `--input`              | `--input`                      |
| `ring`               | `ring`                       | `--ring`               | `--ring`                       |
| `bg`                 | `background`                 | `--bg`                 | `--background`                 |
| `fg`                 | `foreground`                 | `--fg`                 | `--foreground`                 |
| `card`               | `card`                       | `--card`               | `--card`                       |
| `card-fg`            | `card-foreground`            | `--card-fg`            | `--card-foreground`            |
| `primary`            | `primary`                    | `--primary`            | `--primary`                    |
| `primary-fg`         | `primary-foreground`         | `--primary-fg`         | `--primary-foreground`         |
| `primary-subtle`     | `primary-subtle`             | `--primary-subtle`     | `--primary-subtle`             |
| `primary-subtle-fg`  | `primary-subtle-foreground`  | `--primary-subtle-fg`  | `--primary-subtle-foreground`  |
| `secondary`          | `secondary`                  | `--secondary`          | `--secondary`                  |
| `secondary-fg`       | `secondary-foreground`       | `--secondary-fg`       | `--secondary-foreground`       |
| `accent`             | `accent`                     | `--accent`             | `--accent`                     |
| `accent-fg`          | `accent-foreground`          | `--accent-fg`          | `--accent-foreground`          |
| `success`            | `success`                    | `--success`            | `--success`                    |
| `success-fg`         | `success-foreground`         | `--success-fg`         | `--success-foreground`         |
| `success-subtle`     | `success-subtle`             | `--success-subtle`     | `--success-subtle`             |
| `success-subtle-fg`  | `success-subtle-foreground`  | `--success-subtle-fg`  | `--success-subtle-foreground`  |
| `danger`             | `danger`                     | `--danger`             | `--danger`                     |
| `danger-fg`          | `danger-foreground`          | `--danger-fg`          | `--danger-foreground`          |
| `danger-subtle`      | `danger-subtle`              | `--danger-subtle`      | `--danger-subtle`              |
| `danger-subtle-fg`   | `danger-subtle-foreground`   | `--danger-subtle-fg`   | `--danger-subtle-foreground`   |
| `warning`            | `warning`                    | `--warning`            | `--warning`                    |
| `warning-fg`         | `warning-foreground`         | `--warning-fg`         | `--warning-foreground`         |
| `warning-subtle`     | `warning-subtle`             | `--warning-subtle`     | `--warning-subtle`             |
| `warning-subtle-fg`  | `warning-subtle-foreground`  | `--warning-subtle-fg`  | `--warning-subtle-foreground`  |
| `info-subtle`        | `info-subtle`                | `--info-subtle`        | `--info-subtle`                |
| `info-subtle-fg`     | `info-subtle-foreground`     | `--info-subtle-fg`     | `--info-subtle-foreground`     |
| `muted`              | `muted`                      | `--muted`              | `--muted`                      |
| `muted-fg`           | `muted-foreground`           | `--muted-fg`           | `--muted-foreground`           |
| `overlay`            | `overlay`                    | `--overlay`            | `--overlay`                    |
| `overlay-fg`         | `overlay-foreground`         | `--overlay-fg`         | `--overlay-foreground`         |
| `navbar`             | `navbar`                     | `--navbar`             | `--navbar`                     |
| `navbar-fg`          | `navbar-foreground`          | `--navbar-fg`          | `--navbar-foreground`          |
| `sidebar`            | `sidebar`                    | `--sidebar`            | `--sidebar`                    |
| `sidebar-fg`         | `sidebar-foreground`         | `--sidebar-fg`         | `--sidebar-foreground`         |
| `sidebar-primary`    | `sidebar-primary`            | `--sidebar-primary`    | `--sidebar-primary`            |
| `sidebar-primary-fg` | `sidebar-primary-foreground` | `--sidebar-primary-fg` | `--sidebar-primary-foreground` |
| `sidebar-accent`     | `sidebar-accent`             | `--sidebar-accent`     | `--sidebar-accent`             |
| `sidebar-accent-fg`  | `sidebar-accent-foreground`  | `--sidebar-accent-fg`  | `--sidebar-accent-foreground`  |
| `sidebar-border`     | `sidebar-border`             | `--sidebar-border`     | `--sidebar-border`             |
| `sidebar-ring`       | `sidebar-ring`               | `--sidebar-ring`       | `--sidebar-ring`               |
| `chart-1`            | `chart-1`                    | `--chart-1`            | `--chart-1`                    |
| `chart-2`            | `chart-2`                    | `--chart-2`            | `--chart-2`                    |
| `chart-3`            | `chart-3`                    | `--chart-3`            | `--chart-3`                    |
| `chart-4`            | `chart-4`                    | `--chart-4`            | `--chart-4`                    |
| `chart-5`            | `chart-5`                    | `--chart-5`            | `--chart-5`                    |

Change exact semantic utilities in JSX/class builders, preserving modifiers and opacity (`hover:text-muted-fg/70` → `hover:text-muted-foreground/70`). Inspect arbitrary utilities and selectors containing `var(--color-*)` too. Update definitions and `var(...)` references in `:root`, `.dark`, scoped themes, @theme aliases, and custom theme files. Preserve customized values, font/radius, chart palettes and unchanged families. New component-private variables such as `--btn-foreground` require a source comparison; they are not all global theme tokens.

Do not replace arbitrary `bg`/`fg` substrings in identifiers, data, URLs, prose, or third-party CSS. Audit every project's actual token set: older v3 themes can omit card/subtle families. Mixed migrations may need temporary aliases while old consumers remain; document them and remove only when the last consumer is converted. Search for remaining old _semantic_ references and confirm rendered light/dark styles.

[3.x CSS](https://github.com/irsyadadl/intentui/blob/3.x/src/stubs/installation/main.css.stub), [4.x CSS](https://github.com/irsyadadl/intentui/blob/4.x/src/stubs/installation/main.css.stub).

Audited theme variants under `src/styles/themes/` contain the same color families or subsets. In v4 those files still expose `--color-bg: var(--background)`; if the consuming application copied that variant, update the alias to `--color-background` without renaming its already-correct `--background` variable. This is a theme inconsistency to inspect, not justification to overwrite custom CSS.

For narrow AST-aware updates of static className strings and CSS variables, use [automation](automation.md). Other class builders/dynamic templates require manual review; no arbitrary substring replacement is performed.
