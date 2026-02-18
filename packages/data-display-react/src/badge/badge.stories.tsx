import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge.js"

const meta = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["filled", "outline", "subtle"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "select", options: ["primary", "neutral", "danger", "success"] },
    pill: { control: "boolean" },
  },
  args: {
    children: "Badge",
    variant: "filled",
    size: "md",
    color: "primary",
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Filled: Story = { args: { variant: "filled", children: "Filled" } }
export const Outline: Story = { args: { variant: "outline", children: "Outline" } }
export const Subtle: Story = { args: { variant: "subtle", children: "Subtle" } }
export const Danger: Story = { args: { color: "danger", children: "Error" } }
export const Success: Story = { args: { color: "success", children: "Active" } }
export const Pill: Story = { args: { pill: true, children: "99+" } }
export const Small: Story = { args: { size: "sm", children: "SM" } }
export const Large: Story = { args: { size: "lg", children: "LG" } }
