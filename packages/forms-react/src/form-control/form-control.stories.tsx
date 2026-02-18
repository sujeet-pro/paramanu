import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { FormControl } from "./form-control.js"

const meta = {
  title: "Forms/Form Control",
  component: FormControl,
  tags: ["autodocs", "stable"],
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: {
    orientation: "vertical",
    onChange: fn(),
  },
} satisfies Meta<typeof FormControl>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { children: "Form control content" },
}

export const Horizontal: Story = {
  args: { orientation: "horizontal", children: "Horizontal form control" },
}

export const WithHelperText: Story = {
  args: { helperText: "This is helper text", children: "Label" },
}

export const WithErrorText: Story = {
  args: { invalid: true, errorText: "This field is required", children: "Label" },
}

export const Required: Story = {
  args: { required: true, children: "Required field" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled control" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole("group")
    await expect(group).toHaveClass("pm-form-control--disabled")
  },
}

export const Accessibility: Story = {
  args: { "aria-label": "Email field group", children: "Email" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("group", { name: "Email field group" })
    await expect(el).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { children: "Form control content" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { children: "Form control content" },
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  args: { children: "Form control content" },
  parameters: { pseudo: { active: true } },
}
