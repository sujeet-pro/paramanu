import type { Meta, StoryObj } from "@storybook/react"
import { SimpleGrid } from "./simple-grid.js"

const meta = {
  title: "Primitives/Simple Grid",
  tags: ["autodocs"],
  component: SimpleGrid,
  argTypes: {
    minChildWidth: { control: "select", options: ["2xs", "xs", "sm", "md", "lg", "xl"] },
    columns: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
  },
  args: {},
} satisfies Meta<typeof SimpleGrid>

export default meta
type Story = StoryObj<typeof meta>

const items = Array.from({ length: 6 }, (_, i) => (
  <div key={i} style={{ background: "#e2e8f0", padding: "16px", textAlign: "center" }}>
    {i + 1}
  </div>
))

/** The default playground story. */
export const Playground: Story = {
  args: { columns: 3, gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
}

/** Fixed 3 columns. */
export const FixedColumns: Story = {
  args: { columns: 3, gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
}

/** Responsive auto-fill grid with minChildWidth. */
export const Responsive: Story = {
  args: { minChildWidth: "sm", gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
}
