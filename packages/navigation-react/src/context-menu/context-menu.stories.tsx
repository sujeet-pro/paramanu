import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { ContextMenu } from "./context-menu.js"

const meta = {
  title: "Navigation/Context Menu",
  component: ContextMenu,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    open: { control: "boolean" },
  },
  args: {
    size: "md",
    open: true,
  },
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <div role="menuitem">Cut</div>
      <div role="menuitem">Copy</div>
      <div role="menuitem">Paste</div>
    </ContextMenu>
  ),
}

export const Default: Story = {
  args: { open: true },
  render: (args) => (
    <ContextMenu {...args}>
      <div role="menuitem">Inspect</div>
      <div role="menuitem">View Source</div>
    </ContextMenu>
  ),
}

export const Small: Story = {
  args: { size: "sm", open: true },
  render: (args) => (
    <ContextMenu {...args}>
      <div role="menuitem">Item 1</div>
      <div role="menuitem">Item 2</div>
    </ContextMenu>
  ),
}

export const Large: Story = {
  args: { size: "lg", open: true },
  render: (args) => (
    <ContextMenu {...args}>
      <div role="menuitem">Item 1</div>
      <div role="menuitem">Item 2</div>
    </ContextMenu>
  ),
}

export const Closed: Story = {
  args: { open: false },
  render: (args) => (
    <ContextMenu {...args}>
      <div role="menuitem">Hidden Item</div>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("menu")).toBeInTheDocument()
  },
}
