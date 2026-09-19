import { describe, it, expect, vi } from "vitest"
import { render, screen } from "../utils/render"
import { User } from "@react-aria/test-utils"
import { Tree, TreeItem, TreeContent } from "@/components/ui/tree"
const ariaUser = new User({ interactionType: "mouse" })
describe("Tree", () => {
  it("expands and collapses nested items using the rendered chevron", async () => {
    render(
      <Tree aria-label="Files">
        <TreeItem id="folder" textValue="Folder">
          <TreeContent>Folder</TreeContent>
          <TreeItem id="file" textValue="File">
            <TreeContent>File</TreeContent>
          </TreeItem>
        </TreeItem>
      </Tree>
    )
    const tester = ariaUser.createTester("Tree", { root: screen.getByRole("treegrid") })
    expect(tester.getRows()).toHaveLength(1)
    await tester.toggleRowExpansion({ row: "Folder" })
    expect(tester.getRows()).toHaveLength(2)
    await tester.toggleRowExpansion({ row: "Folder" })
    expect(tester.getRows()).toHaveLength(1)
  })
  it("reports selection of a tree item", async () => {
    const onSelectionChange = vi.fn()
    render(
      <Tree aria-label="Files" selectionMode="single" onSelectionChange={onSelectionChange}>
        <TreeItem id="file" textValue="File">
          <TreeContent>File</TreeContent>
        </TreeItem>
      </Tree>
    )
    const tester = ariaUser.createTester("Tree", { root: screen.getByRole("treegrid") })
    await tester.toggleRowSelection({ row: "File" })
    expect(tester.getSelectedRows()).toHaveLength(1)
    expect(Array.from(onSelectionChange.mock.calls.at(-1)![0])).toEqual(["file"])
  })
})
