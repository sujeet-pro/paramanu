import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Text } from "./text.js"

const meta = {
  title: "Typography/Text",
  tags: ["autodocs", "beta"],
  component: Text,
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
    lineClamp: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    as: { control: "select", options: ["p", "span", "div", "label", "em", "strong", "small"] },
  },
  args: {},
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <Text {...args}>The quick brown fox jumps over the lazy dog.</Text>,
}

export const Sizes: Story = {
  render: () => (
    <div>
      {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const).map((s) => (
        <Text key={s} size={s}>
          Text size {s}
        </Text>
      ))}
    </div>
  ),
}

export const Weights: Story = {
  render: () => (
    <div>
      {(["normal", "medium", "semibold", "bold"] as const).map((w) => (
        <Text key={w} weight={w}>
          Weight {w}
        </Text>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div>
      {(["default", "muted", "dimmed", "primary", "danger", "success", "warning", "info"] as const).map((c) => (
        <Text key={c} color={c}>
          Color {c}
        </Text>
      ))}
    </div>
  ),
}

export const Truncated: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <Text truncate>This is a very long text that should be truncated with an ellipsis at the end.</Text>
    </div>
  ),
}

export const LineClamp: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <Text lineClamp={2}>
        This is a long paragraph that should be clamped after two lines. It contains enough text to
        demonstrate the multi-line truncation feature of the Text component.
      </Text>
    </div>
  ),
}

export const Italic: Story = {
  args: { italic: true },
  render: (args) => <Text {...args}>Italic text style.</Text>,
}

export const Inline: Story = {
  render: () => (
    <p>
      This is a paragraph with <Text inline weight="bold">inline bold</Text> text.
    </p>
  ),
}

export const TransformUppercase: Story = {
  args: { transform: "uppercase" },
  render: (args) => <Text {...args}>uppercase text transform.</Text>,
}

export const TransformLowercase: Story = {
  args: { transform: "lowercase" },
  render: (args) => <Text {...args}>LOWERCASE TEXT TRANSFORM.</Text>,
}

export const TransformCapitalize: Story = {
  args: { transform: "capitalize" },
  render: (args) => <Text {...args}>capitalize text transform.</Text>,
}

export const DecorationUnderline: Story = {
  args: { decoration: "underline" },
  render: (args) => <Text {...args}>Underlined text.</Text>,
}

export const DecorationLineThrough: Story = {
  args: { decoration: "line-through" },
  render: (args) => <Text {...args}>Strikethrough text.</Text>,
}

export const AlignCenter: Story = {
  args: { align: "center" },
  render: (args) => <Text {...args}>Centered text.</Text>,
}

export const AlignRight: Story = {
  args: { align: "right" },
  render: (args) => <Text {...args}>Right-aligned text.</Text>,
}

export const AlignJustify: Story = {
  args: { align: "justify" },
  render: (args) => <Text {...args}>Justified text alignment for longer content.</Text>,
}

export const Dimmed: Story = {
  args: { color: "dimmed" },
  render: (args) => <Text {...args}>Dimmed color text.</Text>,
}

export const ColorPrimary: Story = {
  args: { color: "primary" },
  render: (args) => <Text {...args}>Primary color text.</Text>,
}

export const ColorDanger: Story = {
  args: { color: "danger" },
  render: (args) => <Text {...args}>Danger color text.</Text>,
}

export const ColorSuccess: Story = {
  args: { color: "success" },
  render: (args) => <Text {...args}>Success color text.</Text>,
}

export const ColorWarning: Story = {
  args: { color: "warning" },
  render: (args) => <Text {...args}>Warning color text.</Text>,
}

export const ColorInfo: Story = {
  args: { color: "info" },
  render: (args) => <Text {...args}>Info color text.</Text>,
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => <Text {...args}>Hover state text.</Text>,
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => <Text {...args}>Focus visible text.</Text>,
}

export const RenderTest: Story = {
  args: { children: "Test content" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}

export const SemanticHTML: Story = {
  render: () => <Text>Semantic paragraph element.</Text>,
  play: async ({ canvasElement }) => {
    const p = canvasElement.querySelector("p")
    await expect(p).toBeTruthy()
  },
}

export const SemanticSpan: Story = {
  render: () => <Text as="span">Span element text.</Text>,
  play: async ({ canvasElement }) => {
    const span = canvasElement.querySelector("span")
    await expect(span).toBeTruthy()
  },
}
