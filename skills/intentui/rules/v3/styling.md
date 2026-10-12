# v3 semantic colors

Verified against [3.x installation CSS](https://github.com/irsyadadl/intentui/blob/3.x/src/stubs/installation/main.css.stub). Read the installed theme too: optional families may be absent in older projects.

Use utility prefixes (`bg-`, `text-`, `border-`, `ring-`, `fill-`, `stroke-`) appropriate to the element. Token and CSS variable pairs:

| Token                | CSS variable           |
| -------------------- | ---------------------- |
| `border`             | `--border`             |
| `input`              | `--input`              |
| `ring`               | `--ring`               |
| `bg`                 | `--bg`                 |
| `fg`                 | `--fg`                 |
| `card`               | `--card`               |
| `card-fg`            | `--card-fg`            |
| `primary`            | `--primary`            |
| `primary-fg`         | `--primary-fg`         |
| `primary-subtle`     | `--primary-subtle`     |
| `primary-subtle-fg`  | `--primary-subtle-fg`  |
| `secondary`          | `--secondary`          |
| `secondary-fg`       | `--secondary-fg`       |
| `accent`             | `--accent`             |
| `accent-fg`          | `--accent-fg`          |
| `success`            | `--success`            |
| `success-fg`         | `--success-fg`         |
| `success-subtle`     | `--success-subtle`     |
| `success-subtle-fg`  | `--success-subtle-fg`  |
| `danger`             | `--danger`             |
| `danger-fg`          | `--danger-fg`          |
| `danger-subtle`      | `--danger-subtle`      |
| `danger-subtle-fg`   | `--danger-subtle-fg`   |
| `warning`            | `--warning`            |
| `warning-fg`         | `--warning-fg`         |
| `warning-subtle`     | `--warning-subtle`     |
| `warning-subtle-fg`  | `--warning-subtle-fg`  |
| `info-subtle`        | `--info-subtle`        |
| `info-subtle-fg`     | `--info-subtle-fg`     |
| `muted`              | `--muted`              |
| `muted-fg`           | `--muted-fg`           |
| `overlay`            | `--overlay`            |
| `overlay-fg`         | `--overlay-fg`         |
| `navbar`             | `--navbar`             |
| `navbar-fg`          | `--navbar-fg`          |
| `sidebar`            | `--sidebar`            |
| `sidebar-fg`         | `--sidebar-fg`         |
| `sidebar-primary`    | `--sidebar-primary`    |
| `sidebar-primary-fg` | `--sidebar-primary-fg` |
| `sidebar-accent`     | `--sidebar-accent`     |
| `sidebar-accent-fg`  | `--sidebar-accent-fg`  |
| `sidebar-border`     | `--sidebar-border`     |
| `sidebar-ring`       | `--sidebar-ring`       |
| `chart-1`            | `--chart-1`            |
| `chart-2`            | `--chart-2`            |
| `chart-3`            | `--chart-3`            |
| `chart-4`            | `--chart-4`            |
| `chart-5`            | `--chart-5`            |

Preserve existing light/dark values, font and radius customizations. The installation CSS includes info-subtle, not a standalone info/info-foreground pair; do not invent missing families. See [shared styling](../styling.md).
