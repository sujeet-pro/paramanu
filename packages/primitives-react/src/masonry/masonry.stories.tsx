import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Masonry } from "./masonry.js"

const meta = {
  title: "Primitives/Masonry",
  tags: ["autodocs", "beta"],
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

/** Five columns. */
export const FiveColumns: Story = {
  args: { columns: 5 },
  render: (args) => <Masonry {...args}>{items}</Masonry>,
}

/** Six columns. */
export const SixColumns: Story = {
  args: { columns: 6 },
  render: (args) => <Masonry {...args}>{items}</Masonry>,
}

export const Hover: Story = {
  render: (args) => <Masonry {...args}>{items}</Masonry>,
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: (args) => <Masonry {...args}>{items}</Masonry>,
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  render: (args) => <Masonry {...args}>{items}</Masonry>,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-masonry")
    await expect(el).toBeTruthy()
  },
}
