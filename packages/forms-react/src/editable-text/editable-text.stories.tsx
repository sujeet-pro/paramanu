import type { Meta, StoryObj } from "@storybook/react"
import { EditableText } from "./editable-text.js"

const meta = {
  title: "Forms/Editable Text",
  tags: ["autodocs"],
  component: EditableText,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    editing: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof EditableText>

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
