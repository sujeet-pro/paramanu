import type { Meta, StoryObj } from "@storybook/react"
import { TimePicker } from "./time-picker.js"

const meta = {
  title: "Forms/Time Picker",
  tags: ["autodocs"],
  component: TimePicker,
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof TimePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: {} }
export const Open: Story = { args: { open: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
export const Filled: Story = { args: { variant: "filled" } }
export const Small: Story = { args: { size: "sm" } }
