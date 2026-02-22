import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Grid } from "./grid.js"

const meta = {
  title: "Primitives/Grid",
  tags: ["autodocs", "beta"],
  component: Grid,
  argTypes: {
    columns: { control: "select", options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "none"] },
    rows: { control: "select", options: [1, 2, 3, 4, 5, 6, "none"] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    rowGap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    columnGap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
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

/** Two column grid. */
export const TwoColumns: Story = {
  args: { columns: 2, gap: "4" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
}

/** Six column grid. */
export const SixColumns: Story = {
  args: { columns: 6, gap: "4" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
}

/** Twelve column grid. */
export const TwelveColumns: Story = {
  args: { columns: 12, gap: "4" },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} style={{ background: "#e2e8f0", padding: "16px", textAlign: "center" }}>
          {i + 1}
        </div>
      ))}
    </Grid>
  ),
}

/** Grid with explicit rows. */
export const TwoRows: Story = {
  args: { rows: 2, columns: 3, gap: "4" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
}

/** Column flow direction. */
export const FlowColumn: Story = {
  args: { flow: "column", rows: 3, gap: "4" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
}

/** Dense flow. */
export const FlowDense: Story = {
  args: { flow: "dense", columns: 3, gap: "4" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
}

/** Inline grid. */
export const InlineGrid: Story = {
  args: { inline: true, columns: 2, gap: "4" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
}

/** Align items center. */
export const AlignCenter: Story = {
  args: { columns: 3, gap: "4", align: "center" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
}

/** Justify content center. */
export const JustifyCenter: Story = {
  args: { columns: 3, gap: "4", justify: "center" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
}

export const Hover: Story = {
  args: { columns: 3, gap: "4" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { columns: 3, gap: "4" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  args: { columns: 3, gap: "4" },
  render: (args) => <Grid {...args}>{gridItems}</Grid>,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-grid")
    await expect(el).toBeTruthy()
  },
}
