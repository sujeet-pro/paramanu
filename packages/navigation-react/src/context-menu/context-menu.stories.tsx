import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { CtxMenu } from "./context-menu.js"

const meta = {
  title: "Navigation/Context Menu",
  component: CtxMenu,
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
    open: true,
  },
} satisfies Meta<typeof CtxMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <CtxMenu {...args}>
      <div role="menuitem">Cut</div>
      <div role="menuitem">Copy</div>
      <div role="menuitem">Paste</div>
    </CtxMenu>
  ),
}

export const Default: Story = {
  args: { open: true },
  render: (args) => (
    <CtxMenu {...args}>
      <div role="menuitem">Inspect</div>
      <div role="menuitem">View Source</div>
    </CtxMenu>
  ),
}

export const Small: Story = {
  args: { size: "sm", open: true },
  render: (args) => (
    <CtxMenu {...args}>
      <div role="menuitem">Item 1</div>
      <div role="menuitem">Item 2</div>
    </CtxMenu>
  ),
}

export const Large: Story = {
  args: { size: "lg", open: true },
  render: (args) => (
    <CtxMenu {...args}>
      <div role="menuitem">Item 1</div>
      <div role="menuitem">Item 2</div>
    </CtxMenu>
  ),
}

export const Closed: Story = {
  args: { open: false },
  render: (args) => (
    <CtxMenu {...args}>
      <div role="menuitem">Hidden Item</div>
    </CtxMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("menu")).toBeInTheDocument()
  },
}

export const SelectItem: Story = {
  args: { open: true },
  render: (args) => {
    const onSelect = fn()
    return (
      <CtxMenu {...args}>
        <div role="menuitem" onClick={onSelect}>
          Cut
        </div>
        <div role="menuitem">Copy</div>
      </CtxMenu>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const item = canvas.getByRole("menuitem", { name: "Cut" })
    await userEvent.click(item)
  },
}

export const KeyboardNavigation: Story = {
  args: { open: true },
  render: (args) => (
    <CtxMenu {...args}>
      <div role="menuitem" tabIndex={0}>
        Cut
      </div>
      <div role="menuitem" tabIndex={0}>
        Copy
      </div>
      <div role="menuitem" tabIndex={0}>
        Paste
      </div>
    </CtxMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const firstItem = canvas.getByRole("menuitem", { name: "Cut" })
    firstItem.focus()
    await expect(firstItem).toHaveFocus()
  },
}

export const Accessibility: Story = {
  args: { open: true },
  render: (args) => (
    <CtxMenu {...args}>
      <div role="menuitem">Cut</div>
      <div role="menuitem">Copy</div>
    </CtxMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("menu")).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { open: true },
  render: (args) => (
    <CtxMenu {...args}>
      <div role="menuitem">Cut</div>
      <div role="menuitem">Copy</div>
    </CtxMenu>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { open: true },
  render: (args) => (
    <CtxMenu {...args}>
      <div role="menuitem">Cut</div>
      <div role="menuitem">Copy</div>
    </CtxMenu>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
