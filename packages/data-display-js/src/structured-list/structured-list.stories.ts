import type { Meta, StoryObj } from "@storybook/html-vite"
import { structListClasses } from "./structured-list.classes.js"
import type { StructListClassesOptions } from "./structured-list.types.js"

function createStructList(args: StructListClassesOptions): HTMLElement {
  const cls = structListClasses(args)
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
  for (const [n, v] of [
    ["CPU", "85%"],
    ["Memory", "4.2 GB"],
  ]) {
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
  tags: ["autodocs", "beta"],
  render: (args) => createStructList(args as StructListClassesOptions),
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    selectable: { control: "boolean" },
    bordered: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<StructListClassesOptions>

export default meta
type Story = StoryObj<StructListClassesOptions>

export const Playground: Story = {}
export const Selectable: Story = { args: { selectable: true } }
export const Bordered: Story = { args: { bordered: true } }
export const Small: Story = { args: { size: "sm" } }

export const Hover: Story = {
  args: { selectable: true },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { selectable: true },
  parameters: { pseudo: { focusVisible: true } },
}
