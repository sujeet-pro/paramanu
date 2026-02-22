import type { Meta, StoryObj } from "@storybook/html-vite"
import { datalistClasses } from "./data-list.classes.js"
import type { DatalistClassesOptions } from "./data-list.types.js"

function createDatalist(args: DatalistClassesOptions): HTMLElement {
  const cls = datalistClasses(args)
  const dl = document.createElement("dl")
  dl.className = cls.root

  for (const [term, detail] of [
    ["Name", "John Doe"],
    ["Email", "john@example.com"],
    ["Role", "Engineer"],
  ]) {
    const item = document.createElement("div")
    item.className = cls.item
    const dt = document.createElement("dt")
    dt.className = cls.term
    dt.textContent = term
    const dd = document.createElement("dd")
    dd.className = cls.detail
    dd.textContent = detail
    item.appendChild(dt)
    item.appendChild(dd)
    dl.appendChild(item)
  }

  return dl
}

const meta = {
  title: "Data Display/Data List",
  tags: ["autodocs", "beta"],
  render: (args) => createDatalist(args as DatalistClassesOptions),
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    dividers: { control: "boolean" },
  },
  args: { orientation: "vertical", size: "md" },
} satisfies Meta<DatalistClassesOptions>

export default meta
type Story = StoryObj<DatalistClassesOptions>

export const Playground: Story = {}
export const Horizontal: Story = { args: { orientation: "horizontal" } }
export const WithDividers: Story = { args: { dividers: true } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
