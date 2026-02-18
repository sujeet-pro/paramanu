import type { Meta, StoryObj } from "@storybook/html-vite"
import { badgeClasses } from "./badge.classes.js"
import type { BadgeClassesOptions } from "./badge.types.js"

interface BadgeArgs extends BadgeClassesOptions {
  label: string
}

function createBadge(args: BadgeArgs): HTMLSpanElement {
  const span = document.createElement("span")
  span.className = badgeClasses({
    variant: args.variant,
    size: args.size,
    color: args.color,
    pill: args.pill,
  })
  span.textContent = args.label
  return span
}

const meta = {
  title: "Data Display/Badge",
  tags: ["autodocs", "stable"],
  render: (args) => createBadge(args as BadgeArgs),
  argTypes: {
    variant: { control: "select", options: ["filled", "outline", "subtle"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "select", options: ["primary", "neutral", "danger", "success"] },
    pill: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "Badge",
    variant: "filled",
    size: "md",
    color: "primary",
  },
} satisfies Meta<BadgeArgs>

export default meta
type Story = StoryObj<BadgeArgs>

export const Playground: Story = {}
export const Filled: Story = { args: { variant: "filled", label: "Filled" } }
export const Outline: Story = { args: { variant: "outline", label: "Outline" } }
export const Subtle: Story = { args: { variant: "subtle", label: "Subtle" } }
export const Danger: Story = { args: { color: "danger", label: "Error" } }
export const Success: Story = { args: { color: "success", label: "Active" } }
export const Neutral: Story = { args: { color: "neutral", label: "Neutral" } }
export const Pill: Story = { args: { pill: true, label: "99+" } }
export const Small: Story = { args: { size: "sm", label: "SM" } }
export const Large: Story = { args: { size: "lg", label: "LG" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
