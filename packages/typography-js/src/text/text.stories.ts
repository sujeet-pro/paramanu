import type { Meta, StoryObj } from "@storybook/html"
import { textClasses } from "./text.classes.js"
import type { TextClassesOptions } from "./text.types.js"

function createText(args: TextClassesOptions): HTMLElement {
  const el = document.createElement("p")
  el.className = textClasses(args)
  el.textContent = "The quick brown fox jumps over the lazy dog."
  return el
}

const meta = {
  title: "Typography/Text",
  tags: ["autodocs"],
  render: (args) => createText(args as TextClassesOptions),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] },
    weight: { control: "select", options: ["normal", "medium", "semibold", "bold"] },
    align: { control: "select", options: ["left", "center", "right", "justify"] },
    lineHeight: { control: "select", options: ["tight", "normal", "relaxed"] },
    color: {
      control: "select",
      options: ["default", "muted", "dimmed", "primary", "danger", "success", "warning", "info"],
    },
    transform: { control: "select", options: ["uppercase", "lowercase", "capitalize", "none"] },
    decoration: { control: "select", options: ["underline", "line-through", "none"] },
    truncate: { control: "boolean" },
    italic: { control: "boolean" },
    inherit: { control: "boolean" },
    inline: { control: "boolean" },
  },
  args: {},
} satisfies Meta<TextClassesOptions>

export default meta
type Story = StoryObj<TextClassesOptions>

export const Playground: Story = {}
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const Bold: Story = { args: { weight: "bold" } }
export const Muted: Story = { args: { color: "muted" } }
export const Truncated: Story = { args: { truncate: true } }
export const ItalicText: Story = { args: { italic: true } }
