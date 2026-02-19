import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Dropdown, DropdownTrigger, DropdownContent } from "./dropdown-menu.js"

const meta = {
  title: "Navigation/Dropdown Menu",
  component: Dropdown,
  tags: ["autodocs", "beta"],
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
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <DropdownTrigger expanded={args.open}>Options</DropdownTrigger>
      <DropdownContent>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </DropdownContent>
    </Dropdown>
  ),
}

export const Closed: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>Select</DropdownTrigger>
      <DropdownContent>
        <div>Option A</div>
        <div>Option B</div>
      </DropdownContent>
    </Dropdown>
  ),
}

export const Open: Story = {
  args: { open: true },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownTrigger expanded>Actions</DropdownTrigger>
      <DropdownContent>
        <div>Edit</div>
        <div>Duplicate</div>
        <div>Delete</div>
      </DropdownContent>
    </Dropdown>
  ),
}

export const Small: Story = {
  args: { size: "sm", open: true },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownTrigger expanded>Small</DropdownTrigger>
      <DropdownContent>
        <div>Item</div>
      </DropdownContent>
    </Dropdown>
  ),
}

export const Large: Story = {
  args: { size: "lg", open: true },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownTrigger expanded>Large</DropdownTrigger>
      <DropdownContent>
        <div>Item</div>
      </DropdownContent>
    </Dropdown>
  ),
}

export const TriggerClick: Story = {
  render: () => {
    const onClick = fn()
    return (
      <Dropdown>
        <DropdownTrigger expanded={false} onClick={onClick}>
          Menu
        </DropdownTrigger>
        <DropdownContent>
          <div>Content</div>
        </DropdownContent>
      </Dropdown>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Menu" })
    await userEvent.click(trigger)
  },
}

export const TriggerAccessibility: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger expanded={false}>Menu</DropdownTrigger>
      <DropdownContent>
        <div>Content</div>
      </DropdownContent>
    </Dropdown>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Menu" })
    await expect(trigger).toHaveAttribute("aria-haspopup", "true")
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
  },
}

export const Hover: Story = {
  args: { open: true },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownTrigger expanded>Options</DropdownTrigger>
      <DropdownContent>
        <div>Item</div>
      </DropdownContent>
    </Dropdown>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>Options</DropdownTrigger>
      <DropdownContent>
        <div>Item</div>
      </DropdownContent>
    </Dropdown>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
