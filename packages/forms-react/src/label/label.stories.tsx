import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { Label } from "./label.js"

const meta = {
  title: "Forms/Label",
  component: Label,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: {
    size: "md",
    onClick: fn(),
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { children: "Email address" },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Label size="xs">Extra small label</Label>
      <Label size="sm">Small label</Label>
      <Label size="md">Medium label</Label>
      <Label size="lg">Large label</Label>
    </div>
  ),
}

export const Small: Story = {
  args: { size: "sm", children: "Small label" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large label" },
}

export const Required: Story = {
  args: { required: true, children: "Required field" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText("Required field")
    await expect(label).toHaveAttribute("aria-required", "true")
  },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled label" },
}

export const WithHtmlFor: Story = {
  args: { htmlFor: "email-input", children: "Email" },
}

export const Accessibility: Story = {
  args: { htmlFor: "name-input", children: "Full name" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByText("Full name")
    await expect(el).toHaveAttribute("for", "name-input")
  },
}

export const Hover: Story = {
  args: { children: "Email address" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { children: "Email address" },
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  args: { children: "Email address" },
  parameters: { pseudo: { active: true } },
}
