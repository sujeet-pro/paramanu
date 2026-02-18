import type { Meta, StoryObj } from "@storybook/html-vite"
import {
  treeViewClasses,
  treeViewBranchClasses,
  treeViewItemClasses,
  treeViewItemContentClasses,
  treeViewIndicatorClasses,
  treeViewGroupClasses,
} from "./tree-view.classes.js"
import type { TreeViewClassesOptions } from "./tree-view.types.js"

interface TreeViewArgs extends TreeViewClassesOptions {}

function createTreeView(args: TreeViewArgs): HTMLElement {
  const tree = document.createElement("ul")
  tree.className = treeViewClasses(args)
  tree.setAttribute("role", "tree")

  // Branch
  const branch = document.createElement("li")
  branch.className = treeViewBranchClasses({ expanded: true })
  branch.setAttribute("role", "treeitem")
  branch.setAttribute("aria-expanded", "true")

  const branchContent = document.createElement("div")
  branchContent.className = treeViewItemContentClasses()

  const indicator = document.createElement("span")
  indicator.className = treeViewIndicatorClasses({ expanded: true })
  indicator.setAttribute("aria-hidden", "true")

  branchContent.appendChild(indicator)
  branchContent.appendChild(document.createTextNode("src"))
  branch.appendChild(branchContent)

  const group = document.createElement("ul")
  group.className = treeViewGroupClasses()
  group.setAttribute("role", "group")

  ;["index.ts", "utils.ts"].forEach((text) => {
    const item = document.createElement("li")
    item.className = treeViewItemClasses()
    item.setAttribute("role", "treeitem")
    item.textContent = text
    group.appendChild(item)
  })

  branch.appendChild(group)
  tree.appendChild(branch)

  // Leaf items
  ;["package.json", "README.md"].forEach((text) => {
    const item = document.createElement("li")
    item.className = treeViewItemClasses()
    item.setAttribute("role", "treeitem")
    item.textContent = text
    tree.appendChild(item)
  })

  return tree
}

const meta = {
  title: "Navigation/Tree View",
  tags: ["autodocs", "stable"],
  render: (args) => createTreeView(args as TreeViewArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
  args: {
    size: "md",
  },
} satisfies Meta<TreeViewArgs>

export default meta
type Story = StoryObj<TreeViewArgs>

export const Playground: Story = {}

export const Small: Story = {
  args: { size: "sm" },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
