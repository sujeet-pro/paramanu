import type { Meta, StoryObj } from "@storybook/html-vite"
import { tableClasses } from "./table.classes.js"
import type { TableClassesOptions } from "./table.types.js"

interface TableArgs extends TableClassesOptions {}

function createTable(args: TableArgs): HTMLElement {
  const cls = tableClasses(args)
  const container = document.createElement("div")
  container.className = cls.container

  const table = document.createElement("table")
  table.className = cls.root

  const thead = document.createElement("thead")
  thead.className = cls.head
  const headerRow = document.createElement("tr")
  headerRow.className = cls.row
  for (const text of ["Name", "Role", "Status"]) {
    const th = document.createElement("th")
    th.className = cls.headerCell
    th.textContent = text
    headerRow.appendChild(th)
  }
  thead.appendChild(headerRow)
  table.appendChild(thead)

  const tbody = document.createElement("tbody")
  tbody.className = cls.body
  const data = [
    ["Alice", "Engineer", "Active"],
    ["Bob", "Designer", "Away"],
    ["Charlie", "Manager", "Active"],
  ]
  for (const row of data) {
    const tr = document.createElement("tr")
    tr.className = cls.row
    for (const text of row) {
      const td = document.createElement("td")
      td.className = cls.cell
      td.textContent = text
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }
  table.appendChild(tbody)
  container.appendChild(table)
  return container
}

const meta = {
  title: "Data Display/Table",
  tags: ["autodocs", "beta"],
  render: (args) => createTable(args as TableArgs),
  argTypes: {
    variant: { control: "select", options: ["simple", "striped"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    layout: { control: "select", options: ["auto", "fixed"] },
    hoverable: { control: "boolean" },
    bordered: { control: "boolean" },
    stickyHeader: { control: "boolean" },
  },
  args: {
    variant: "simple",
    size: "md",
  },
} satisfies Meta<TableArgs>

export default meta
type Story = StoryObj<TableArgs>

export const Playground: Story = {}
export const Striped: Story = { args: { variant: "striped" } }
export const Bordered: Story = { args: { bordered: true } }
export const Hoverable: Story = { args: { hoverable: true } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const FixedLayout: Story = { args: { layout: "fixed" } }
export const StickyHeader: Story = { args: { stickyHeader: true } }

export const Hover: Story = {
  args: { hoverable: true },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
