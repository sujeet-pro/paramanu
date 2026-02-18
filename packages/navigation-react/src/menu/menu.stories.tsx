import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Menu, MenuItem, MenuGroup, MenuGroupLabel, MenuSeparator } from "./menu.js"

const meta = {
  title: "Navigation/Menu",
  component: Menu,
  tags: ["autodocs", "stable"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    size: "md",
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
      <MenuSeparator />
      <MenuItem destructive>Delete</MenuItem>
    </Menu>
  ),
}

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuItem>New File</MenuItem>
      <MenuItem>Open File</MenuItem>
      <MenuItem>Save</MenuItem>
    </Menu>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Menu {...args}>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
    </Menu>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Menu {...args}>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
    </Menu>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Menu>
      <MenuGroupLabel>File Actions</MenuGroupLabel>
      <MenuGroup>
        <MenuItem>New</MenuItem>
        <MenuItem>Open</MenuItem>
      </MenuGroup>
      <MenuSeparator />
      <MenuGroupLabel>Edit Actions</MenuGroupLabel>
      <MenuGroup>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
      </MenuGroup>
    </Menu>
  ),
}

export const WithStates: Story = {
  render: () => (
    <Menu>
      <MenuItem active>Active Item</MenuItem>
      <MenuItem disabled>Disabled Item</MenuItem>
      <MenuItem destructive>Destructive Item</MenuItem>
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const disabledItem = canvas.getByText("Disabled Item")
    await expect(disabledItem.closest("[aria-disabled]")).toBeTruthy()
  },
}

export const SelectItem: Story = {
  render: () => {
    const onSelect = fn()
    return (
      <Menu>
        <MenuItem onClick={onSelect}>Clickable Item</MenuItem>
        <MenuItem>Other Item</MenuItem>
      </Menu>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const item = canvas.getByRole("menuitem", { name: "Clickable Item" })
    await userEvent.click(item)
  },
}

export const KeyboardNavigation: Story = {
  render: () => (
    <Menu>
      <MenuItem>First</MenuItem>
      <MenuItem>Second</MenuItem>
      <MenuItem>Third</MenuItem>
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const first = canvas.getByRole("menuitem", { name: "First" })
    first.focus()
    await expect(first).toHaveFocus()
  },
}

export const Accessibility: Story = {
  render: () => (
    <Menu>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("menu")).toBeInTheDocument()
  },
}

export const Hover: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
    </Menu>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
    </Menu>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
