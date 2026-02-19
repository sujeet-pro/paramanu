import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Editable } from "./editable-text.js"

const meta = {
  title: "Forms/Editable Text",
  tags: ["autodocs", "beta"],
  component: Editable,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    editing: { control: "boolean" },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof Editable>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: <span>Click to edit</span>,
  },
}

export const Editing: Story = {
  args: {
    editing: true,
    children: <input className="pm-input pm-input--outline pm-input--md" defaultValue="Editing mode" />,
  },
}

export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: <span>Extra small editable</span>,
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: <span>Small editable</span>,
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    children: <span>Large editable</span>,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <span>Cannot edit</span>,
  },
}

export const ClickInteraction: Story = {
  args: {
    children: <span>Click to edit</span>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText("Click to edit")
    await userEvent.click(text)
    await expect(text).toBeInTheDocument()
  },
}

export const KeyboardInteraction: Story = {
  args: {
    editing: true,
    children: <input className="pm-input pm-input--outline pm-input--md" defaultValue="Edit me" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByDisplayValue("Edit me")
    await userEvent.tab()
    await expect(input).toHaveFocus()
  },
}

export const Accessibility: Story = {
  args: {
    "aria-label": "Editable title",
    children: <span>Click to edit</span>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("group", { name: "Editable title" })
    await expect(el).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { children: <span>Click to edit</span> },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { children: <span>Click to edit</span> },
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  args: { children: <span>Click to edit</span> },
  parameters: { pseudo: { active: true } },
}
