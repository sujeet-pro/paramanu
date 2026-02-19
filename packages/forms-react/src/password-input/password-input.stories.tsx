import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { PwdInput } from "./password-input.js"

const meta = {
  title: "Forms/Password Input",
  tags: ["autodocs", "beta"],
  component: PwdInput,
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
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Enter password...",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onVisibilityChange: fn(),
  },
} satisfies Meta<typeof PwdInput>

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

export const Unstyled: Story = {
  args: { variant: "unstyled", placeholder: "Unstyled password" },
}

export const Small: Story = {
  args: { size: "sm", placeholder: "Small password" },
}

export const Large: Story = {
  args: { size: "lg", placeholder: "Large password" },
}

export const ExtraSmall: Story = {
  args: { size: "xs", placeholder: "Extra small password" },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled password" },
}

export const Invalid: Story = {
  args: { invalid: true, placeholder: "Invalid password" },
}

export const FullWidth: Story = {
  args: { fullWidth: true, placeholder: "Full width password" },
}

export const ToggleVisibility: Story = {
  args: { placeholder: "Toggle visibility", onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Toggle visibility")
    await expect(input).toHaveAttribute("type", "password")
    const toggle = canvas.getByRole("button", { name: "Show password" })
    await userEvent.click(toggle)
    await expect(input).toHaveAttribute("type", "text")
  },
}

export const TypeAndToggle: Story = {
  args: { placeholder: "Type then toggle", onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Type then toggle")
    await userEvent.type(input, "secret123")
    await expect(input).toHaveValue("secret123")
    const toggle = canvas.getByRole("button", { name: "Show password" })
    await userEvent.click(toggle)
    await expect(input).toHaveAttribute("type", "text")
  },
}

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-pwd-input")
    await expect(el).toBeTruthy()
    await userEvent.tab()
  },
}

export const Accessibility: Story = {
  args: { placeholder: "A11y test" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("button", { name: "Show password" })
    await expect(toggle).toBeTruthy()
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
