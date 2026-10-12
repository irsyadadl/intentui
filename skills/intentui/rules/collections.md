# React Aria collections

Read the installed wrapper and React Aria collection types. For dynamic collections prefer `items` and the render function so identity, keyboard navigation, selection, and caching follow the collection API. Static item children are valid. `.map()` is valid for ordinary layout/content and where the installed collection API supports it; do not prohibit it throughout the application.

| Family   | Data and children                                                           | State/accessibility                                                                                                             |
| -------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Table    | `TableHeader` → `TableColumn`; `TableBody items` → `TableRow` → `TableCell` | visible label or `aria-label`; one primary `isRowHeader` column; sorting needs data sorting and `sortDescriptor`/`onSortChange` |
| ListBox  | `ListBox items` → `ListBoxItem`; sections from local exports                | stable IDs; `textValue` for rich labels; accessible name                                                                        |
| GridList | `GridList items` → `GridListItem`                                           | stable IDs, name, `textValue`; inspect embedded action behavior                                                                 |
| Tree     | `Tree` → `TreeItem` → `TreeContent`; nested items/Collection                | stable IDs and `textValue`; expansion state uses installed props                                                                |
| TagGroup | `TagGroup` → `Label`, `TagList items` → `Tag`                               | selection on TagGroup, data on TagList; `onRemove` for removal                                                                  |
| Menu     | v3 `MenuContent items`; v4 `Menu items` → `MenuItem`                        | action via `onAction`; selection where appropriate; [overlay composition](overlays.md)                                          |

Collection selection normally uses `selectionMode`, `selectedKeys`/`defaultSelectedKeys`, `onSelectionChange`, and `disabledKeys`. Controlled selection can be a Set or `"all"`; IDs must match keys. Do not blindly copy Select/ComboBox state props into these collections. Inspect automatic selection controls before adding another checkbox column.

```tsx
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { ListBox, ListBoxItem } from "@/components/ui/list-box"
import { GridList, GridListItem } from "@/components/ui/grid-list"
import { Tree, TreeItem, TreeContent } from "@/components/ui/tree"
import { TagGroup, TagList, Tag } from "@/components/ui/tag-group"
import { Label } from "@/components/ui/field"

const projects = [{ id: "alpha", name: "Alpha" }]

export function ProjectCollections() {
  return (
    <>
      <Table aria-label="Projects" selectionMode="multiple">
        <TableHeader>
          <TableColumn isRowHeader>Name</TableColumn>
        </TableHeader>
        <TableBody items={projects}>
          {(project) => (
            <TableRow id={project.id}>
              <TableCell>{project.name}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ListBox aria-label="Choose project" items={projects} selectionMode="single">
        {(project) => <ListBoxItem id={project.id}>{project.name}</ListBoxItem>}
      </ListBox>
      <GridList aria-label="Project files" items={projects}>
        {(project) => (
          <GridListItem id={project.id} textValue={project.name}>
            {project.name}
          </GridListItem>
        )}
      </GridList>
      <Tree aria-label="Folders">
        <TreeItem id="projects" textValue="Projects">
          <TreeContent>Projects</TreeContent>
        </TreeItem>
      </Tree>
      <TagGroup>
        <Label>Projects</Label>
        <TagList items={projects}>{(project) => <Tag id={project.id}>{project.name}</Tag>}</TagList>
      </TagGroup>
    </>
  )
}
```

Preserve accessible names, typeahead text, drag/drop and asynchronous loading contracts. Test keyboard navigation and selection when changing collection composition.
