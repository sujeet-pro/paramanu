import type { Meta, StoryObj } from "@storybook/html-vite"
import { blockquoteClasses } from "./blockquote.classes.js"
import type { BlockquoteClassesOptions } from "./blockquote.types.js"

function createBlockquote(args: BlockquoteClassesOptions): HTMLElement {
  const el = document.createElement("blockquote")
  el.className = blockquoteClasses(args)
  el.textContent = "Life is what happens when you are busy making other plans."
  return el
}

const meta = {
  title: "Typography/Blockquote",
  tags: ["autodocs", "beta"],
  render: (args) => createBlockquote(args as BlockquoteClassesOptions),
  argTypes: {
    variant: { control: "select", options: ["default", "accent", "filled"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: {
      control: "select",
      options: ["primary", "neutral", "danger", "success", "warning", "info"],
    },
    withCite: { control: "boolean" },
    withIcon: { control: "boolean" },
  },
  args: {},
} satisfies Meta<BlockquoteClassesOptions>

export default meta
type Story = StoryObj<BlockquoteClassesOptions>

export const Playground: Story = {}
export const Accent: Story = { args: { variant: "accent", color: "primary" } }
export const Filled: Story = { args: { variant: "filled", color: "info" } }
export const WithIcon: Story = { args: { withIcon: true } }
export const WithCite: Story = { args: { withCite: true } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const ColorNeutral: Story = { args: { color: "neutral" } }
export const ColorDanger: Story = { args: { color: "danger" } }
export const ColorSuccess: Story = { args: { color: "success" } }
export const ColorWarning: Story = { args: { color: "warning" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
