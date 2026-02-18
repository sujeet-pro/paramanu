import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "./dropdown-menu.js"

const meta = {
  title: "Navigation/Dropdown Menu",
  component: DropdownMenu,
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
    open: false,
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger expanded={args.open}>Options</DropdownMenuTrigger>
      <DropdownMenuContent>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const Closed: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Select</DropdownMenuTrigger>
      <DropdownMenuContent>
        <div>Option A</div>
        <div>Option B</div>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const Open: Story = {
  args: { open: true },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger expanded>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <div>Edit</div>
        <div>Duplicate</div>
        <div>Delete</div>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const Small: Story = {
  args: { size: "sm", open: true },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger expanded>Small</DropdownMenuTrigger>
      <DropdownMenuContent>
        <div>Item</div>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const Large: Story = {
  args: { size: "lg", open: true },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger expanded>Large</DropdownMenuTrigger>
      <DropdownMenuContent>
        <div>Item</div>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const TriggerAccessibility: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger expanded={false}>Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <div>Content</div>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Menu" })
    await expect(trigger).toHaveAttribute("aria-haspopup", "true")
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
  },
}
