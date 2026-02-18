import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Checkbox } from "./checkbox.js"

const meta = {
  title: "Forms/Checkbox",
  tags: ["autodocs", "stable"],
  component: Checkbox,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
  args: {
    children: "Accept terms",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Checked: Story = {
  args: { checked: true, children: "Checked" },
}

export const Indeterminate: Story = {
  args: { indeterminate: true, children: "Indeterminate" },
}

export const ExtraSmall: Story = {
  args: { size: "xs", children: "Extra small checkbox" },
}

export const Small: Story = {
  args: { size: "sm", children: "Small checkbox" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large checkbox" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled checkbox" },
}

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, children: "Disabled checked" },
}

export const Invalid: Story = {
  args: { invalid: true, children: "Invalid checkbox" },
}

export const ToggleInteraction: Story = {
  args: { children: "Click me", onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox")
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
  },
}

export const KeyboardInteraction: Story = {
  args: { children: "Tab to me", onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox")
    await userEvent.tab()
    await expect(checkbox).toHaveFocus()
  },
}

export const Accessibility: Story = {
  args: { "aria-label": "Agree to terms", children: "Agree to terms" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("checkbox", { name: "Agree to terms" })
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
