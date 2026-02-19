import type { Meta, StoryObj } from "@storybook/html-vite"
import {
  sheetClasses,
  sheetHeaderClasses,
  sheetBodyClasses,
  sheetHandleClasses,
} from "./sheet.classes.js"
import type { SheetClassesOptions } from "./sheet.types.js"

function createSheet(args: SheetClassesOptions): HTMLElement {
  const cls = sheetClasses(args)
  const root = document.createElement("div")
  root.className = cls
  root.setAttribute("role", "dialog")

  const handle = document.createElement("div")
  handle.className = sheetHandleClasses()
  root.appendChild(handle)

  const header = document.createElement("div")
  header.className = sheetHeaderClasses()
  header.textContent = "Sheet Title"
  root.appendChild(header)

  const body = document.createElement("div")
  body.className = sheetBodyClasses()
  body.textContent = "Bottom sheet content."
  root.appendChild(body)

  return root
}

const meta = {
  title: "Overlays/Sheet",
  tags: ["autodocs", "beta"],
  render: (args) => createSheet(args as SheetClassesOptions),
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "full"] },
    dismissible: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<SheetClassesOptions>

export default meta
type Story = StoryObj<SheetClassesOptions>

export const Playground: Story = {}
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const Full: Story = { args: { size: "full" } }
export const NonDismissible: Story = { args: { dismissible: false } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
