import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import {
  Tree,
  TreeBranch,
  TreeItem,
  TreeItemContent,
  TreeIndicator,
  TreeGroup,
} from "./tree-view.js"

const meta = {
  title: "Navigation/Tree View",
  component: Tree,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
  args: {
    size: "md",
  },
} satisfies Meta<typeof Tree>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Tree {...args}>
      <TreeBranch expanded>
        <TreeItemContent>
          <TreeIndicator expanded />
          src
        </TreeItemContent>
        <TreeGroup>
          <TreeItem>index.ts</TreeItem>
          <TreeBranch>
            <TreeItemContent>
              <TreeIndicator />
              components
            </TreeItemContent>
          </TreeBranch>
        </TreeGroup>
      </TreeBranch>
      <TreeItem>package.json</TreeItem>
      <TreeItem>README.md</TreeItem>
    </Tree>
  ),
}

export const Default: Story = {
  render: () => (
    <Tree>
      <TreeItem>File 1</TreeItem>
      <TreeItem>File 2</TreeItem>
      <TreeItem>File 3</TreeItem>
    </Tree>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Tree {...args}>
      <TreeItem>Small Item 1</TreeItem>
      <TreeItem>Small Item 2</TreeItem>
    </Tree>
  ),
}

export const NestedBranches: Story = {
  render: () => (
    <Tree>
      <TreeBranch expanded>
        <TreeItemContent>
          <TreeIndicator expanded />
          Level 1
        </TreeItemContent>
        <TreeGroup>
          <TreeBranch expanded>
            <TreeItemContent>
              <TreeIndicator expanded />
              Level 2
            </TreeItemContent>
            <TreeGroup>
              <TreeItem>Leaf</TreeItem>
            </TreeGroup>
          </TreeBranch>
        </TreeGroup>
      </TreeBranch>
    </Tree>
  ),
}

export const WithSelection: Story = {
  render: () => (
    <Tree>
      <TreeItem selected>Selected Item</TreeItem>
      <TreeItem>Normal Item</TreeItem>
      <TreeItem disabled>Disabled Item</TreeItem>
    </Tree>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("tree")).toBeInTheDocument()
    await expect(canvas.getByText("Selected Item")).toBeInTheDocument()
  },
}

export const ExpandCollapse: Story = {
  render: () => {
    const onClick = fn()
    return (
      <Tree>
        <TreeBranch expanded onClick={onClick}>
          <TreeItemContent>
            <TreeIndicator expanded />
            Expandable
          </TreeItemContent>
          <TreeGroup>
            <TreeItem>Child</TreeItem>
          </TreeGroup>
        </TreeBranch>
      </Tree>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const branch = canvas.getByText("Expandable")
    await userEvent.click(branch)
  },
}

export const Accessibility: Story = {
  render: () => (
    <Tree>
      <TreeBranch expanded>
        <TreeItemContent>
          <TreeIndicator expanded />
          Folder
        </TreeItemContent>
        <TreeGroup>
          <TreeItem>File</TreeItem>
        </TreeGroup>
      </TreeBranch>
    </Tree>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("tree")).toBeInTheDocument()
    await expect(canvas.getByRole("treeitem", { name: /Folder/i })).toBeInTheDocument()
  },
}

export const Hover: Story = {
  render: (args) => (
    <Tree {...args}>
      <TreeItem>Item 1</TreeItem>
      <TreeItem>Item 2</TreeItem>
    </Tree>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: (args) => (
    <Tree {...args}>
      <TreeItem>Item 1</TreeItem>
      <TreeItem>Item 2</TreeItem>
    </Tree>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
