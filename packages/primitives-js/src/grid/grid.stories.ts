import type { Meta, StoryObj } from "@storybook/html"
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
  tags: ["autodocs"],
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

export const FourColumns: Story = {
  args: { columns: 4 },
}
