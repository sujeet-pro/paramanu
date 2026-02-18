import type { Meta, StoryObj } from "@storybook/html-vite"
import { dataGridClasses } from "./data-grid.classes.js"
import type { DataGridClassesOptions } from "./data-grid.types.js"

function createDataGrid(args: DataGridClassesOptions): HTMLElement {
  const cls = dataGridClasses(args)
  const root = document.createElement("div")
  root.className = cls.root
  root.setAttribute("role", "grid")
  root.style.gridTemplateColumns = "1fr 1fr 1fr"

  const headerRow = document.createElement("div")
  headerRow.className = cls.row
  headerRow.setAttribute("role", "row")
  for (const text of ["Name", "Role", "Status"]) {
    const col = document.createElement("div")
    col.className = cls.columnHeader
    col.setAttribute("role", "columnheader")
    col.textContent = text
    headerRow.appendChild(col)
  }
  root.appendChild(headerRow)

  for (const [name, role, status] of [["Alice", "Engineer", "Active"], ["Bob", "Designer", "Away"]]) {
    const row = document.createElement("div")
    row.className = cls.row
    row.setAttribute("role", "row")
    for (const text of [name, role, status]) {
      const cell = document.createElement("div")
      cell.className = cls.cell
      cell.setAttribute("role", "gridcell")
      cell.textContent = text
      row.appendChild(cell)
    }
    root.appendChild(row)
  }

  return root
}

const meta = {
  title: "Data Display/Data Grid",
  tags: ["autodocs", "stable"],
  render: (args) => createDataGrid(args as DataGridClassesOptions),
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    bordered: { control: "boolean" },
    hoverable: { control: "boolean" },
    resizable: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<DataGridClassesOptions>

export default meta
type Story = StoryObj<DataGridClassesOptions>

export const Playground: Story = {}
export const Bordered: Story = { args: { bordered: true } }
export const Small: Story = { args: { size: "sm" } }
export const Hoverable: Story = { args: { hoverable: true } }
export const Resizable: Story = { args: { resizable: true } }
export const StickyHeader: Story = { args: { stickyHeader: true } }

export const Hover: Story = {
  args: { hoverable: true },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
