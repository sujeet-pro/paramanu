import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { Textarea } from "./textarea.js"

const meta = {
  title: "Forms/Textarea",
  tags: ["autodocs"],
  component: Textarea,
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "unstyled"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    readOnly: { control: "boolean" },
    fullWidth: { control: "boolean" },
    rows: { control: "number" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Enter text...",
    rows: 3,
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Outline: Story = {
  args: { variant: "outline", placeholder: "Outline textarea" },
}

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Filled textarea" },
}

export const Unstyled: Story = {
  args: { variant: "unstyled", placeholder: "Unstyled textarea" },
}

export const Small: Story = {
  args: { size: "sm", placeholder: "Small textarea" },
}

export const Large: Story = {
  args: { size: "lg", placeholder: "Large textarea" },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled textarea" },
}

export const Invalid: Story = {
  args: { invalid: true, placeholder: "Invalid textarea" },
}

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: "Read-only content" },
}

export const NoResize: Story = {
  args: { resize: "none", placeholder: "Cannot resize" },
}

export const WithTyping: Story = {
  args: { placeholder: "Type here..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByPlaceholderText("Type here...")
    await userEvent.type(textarea, "Hello World")
    await expect(textarea).toHaveValue("Hello World")
  },
}
