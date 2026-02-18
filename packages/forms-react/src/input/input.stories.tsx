import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { Input } from "./input.js"

const meta = {
  title: "Forms/Input",
  tags: ["autodocs"],
  component: Input,
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "unstyled"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    readOnly: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Enter text...",
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Outline: Story = {
  args: { variant: "outline", placeholder: "Outline input" },
}

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Filled input" },
}

export const Unstyled: Story = {
  args: { variant: "unstyled", placeholder: "Unstyled input" },
}

export const Small: Story = {
  args: { size: "sm", placeholder: "Small input" },
}

export const Large: Story = {
  args: { size: "lg", placeholder: "Large input" },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input" },
}

export const Invalid: Story = {
  args: { invalid: true, placeholder: "Invalid input" },
}

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: "Read-only value" },
}

export const FullWidth: Story = {
  args: { fullWidth: true, placeholder: "Full width input" },
}

export const WithTyping: Story = {
  args: { placeholder: "Type here..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Type here...")
    await userEvent.type(input, "Hello World")
    await expect(input).toHaveValue("Hello World")
  },
}
