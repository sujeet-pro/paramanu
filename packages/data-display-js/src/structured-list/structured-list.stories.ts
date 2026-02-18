import type { Meta, StoryObj } from "@storybook/html"
import { structuredListClasses } from "./structured-list.classes.js"
import type { StructuredListClassesOptions } from "./structured-list.types.js"

function createStructuredList(args: StructuredListClassesOptions): HTMLElement {
  const cls = structuredListClasses(args)
  const root = document.createElement("div")
  root.className = cls.root
  root.setAttribute("role", "table")

  const head = document.createElement("div")
  head.className = cls.head
  const headerRow = document.createElement("div")
  headerRow.className = cls.row
  headerRow.setAttribute("role", "row")
  for (const text of ["Name", "Value"]) {
    const hc = document.createElement("div")
    hc.className = cls.headerCell
    hc.setAttribute("role", "columnheader")
    hc.textContent = text
    headerRow.appendChild(hc)
  }
  head.appendChild(headerRow)
  root.appendChild(head)

  const body = document.createElement("div")
  body.className = cls.body
  for (const [n, v] of [["CPU", "85%"], ["Memory", "4.2 GB"]]) {
    const row = document.createElement("div")
    row.className = cls.row
    row.setAttribute("role", "row")
    for (const text of [n, v]) {
      const cell = document.createElement("div")
      cell.className = cls.cell
      cell.setAttribute("role", "cell")
      cell.textContent = text
      row.appendChild(cell)
    }
    body.appendChild(row)
  }
  root.appendChild(body)

  return root
}

const meta = {
  title: "Data Display/Structured List",
  tags: ["autodocs"],
  render: (args) => createStructuredList(args as StructuredListClassesOptions),
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    selectable: { control: "boolean" },
    bordered: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<StructuredListClassesOptions>

export default meta
type Story = StoryObj<StructuredListClassesOptions>

export const Playground: Story = {}
export const Selectable: Story = { args: { selectable: true } }
export const Bordered: Story = { args: { bordered: true } }
