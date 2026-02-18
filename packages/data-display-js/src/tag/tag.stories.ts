import type { Meta, StoryObj } from "@storybook/html-vite"
import { tagClasses } from "./tag.classes.js"
import type { TagClassesOptions } from "./tag.types.js"

interface TagArgs extends TagClassesOptions {
  label: string
}

function createTag(args: TagArgs): HTMLSpanElement {
  const cls = tagClasses({
    variant: args.variant,
    size: args.size,
    color: args.color,
    removable: args.removable,
    interactive: args.interactive,
    disabled: args.disabled,
  })
  const span = document.createElement("span")
  span.className = cls.root
  span.textContent = args.label
  if (args.removable) {
    const btn = document.createElement("button")
    btn.type = "button"
    btn.className = cls.remove
    btn.setAttribute("aria-label", "Remove")
    if (args.disabled) btn.disabled = true
    span.appendChild(btn)
  }
  return span
}

const meta = {
  title: "Data Display/Tag",
  tags: ["autodocs", "stable"],
  render: (args) => createTag(args as TagArgs),
  argTypes: {
    variant: { control: "select", options: ["filled", "outline", "subtle"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "select", options: ["primary", "neutral", "danger", "success"] },
    removable: { control: "boolean" },
    interactive: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "Tag",
    variant: "filled",
    size: "md",
    color: "primary",
  },
} satisfies Meta<TagArgs>

export default meta
type Story = StoryObj<TagArgs>

export const Playground: Story = {}
export const Filled: Story = { args: { variant: "filled", label: "Filled" } }
export const Outline: Story = { args: { variant: "outline", label: "Outline" } }
export const Subtle: Story = { args: { variant: "subtle", label: "Subtle" } }
export const Danger: Story = { args: { color: "danger", label: "Error" } }
export const Success: Story = { args: { color: "success", label: "Active" } }
export const Neutral: Story = { args: { color: "neutral", label: "Neutral" } }
export const Small: Story = { args: { size: "sm", label: "SM" } }
export const Large: Story = { args: { size: "lg", label: "LG" } }
export const Removable: Story = { args: { removable: true, label: "Removable" } }
export const Interactive: Story = { args: { interactive: true, label: "Clickable" } }
export const Disabled: Story = { args: { disabled: true, label: "Disabled" } }

export const Hover: Story = {
  args: { interactive: true, label: "Hover" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { interactive: true, label: "Focus" },
  parameters: { pseudo: { focusVisible: true } },
}
