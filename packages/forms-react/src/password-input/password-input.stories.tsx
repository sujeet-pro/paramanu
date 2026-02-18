import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { PasswordInput } from "./password-input.js"

const meta = {
  title: "Forms/Password Input",
  tags: ["autodocs"],
  component: PasswordInput,
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
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Enter password...",
  },
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Outline: Story = {
  args: { variant: "outline", placeholder: "Outline password" },
}

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Filled password" },
}

export const Small: Story = {
  args: { size: "sm", placeholder: "Small password" },
}

export const Large: Story = {
  args: { size: "lg", placeholder: "Large password" },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled password" },
}

export const Invalid: Story = {
  args: { invalid: true, placeholder: "Invalid password" },
}

export const ToggleVisibility: Story = {
  args: { placeholder: "Toggle visibility" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Toggle visibility")
    await expect(input).toHaveAttribute("type", "password")
    const toggle = canvas.getByRole("button", { name: "Show password" })
    await userEvent.click(toggle)
    await expect(input).toHaveAttribute("type", "text")
  },
}
