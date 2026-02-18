import type { Meta, StoryObj } from "@storybook/html"
import { simpleGridClasses } from "./simple-grid.classes.js"
import type { SimpleGridClassesOptions } from "./simple-grid.types.js"

interface SimpleGridArgs extends SimpleGridClassesOptions {
  itemCount: number
}

function createSimpleGrid(args: SimpleGridArgs): HTMLElement {
  const el = document.createElement("div")
  el.className = simpleGridClasses({
    minChildWidth: args.minChildWidth,
    columns: args.columns,
    gap: args.gap,
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
  title: "Primitives/Simple Grid",
  tags: ["autodocs"],
  render: (args) => createSimpleGrid(args as SimpleGridArgs),
  argTypes: {
    minChildWidth: { control: "select", options: ["2xs", "xs", "sm", "md", "lg", "xl"] },
    columns: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    itemCount: { control: "number" },
  },
  args: { columns: 3, gap: "4", itemCount: 6 },
} satisfies Meta<SimpleGridArgs>

export default meta
type Story = StoryObj<SimpleGridArgs>

export const Playground: Story = {}
export const Responsive: Story = { args: { minChildWidth: "sm", columns: undefined } }
