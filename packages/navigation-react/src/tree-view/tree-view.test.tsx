import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import {
  Tree,
  TreeBranch,
  TreeItem,
  TreeItemContent,
  TreeIndicator,
  TreeGroup,
} from "./tree-view.js"

afterEach(cleanup)

describe("Tree", () => {
  it("renders children", () => {
    render(<Tree aria-label="Files">Content</Tree>)
    expect(screen.getByRole("tree", { name: "Files" })).toHaveTextContent("Content")
  })

  it("applies default classes", () => {
    render(<Tree aria-label="Files">Tree</Tree>)
    const tree = screen.getByRole("tree", { name: "Files" })
    expect(tree.className).toContain("pm-tree")
    expect(tree.className).toContain("pm-tree--md")
  })

  it("applies size class", () => {
    render(
      <Tree aria-label="Files" size="sm">
        Tree
      </Tree>,
    )
    const tree = screen.getByRole("tree", { name: "Files" })
    expect(tree.className).toContain("pm-tree--sm")
  })

  it("has role=tree", () => {
    render(<Tree aria-label="Files">Tree</Tree>)
    expect(screen.getByRole("tree")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let ref: HTMLUListElement | null = null
    render(
      <Tree aria-label="Files" ref={(el) => (ref = el)}>
        Tree
      </Tree>,
    )
    expect(ref).toBeInstanceOf(HTMLUListElement)
  })

  it("merges custom className", () => {
    render(
      <Tree aria-label="Files" className="custom">
        Tree
      </Tree>,
    )
    const tree = screen.getByRole("tree", { name: "Files" })
    expect(tree.className).toContain("pm-tree")
    expect(tree.className).toContain("custom")
  })
})

describe("TreeBranch", () => {
  it("renders with role=treeitem", () => {
    render(
      <Tree aria-label="Files">
        <TreeBranch expanded>Branch</TreeBranch>
      </Tree>,
    )
    expect(screen.getByRole("treeitem")).toHaveTextContent("Branch")
  })

  it("applies expanded class and aria-expanded", () => {
    render(
      <Tree aria-label="Files">
        <TreeBranch expanded data-testid="branch">
          Branch
        </TreeBranch>
      </Tree>,
    )
    const branch = screen.getByTestId("branch")
    expect(branch.className).toContain("pm-tree__branch--expanded")
    expect(branch).toHaveAttribute("aria-expanded", "true")
  })

  it("applies collapsed state", () => {
    render(
      <Tree aria-label="Files">
        <TreeBranch expanded={false} data-testid="branch">
          Branch
        </TreeBranch>
      </Tree>,
    )
    const branch = screen.getByTestId("branch")
    expect(branch.className).not.toContain("pm-tree__branch--expanded")
    expect(branch).toHaveAttribute("aria-expanded", "false")
  })

  it("forwards ref", () => {
    let ref: HTMLLIElement | null = null
    render(
      <Tree aria-label="Files">
        <TreeBranch ref={(el) => (ref = el)}>Branch</TreeBranch>
      </Tree>,
    )
    expect(ref).toBeInstanceOf(HTMLLIElement)
  })
})

describe("TreeItem", () => {
  it("renders with role=treeitem", () => {
    render(
      <Tree aria-label="Files">
        <TreeItem>Item</TreeItem>
      </Tree>,
    )
    expect(screen.getByRole("treeitem")).toHaveTextContent("Item")
  })

  it("applies selected class", () => {
    render(
      <Tree aria-label="Files">
        <TreeItem selected data-testid="item">
          Item
        </TreeItem>
      </Tree>,
    )
    expect(screen.getByTestId("item").className).toContain("pm-tree__item--selected")
  })

  it("applies disabled class", () => {
    render(
      <Tree aria-label="Files">
        <TreeItem disabled data-testid="item">
          Item
        </TreeItem>
      </Tree>,
    )
    expect(screen.getByTestId("item").className).toContain("pm-tree__item--disabled")
  })

  it("forwards ref", () => {
    let ref: HTMLLIElement | null = null
    render(
      <Tree aria-label="Files">
        <TreeItem ref={(el) => (ref = el)}>Item</TreeItem>
      </Tree>,
    )
    expect(ref).toBeInstanceOf(HTMLLIElement)
  })
})

describe("TreeItemContent", () => {
  it("renders children", () => {
    render(<TreeItemContent data-testid="content">Content</TreeItemContent>)
    expect(screen.getByTestId("content")).toHaveTextContent("Content")
  })

  it("applies class", () => {
    render(<TreeItemContent data-testid="content">Content</TreeItemContent>)
    expect(screen.getByTestId("content").className).toContain("pm-tree__item-content")
  })

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null
    render(<TreeItemContent ref={(el) => (ref = el)}>Content</TreeItemContent>)
    expect(ref).toBeInstanceOf(HTMLDivElement)
  })
})

describe("TreeIndicator", () => {
  it("renders with aria-hidden", () => {
    render(<TreeIndicator data-testid="indicator" />)
    expect(screen.getByTestId("indicator")).toHaveAttribute("aria-hidden", "true")
  })

  it("applies expanded class", () => {
    render(<TreeIndicator expanded data-testid="indicator" />)
    expect(screen.getByTestId("indicator").className).toContain("pm-tree__indicator--expanded")
  })

  it("forwards ref", () => {
    let ref: HTMLSpanElement | null = null
    render(<TreeIndicator ref={(el) => (ref = el)} />)
    expect(ref).toBeInstanceOf(HTMLSpanElement)
  })
})

describe("TreeGroup", () => {
  it("renders with role=group", () => {
    render(<TreeGroup>Group</TreeGroup>)
    expect(screen.getByRole("group")).toHaveTextContent("Group")
  })

  it("applies class", () => {
    render(<TreeGroup data-testid="group">Group</TreeGroup>)
    expect(screen.getByTestId("group").className).toContain("pm-tree__group")
  })

  it("forwards ref", () => {
    let ref: HTMLUListElement | null = null
    render(<TreeGroup ref={(el) => (ref = el)}>Group</TreeGroup>)
    expect(ref).toBeInstanceOf(HTMLUListElement)
  })

  it("merges custom className", () => {
    render(
      <TreeGroup data-testid="group" className="custom">
        Group
      </TreeGroup>,
    )
    const el = screen.getByTestId("group")
    expect(el.className).toContain("pm-tree__group")
    expect(el.className).toContain("custom")
  })
})
