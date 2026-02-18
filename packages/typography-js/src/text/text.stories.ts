import type { Meta, StoryObj } from "@storybook/html-vite"
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
  tags: ["autodocs", "stable"],
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
export const SizeXs: Story = { args: { size: "xs" } }
export const Small: Story = { args: { size: "sm" } }
export const SizeMd: Story = { args: { size: "md" } }
export const Large: Story = { args: { size: "lg" } }
export const SizeXl: Story = { args: { size: "xl" } }
export const Size2xl: Story = { args: { size: "2xl" } }
export const Size3xl: Story = { args: { size: "3xl" } }
export const WeightNormal: Story = { args: { weight: "normal" } }
export const WeightMedium: Story = { args: { weight: "medium" } }
export const WeightSemibold: Story = { args: { weight: "semibold" } }
export const Bold: Story = { args: { weight: "bold" } }
export const AlignCenter: Story = { args: { align: "center" } }
export const AlignRight: Story = { args: { align: "right" } }
export const AlignJustify: Story = { args: { align: "justify" } }
export const LineHeightTight: Story = { args: { lineHeight: "tight" } }
export const LineHeightRelaxed: Story = { args: { lineHeight: "relaxed" } }
export const Muted: Story = { args: { color: "muted" } }
export const Dimmed: Story = { args: { color: "dimmed" } }
export const ColorPrimary: Story = { args: { color: "primary" } }
export const ColorDanger: Story = { args: { color: "danger" } }
export const ColorSuccess: Story = { args: { color: "success" } }
export const ColorWarning: Story = { args: { color: "warning" } }
export const ColorInfo: Story = { args: { color: "info" } }
export const TransformUppercase: Story = { args: { transform: "uppercase" } }
export const TransformLowercase: Story = { args: { transform: "lowercase" } }
export const TransformCapitalize: Story = { args: { transform: "capitalize" } }
export const DecorationUnderline: Story = { args: { decoration: "underline" } }
export const DecorationLineThrough: Story = { args: { decoration: "line-through" } }
export const Truncated: Story = { args: { truncate: true } }
export const ItalicText: Story = { args: { italic: true } }
export const Inline: Story = { args: { inline: true } }
export const Inherit: Story = { args: { inherit: true } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
