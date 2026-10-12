# v4 semantic colors

Verified against [4.x installation CSS](https://github.com/irsyadadl/intentui/blob/4.x/src/stubs/installation/main.css.stub). Read the installed theme too: optional families may be absent in older projects.

Use utility prefixes (`bg-`, `text-`, `border-`, `ring-`, `fill-`, `stroke-`) appropriate to the element. Token and CSS variable pairs:

| Token                        | CSS variable                   |
| ---------------------------- | ------------------------------ |
| `border`                     | `--border`                     |
| `input`                      | `--input`                      |
| `ring`                       | `--ring`                       |
| `background`                 | `--background`                 |
| `foreground`                 | `--foreground`                 |
| `card`                       | `--card`                       |
| `card-foreground`            | `--card-foreground`            |
| `primary`                    | `--primary`                    |
| `primary-foreground`         | `--primary-foreground`         |
| `primary-subtle`             | `--primary-subtle`             |
| `primary-subtle-foreground`  | `--primary-subtle-foreground`  |
| `secondary`                  | `--secondary`                  |
| `secondary-foreground`       | `--secondary-foreground`       |
| `accent`                     | `--accent`                     |
| `accent-foreground`          | `--accent-foreground`          |
| `success`                    | `--success`                    |
| `success-foreground`         | `--success-foreground`         |
| `success-subtle`             | `--success-subtle`             |
| `success-subtle-foreground`  | `--success-subtle-foreground`  |
| `danger`                     | `--danger`                     |
| `danger-foreground`          | `--danger-foreground`          |
| `danger-subtle`              | `--danger-subtle`              |
| `danger-subtle-foreground`   | `--danger-subtle-foreground`   |
| `warning`                    | `--warning`                    |
| `warning-foreground`         | `--warning-foreground`         |
| `warning-subtle`             | `--warning-subtle`             |
| `warning-subtle-foreground`  | `--warning-subtle-foreground`  |
| `info-subtle`                | `--info-subtle`                |
| `info-subtle-foreground`     | `--info-subtle-foreground`     |
| `muted`                      | `--muted`                      |
| `muted-foreground`           | `--muted-foreground`           |
| `overlay`                    | `--overlay`                    |
| `overlay-foreground`         | `--overlay-foreground`         |
| `navbar`                     | `--navbar`                     |
| `navbar-foreground`          | `--navbar-foreground`          |
| `sidebar`                    | `--sidebar`                    |
| `sidebar-foreground`         | `--sidebar-foreground`         |
| `sidebar-primary`            | `--sidebar-primary`            |
| `sidebar-primary-foreground` | `--sidebar-primary-foreground` |
| `sidebar-accent`             | `--sidebar-accent`             |
| `sidebar-accent-foreground`  | `--sidebar-accent-foreground`  |
| `sidebar-border`             | `--sidebar-border`             |
| `sidebar-ring`               | `--sidebar-ring`               |
| `chart-1`                    | `--chart-1`                    |
| `chart-2`                    | `--chart-2`                    |
| `chart-3`                    | `--chart-3`                    |
| `chart-4`                    | `--chart-4`                    |
| `chart-5`                    | `--chart-5`                    |

Preserve existing light/dark values, font and radius customizations. The installation CSS includes info-subtle, not a standalone info/info-foreground pair; do not invent missing families. See [shared styling](../styling.md).

## Upstream theme caveat

The audited v4 files under `src/styles/themes/` retain `--color-bg: var(--background)` while the installation stub uses `--color-background`. Other foreground aliases use the v4 names. This single legacy alias is not proof of a v3 component system. Inspect the consuming CSS and normalize that alias only as part of an authorized theme update; the skill does not change library CSS.
