import type { Meta, StoryObj } from "@storybook/react"
import { ColorPicker } from "./color-picker.js"

const meta = {
  title: "Forms/Color Picker",
  tags: ["autodocs"],
  component: ColorPicker,
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    open: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { children: "Color picker content" } }
export const Open: Story = { args: { open: true, children: "Open picker" } }
export const Disabled: Story = { args: { disabled: true, children: "Disabled picker" } }
export const Small: Story = { args: { size: "sm", children: "Small picker" } }
