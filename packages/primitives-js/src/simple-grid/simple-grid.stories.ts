import type { Meta, StoryObj } from "@storybook/html-vite"
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
  tags: ["autodocs", "stable"],
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
export const OneColumn: Story = { args: { columns: 1 } }
export const TwoColumns: Story = { args: { columns: 2 } }
export const FourColumns: Story = { args: { columns: 4 } }
export const FiveColumns: Story = { args: { columns: 5 } }
export const SixColumns: Story = { args: { columns: 6 } }
export const Responsive: Story = { args: { minChildWidth: "sm", columns: undefined } }
export const Responsive2xs: Story = { args: { minChildWidth: "2xs", columns: undefined } }
export const ResponsiveXs: Story = { args: { minChildWidth: "xs", columns: undefined } }
export const ResponsiveMd: Story = { args: { minChildWidth: "md", columns: undefined } }
export const ResponsiveLg: Story = { args: { minChildWidth: "lg", columns: undefined } }
export const ResponsiveXl: Story = { args: { minChildWidth: "xl", columns: undefined } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
