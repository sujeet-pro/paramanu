import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { SimpleGrid } from "./simple-grid.js"

const meta = {
  title: "Primitives/Simple Grid",
  tags: ["autodocs", "stable"],
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

/** One column. */
export const OneColumn: Story = {
  args: { columns: 1, gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
}

/** Two columns. */
export const TwoColumns: Story = {
  args: { columns: 2, gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
}

/** Four columns. */
export const FourColumns: Story = {
  args: { columns: 4, gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
}

/** Five columns. */
export const FiveColumns: Story = {
  args: { columns: 5, gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
}

/** Six columns. */
export const SixColumns: Story = {
  args: { columns: 6, gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
}

/** Responsive 2xs min child width. */
export const Responsive2xs: Story = {
  args: { minChildWidth: "2xs", gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
}

/** Responsive md min child width. */
export const ResponsiveMd: Story = {
  args: { minChildWidth: "md", gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
}

export const Hover: Story = {
  args: { columns: 3, gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { columns: 3, gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  args: { columns: 3, gap: "4" },
  render: (args) => <SimpleGrid {...args}>{items}</SimpleGrid>,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-simple-grid")
    await expect(el).toBeTruthy()
  },
}
