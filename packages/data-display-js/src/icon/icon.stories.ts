import type { Meta, StoryObj } from "@storybook/html-vite"
import { iconClasses } from "./icon.classes.js"
import type { IconClassesOptions } from "./icon.types.js"

interface IconArgs extends IconClassesOptions {
  label: string
}

function createIcon(args: IconArgs): HTMLElement {
  const cls = iconClasses({ size: args.size, color: args.color, spin: args.spin })
  const span = document.createElement("span")
  span.className = cls
  if (args.label) {
    span.setAttribute("role", "img")
    span.setAttribute("aria-label", args.label)
  } else {
    span.setAttribute("aria-hidden", "true")
  }
  span.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>'
  return span
}

const meta = {
  title: "Data Display/Icon",
  tags: ["autodocs", "beta"],
  render: (args) => createIcon(args as IconArgs),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    color: { control: "select", options: ["inherit", "primary", "neutral", "danger", "success"] },
    spin: { control: "boolean" },
    label: { control: "text" },
  },
  args: { size: "md", color: "inherit", label: "Circle icon" },
} satisfies Meta<IconArgs>

export default meta
type Story = StoryObj<IconArgs>

export const Playground: Story = {}
export const Primary: Story = { args: { color: "primary" } }
export const Neutral: Story = { args: { color: "neutral" } }
export const Danger: Story = { args: { color: "danger" } }
export const Success: Story = { args: { color: "success" } }
export const ExtraSmall: Story = { args: { size: "xs" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const ExtraLarge: Story = { args: { size: "xl" } }
export const Spinning: Story = { args: { spin: true, label: "Loading" } }
export const Decorative: Story = { args: { label: "" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
