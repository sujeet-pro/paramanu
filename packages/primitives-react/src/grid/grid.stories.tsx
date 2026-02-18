import type { Meta, StoryObj } from "@storybook/react"
import { Grid } from "./grid.js"

const meta = {
  title: "Primitives/Grid",
  tags: ["autodocs"],
  component: Grid,
  argTypes: {
    columns: { control: "select", options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "none"] },
    rows: { control: "select", options: [1, 2, 3, 4, 5, 6, "none"] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    rowGap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    columnGap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around", "evenly"] },
    inline: { control: "boolean" },
    flow: { control: "select", options: ["row", "column", "dense", "row-dense", "column-dense"] },
  },
  args: {},
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const gridItems = Array.from({ length: 6 }, (_, i) => (
  <div key={i} style={{ background: "#e2e8f0", padding: "16px", textAlign: "center" }}>
    {i + 1}
  </div>
))

/** The default playground story. */
export const Playground: Story = {
  args: { columns: 3, gap: "4" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
}

/** Three column grid. */
export const ThreeColumns: Story = {
  args: { columns: 3, gap: "4" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
}

/** Four column grid. */
export const FourColumns: Story = {
  args: { columns: 4, gap: "4" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
}

/** Grid with different row and column gaps. */
export const MixedGap: Story = {
  args: { columns: 3, rowGap: "6", columnGap: "2" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
}
