import type { Meta, StoryObj } from "@storybook/react"
import { Select } from "./select.js"

const meta = {
  title: "Forms/Select",
  tags: ["autodocs"],
  component: Select,
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: { placeholder: "Select an option..." },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: (
      <>
        <div role="option">Apple</div>
        <div role="option">Banana</div>
        <div role="option">Cherry</div>
      </>
    ),
  },
}

export const Open: Story = {
  args: {
    open: true,
    children: (
      <>
        <div role="option">Apple</div>
        <div role="option">Banana</div>
        <div role="option">Cherry</div>
      </>
    ),
  },
}

export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
export const Filled: Story = { args: { variant: "filled" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const FullWidth: Story = { args: { fullWidth: true } }
