import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { FormControl } from "./form-control.js"

const meta = {
  title: "Forms/Form Control",
  component: FormControl,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: { orientation: "vertical" },
} satisfies Meta<typeof FormControl>

export default meta
type Story = StoryObj<typeof FormControl>

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
