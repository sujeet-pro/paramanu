import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import {
  TreeView,
  TreeViewBranch,
  TreeViewItem,
  TreeViewItemContent,
  TreeViewIndicator,
  TreeViewGroup,
} from "./tree-view.js"

const meta = {
  title: "Navigation/Tree View",
  component: TreeView,
  tags: ["autodocs", "stable"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
  args: {
    size: "md",
  },
} satisfies Meta<typeof TreeView>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <TreeView {...args}>
      <TreeViewBranch expanded>
        <TreeViewItemContent>
          <TreeViewIndicator expanded />
          src
        </TreeViewItemContent>
        <TreeViewGroup>
          <TreeViewItem>index.ts</TreeViewItem>
          <TreeViewBranch>
            <TreeViewItemContent>
              <TreeViewIndicator />
              components
            </TreeViewItemContent>
          </TreeViewBranch>
        </TreeViewGroup>
      </TreeViewBranch>
      <TreeViewItem>package.json</TreeViewItem>
      <TreeViewItem>README.md</TreeViewItem>
    </TreeView>
  ),
}

export const Default: Story = {
  render: () => (
    <TreeView>
      <TreeViewItem>File 1</TreeViewItem>
      <TreeViewItem>File 2</TreeViewItem>
      <TreeViewItem>File 3</TreeViewItem>
    </TreeView>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <TreeView {...args}>
      <TreeViewItem>Small Item 1</TreeViewItem>
      <TreeViewItem>Small Item 2</TreeViewItem>
    </TreeView>
  ),
}

export const NestedBranches: Story = {
  render: () => (
    <TreeView>
      <TreeViewBranch expanded>
        <TreeViewItemContent>
          <TreeViewIndicator expanded />
          Level 1
        </TreeViewItemContent>
        <TreeViewGroup>
          <TreeViewBranch expanded>
            <TreeViewItemContent>
              <TreeViewIndicator expanded />
              Level 2
            </TreeViewItemContent>
            <TreeViewGroup>
              <TreeViewItem>Leaf</TreeViewItem>
            </TreeViewGroup>
          </TreeViewBranch>
        </TreeViewGroup>
      </TreeViewBranch>
    </TreeView>
  ),
}

export const WithSelection: Story = {
  render: () => (
    <TreeView>
      <TreeViewItem selected>Selected Item</TreeViewItem>
      <TreeViewItem>Normal Item</TreeViewItem>
      <TreeViewItem disabled>Disabled Item</TreeViewItem>
    </TreeView>
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
      <TreeView>
        <TreeViewBranch expanded onClick={onClick}>
          <TreeViewItemContent>
            <TreeViewIndicator expanded />
            Expandable
          </TreeViewItemContent>
          <TreeViewGroup>
            <TreeViewItem>Child</TreeViewItem>
          </TreeViewGroup>
        </TreeViewBranch>
      </TreeView>
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
    <TreeView>
      <TreeViewBranch expanded>
        <TreeViewItemContent>
          <TreeViewIndicator expanded />
          Folder
        </TreeViewItemContent>
        <TreeViewGroup>
          <TreeViewItem>File</TreeViewItem>
        </TreeViewGroup>
      </TreeViewBranch>
    </TreeView>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("tree")).toBeInTheDocument()
    await expect(canvas.getByRole("treeitem", { name: /Folder/i })).toBeInTheDocument()
  },
}

export const Hover: Story = {
  render: (args) => (
    <TreeView {...args}>
      <TreeViewItem>Item 1</TreeViewItem>
      <TreeViewItem>Item 2</TreeViewItem>
    </TreeView>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: (args) => (
    <TreeView {...args}>
      <TreeViewItem>Item 1</TreeViewItem>
      <TreeViewItem>Item 2</TreeViewItem>
    </TreeView>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
