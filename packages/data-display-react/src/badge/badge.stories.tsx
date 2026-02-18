import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Badge } from "./badge.js"

const meta = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs", "stable"],
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
export const Neutral: Story = { args: { color: "neutral", children: "Neutral" } }
export const Pill: Story = { args: { pill: true, children: "99+" } }
export const Small: Story = { args: { size: "sm", children: "SM" } }
export const Large: Story = { args: { size: "lg", children: "LG" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  args: { children: "Test Badge" },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-badge")
    await expect(el).toBeTruthy()
  },
}
