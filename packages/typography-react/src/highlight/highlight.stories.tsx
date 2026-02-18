import type { Meta, StoryObj } from "@storybook/react"
import { Highlight } from "./highlight.js"

const meta = {
  title: "Typography/Highlight",
  tags: ["autodocs"],
  component: Highlight,
  argTypes: {
    color: { control: "select", options: ["primary", "danger", "success", "warning", "info", "neutral"] },
    variant: { control: "select", options: ["filled", "outline", "text"] },
  },
  args: {},
} satisfies Meta<typeof Highlight>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <p>
      This sentence has a <Highlight {...args}>highlighted word</Highlight> in it.
    </p>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(["primary", "danger", "success", "warning", "info", "neutral"] as const).map((c) => (
        <Highlight key={c} color={c}>
          {c}
        </Highlight>
      ))}
    </div>
  ),
}

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => <Highlight {...args}>outline highlight</Highlight>,
}

export const TextVariant: Story = {
  args: { variant: "text", color: "danger" },
  render: (args) => <Highlight {...args}>text-only highlight</Highlight>,
}
