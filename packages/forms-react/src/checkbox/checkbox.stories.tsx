import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { Checkbox } from "./checkbox.js"

const meta = {
  title: "Forms/Checkbox",
  tags: ["autodocs"],
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

export const ClickToToggle: Story = {
  args: { children: "Click me" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox")
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
  },
}
