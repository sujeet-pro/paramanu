import type { Meta, StoryObj } from "@storybook/html-vite"
import { gridClasses } from "./grid.classes.js"
import type { GridClassesOptions } from "./grid.types.js"

interface GridArgs extends GridClassesOptions {
  itemCount: number
}

function createGrid(args: GridArgs): HTMLElement {
  const el = document.createElement("div")
  el.className = gridClasses({
    columns: args.columns,
    rows: args.rows,
    gap: args.gap,
    rowGap: args.rowGap,
    columnGap: args.columnGap,
    align: args.align,
    justify: args.justify,
    inline: args.inline,
    flow: args.flow,
  })
  for (let i = 1; i <= (args.itemCount || 6); i++) {
    const child = document.createElement("div")
    child.style.background = "#e2e8f0"
    child.style.padding = "16px"
    child.style.textAlign = "center"
    child.textContent = String(i)
    el.appendChild(child)
  }
  return el
}

const meta = {
  title: "Primitives/Grid",
  tags: ["autodocs", "stable"],
  render: (args) => createGrid(args as GridArgs),
  argTypes: {
    columns: { control: "select", options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "none"] },
    rows: { control: "select", options: [1, 2, 3, 4, 5, 6, "none"] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around", "evenly"] },
    inline: { control: "boolean" },
    flow: { control: "select", options: ["row", "column", "dense", "row-dense", "column-dense"] },
    itemCount: { control: "number" },
  },
  args: { columns: 3, gap: "4", itemCount: 6 },
} satisfies Meta<GridArgs>

export default meta
type Story = StoryObj<GridArgs>

export const Playground: Story = {}

export const TwoColumns: Story = { args: { columns: 2 } }
export const ThreeColumns: Story = { args: { columns: 3 } }
export const FourColumns: Story = { args: { columns: 4 } }
export const SixColumns: Story = { args: { columns: 6 } }
export const TwelveColumns: Story = { args: { columns: 12, itemCount: 12 } }

export const TwoRows: Story = { args: { rows: 2, columns: 3 } }
export const FlowColumn: Story = { args: { flow: "column", rows: 3 } }
export const FlowDense: Story = { args: { flow: "dense", columns: 3 } }

export const MixedGap: Story = { args: { columns: 3, rowGap: "6", columnGap: "2" } }
export const InlineGrid: Story = { args: { inline: true, columns: 2 } }
export const AlignCenter: Story = { args: { columns: 3, align: "center" } }
export const JustifyCenter: Story = { args: { columns: 3, justify: "center" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
