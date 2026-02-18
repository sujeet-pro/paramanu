import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import {
  TreeView,
  TreeViewBranch,
  TreeViewItem,
  TreeViewItemContent,
  TreeViewIndicator,
  TreeViewGroup,
} from "./tree-view.js"

afterEach(cleanup)

describe("TreeView", () => {
  it("renders children", () => {
    render(<TreeView aria-label="Files">Content</TreeView>)
    expect(screen.getByRole("tree", { name: "Files" })).toHaveTextContent("Content")
  })

  it("applies default classes", () => {
    render(<TreeView aria-label="Files">Tree</TreeView>)
    const tree = screen.getByRole("tree", { name: "Files" })
    expect(tree.className).toContain("pm-tree-view")
    expect(tree.className).toContain("pm-tree-view--md")
  })

  it("applies size class", () => {
    render(
      <TreeView aria-label="Files" size="sm">
        Tree
      </TreeView>,
    )
    const tree = screen.getByRole("tree", { name: "Files" })
    expect(tree.className).toContain("pm-tree-view--sm")
  })

  it("has role=tree", () => {
    render(<TreeView aria-label="Files">Tree</TreeView>)
    expect(screen.getByRole("tree")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let ref: HTMLUListElement | null = null
    render(
      <TreeView aria-label="Files" ref={(el) => (ref = el)}>
        Tree
      </TreeView>,
    )
    expect(ref).toBeInstanceOf(HTMLUListElement)
  })

  it("merges custom className", () => {
    render(
      <TreeView aria-label="Files" className="custom">
        Tree
      </TreeView>,
    )
    const tree = screen.getByRole("tree", { name: "Files" })
    expect(tree.className).toContain("pm-tree-view")
    expect(tree.className).toContain("custom")
  })
})

describe("TreeViewBranch", () => {
  it("renders with role=treeitem", () => {
    render(
      <TreeView aria-label="Files">
        <TreeViewBranch expanded>Branch</TreeViewBranch>
      </TreeView>,
    )
    expect(screen.getByRole("treeitem")).toHaveTextContent("Branch")
  })

  it("applies expanded class and aria-expanded", () => {
    render(
      <TreeView aria-label="Files">
        <TreeViewBranch expanded data-testid="branch">
          Branch
        </TreeViewBranch>
      </TreeView>,
    )
    const branch = screen.getByTestId("branch")
    expect(branch.className).toContain("pm-tree-view__branch--expanded")
    expect(branch).toHaveAttribute("aria-expanded", "true")
  })

  it("applies collapsed state", () => {
    render(
      <TreeView aria-label="Files">
        <TreeViewBranch expanded={false} data-testid="branch">
          Branch
        </TreeViewBranch>
      </TreeView>,
    )
    const branch = screen.getByTestId("branch")
    expect(branch.className).not.toContain("pm-tree-view__branch--expanded")
    expect(branch).toHaveAttribute("aria-expanded", "false")
  })

  it("forwards ref", () => {
    let ref: HTMLLIElement | null = null
    render(
      <TreeView aria-label="Files">
        <TreeViewBranch ref={(el) => (ref = el)}>Branch</TreeViewBranch>
      </TreeView>,
    )
    expect(ref).toBeInstanceOf(HTMLLIElement)
  })
})

describe("TreeViewItem", () => {
  it("renders with role=treeitem", () => {
    render(
      <TreeView aria-label="Files">
        <TreeViewItem>Item</TreeViewItem>
      </TreeView>,
    )
    expect(screen.getByRole("treeitem")).toHaveTextContent("Item")
  })

  it("applies selected class", () => {
    render(
      <TreeView aria-label="Files">
        <TreeViewItem selected data-testid="item">
          Item
        </TreeViewItem>
      </TreeView>,
    )
    expect(screen.getByTestId("item").className).toContain("pm-tree-view__item--selected")
  })

  it("applies disabled class", () => {
    render(
      <TreeView aria-label="Files">
        <TreeViewItem disabled data-testid="item">
          Item
        </TreeViewItem>
      </TreeView>,
    )
    expect(screen.getByTestId("item").className).toContain("pm-tree-view__item--disabled")
  })

  it("forwards ref", () => {
    let ref: HTMLLIElement | null = null
    render(
      <TreeView aria-label="Files">
        <TreeViewItem ref={(el) => (ref = el)}>Item</TreeViewItem>
      </TreeView>,
    )
    expect(ref).toBeInstanceOf(HTMLLIElement)
  })
})

describe("TreeViewItemContent", () => {
  it("renders children", () => {
    render(<TreeViewItemContent data-testid="content">Content</TreeViewItemContent>)
    expect(screen.getByTestId("content")).toHaveTextContent("Content")
  })

  it("applies class", () => {
    render(<TreeViewItemContent data-testid="content">Content</TreeViewItemContent>)
    expect(screen.getByTestId("content").className).toContain("pm-tree-view__item-content")
  })

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null
    render(<TreeViewItemContent ref={(el) => (ref = el)}>Content</TreeViewItemContent>)
    expect(ref).toBeInstanceOf(HTMLDivElement)
  })
})

describe("TreeViewIndicator", () => {
  it("renders with aria-hidden", () => {
    render(<TreeViewIndicator data-testid="indicator" />)
    expect(screen.getByTestId("indicator")).toHaveAttribute("aria-hidden", "true")
  })

  it("applies expanded class", () => {
    render(<TreeViewIndicator expanded data-testid="indicator" />)
    expect(screen.getByTestId("indicator").className).toContain(
      "pm-tree-view__indicator--expanded",
    )
  })

  it("forwards ref", () => {
    let ref: HTMLSpanElement | null = null
    render(<TreeViewIndicator ref={(el) => (ref = el)} />)
    expect(ref).toBeInstanceOf(HTMLSpanElement)
  })
})

describe("TreeViewGroup", () => {
  it("renders with role=group", () => {
    render(<TreeViewGroup>Group</TreeViewGroup>)
    expect(screen.getByRole("group")).toHaveTextContent("Group")
  })

  it("applies class", () => {
    render(<TreeViewGroup data-testid="group">Group</TreeViewGroup>)
    expect(screen.getByTestId("group").className).toContain("pm-tree-view__group")
  })

  it("forwards ref", () => {
    let ref: HTMLUListElement | null = null
    render(<TreeViewGroup ref={(el) => (ref = el)}>Group</TreeViewGroup>)
    expect(ref).toBeInstanceOf(HTMLUListElement)
  })

  it("merges custom className", () => {
    render(
      <TreeViewGroup data-testid="group" className="custom">
        Group
      </TreeViewGroup>,
    )
    const el = screen.getByTestId("group")
    expect(el.className).toContain("pm-tree-view__group")
    expect(el.className).toContain("custom")
  })
})
