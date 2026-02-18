import type { Meta, StoryObj } from "@storybook/html"
import { highlightClasses } from "./highlight.classes.js"
import type { HighlightClassesOptions } from "./highlight.types.js"

function createHighlight(args: HighlightClassesOptions): HTMLElement {
  const el = document.createElement("mark")
  el.className = highlightClasses(args)
  el.textContent = "highlighted text"
  return el
}

const meta = {
  title: "Typography/Highlight",
  tags: ["autodocs"],
  render: (args) => createHighlight(args as HighlightClassesOptions),
  argTypes: {
    color: { control: "select", options: ["primary", "danger", "success", "warning", "info", "neutral"] },
    variant: { control: "select", options: ["filled", "outline", "text"] },
  },
  args: {},
} satisfies Meta<HighlightClassesOptions>

export default meta
type Story = StoryObj<HighlightClassesOptions>

export const Playground: Story = {}
export const Danger: Story = { args: { color: "danger" } }
export const Success: Story = { args: { color: "success" } }
export const Outline: Story = { args: { variant: "outline" } }
export const TextVariant: Story = { args: { variant: "text", color: "danger" } }
