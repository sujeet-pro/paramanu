import type { Meta, StoryObj } from "@storybook/html"
import { dataTableClasses } from "./data-table.classes.js"
import type { DataTableClassesOptions } from "./data-table.types.js"

interface DataTableArgs extends DataTableClassesOptions {}

function createDataTable(args: DataTableArgs): HTMLElement {
  const cls = dataTableClasses(args)
  const root = document.createElement("div")
  root.className = cls.root

  const toolbar = document.createElement("div")
  toolbar.className = cls.toolbar
  toolbar.textContent = "Search / Filters"
  root.appendChild(toolbar)

  const table = document.createElement("table")
  table.className = cls.table

  const thead = document.createElement("thead")
  const headerRow = document.createElement("tr")
  headerRow.className = cls.row
  for (const text of ["Name", "Email"]) {
    const th = document.createElement("th")
    th.className = cls.headerCell
    th.textContent = text
    headerRow.appendChild(th)
  }
  thead.appendChild(headerRow)
  table.appendChild(thead)

  const tbody = document.createElement("tbody")
  for (const [name, email] of [["Alice", "alice@example.com"], ["Bob", "bob@example.com"]]) {
    const tr = document.createElement("tr")
    tr.className = cls.row
    for (const text of [name, email]) {
      const td = document.createElement("td")
      td.className = cls.cell
      td.textContent = text
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }
  table.appendChild(tbody)
  root.appendChild(table)

  const pagination = document.createElement("div")
  pagination.className = cls.pagination
  pagination.textContent = "Page 1 of 5"
  root.appendChild(pagination)

  return root
}

const meta = {
  title: "Data Display/Data Table",
  tags: ["autodocs"],
  render: (args) => createDataTable(args as DataTableArgs),
  argTypes: {
    variant: { control: "select", options: ["simple", "striped"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    hoverable: { control: "boolean" },
    bordered: { control: "boolean" },
    selectable: { control: "boolean" },
  },
  args: { variant: "simple", size: "md" },
} satisfies Meta<DataTableArgs>

export default meta
type Story = StoryObj<DataTableArgs>

export const Playground: Story = {}
export const Striped: Story = { args: { variant: "striped" } }
export const Selectable: Story = { args: { selectable: true, hoverable: true } }
