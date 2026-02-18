import type { Meta, StoryObj } from "@storybook/react"
import { Cascader } from "./cascader.js"

const meta = {
  title: "Forms/Cascader",
  tags: ["autodocs"],
  component: Cascader,
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof Cascader>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { children: "Cascader content" } }
export const Open: Story = { args: { open: true, children: "Open cascader" } }
export const Disabled: Story = { args: { disabled: true, children: "Disabled" } }
export const Invalid: Story = { args: { invalid: true, children: "Invalid" } }
export const Filled: Story = { args: { variant: "filled", children: "Filled" } }
