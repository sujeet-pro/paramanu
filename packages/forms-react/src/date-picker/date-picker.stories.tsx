import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { DatePicker } from "./date-picker.js"

const meta = {
  title: "Forms/Date Picker",
  tags: ["autodocs", "stable"],
  component: DatePicker,
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Select date...",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: {} }
export const Open: Story = { args: { open: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
export const Filled: Story = { args: { variant: "filled" } }
export const Unstyled: Story = { args: { variant: "unstyled" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }

export const TypeInteraction: Story = {
  args: { placeholder: "Enter date..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Enter date...")
    await userEvent.type(input, "2025-01-15")
    await expect(input).toHaveValue("2025-01-15")
  },
}

export const KeyboardInteraction: Story = {
  args: { placeholder: "Select date..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Select date...")
    await userEvent.tab()
    await expect(input).toHaveFocus()
  },
}

export const Accessibility: Story = {
  args: { "aria-label": "Appointment date", placeholder: "Pick a date..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("combobox")
    await expect(el).toBeInTheDocument()
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
