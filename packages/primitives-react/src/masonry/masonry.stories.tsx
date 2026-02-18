import type { Meta, StoryObj } from "@storybook/react"
import { Masonry } from "./masonry.js"

const meta = {
  title: "Primitives/Masonry",
  tags: ["autodocs"],
  component: Masonry,
  argTypes: {
    columns: { control: "select", options: [2, 3, 4, 5, 6] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
  },
  args: { columns: 3, gap: "4" },
} satisfies Meta<typeof Masonry>

export default meta
type Story = StoryObj<typeof meta>

const heights = [120, 200, 160, 80, 240, 100, 180, 140, 220]
const items = heights.map((h, i) => (
  <div key={i} style={{ background: "#e2e8f0", height: `${h}px`, display: "flex", alignItems: "center", justifyContent: "center" }}>
    {i + 1}
  </div>
))

/** The default playground story. */
export const Playground: Story = {
  render: (args) => <Masonry {...args}>{items}</Masonry>,
}

/** Two columns. */
export const TwoColumns: Story = {
  args: { columns: 2 },
  render: (args) => <Masonry {...args}>{items}</Masonry>,
}

/** Four columns. */
export const FourColumns: Story = {
  args: { columns: 4 },
  render: (args) => <Masonry {...args}>{items}</Masonry>,
}
