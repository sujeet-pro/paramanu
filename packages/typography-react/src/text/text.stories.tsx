import type { Meta, StoryObj } from "@storybook/react"
import { Text } from "./text.js"

const meta = {
  title: "Typography/Text",
  tags: ["autodocs"],
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
