import type { Meta, StoryObj } from "@storybook/react"
import { Wrap } from "./wrap.js"

const meta = {
  title: "Primitives/Wrap",
  tags: ["autodocs"],
  component: Wrap,
  argTypes: {
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around", "evenly"] },
    direction: { control: "select", options: ["row", "row-reverse"] },
  },
  args: {},
} satisfies Meta<typeof Wrap>

export default meta
type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 10 }, (_, i) => (
  <div key={i} style={{ background: "#e2e8f0", padding: "4px 12px", borderRadius: "4px" }}>
    Tag {i + 1}
  </div>
))

/** The default playground story. */
export const Playground: Story = {
  args: { gap: "3" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Wrap with center alignment. */
export const CenterAligned: Story = {
  args: { gap: "3", align: "center", justify: "center" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Wrap with reverse direction. */
export const Reversed: Story = {
  args: { gap: "3", direction: "row-reverse" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}
