import type { Meta, StoryObj } from "@storybook/html-vite"
import {
  dialogClasses,
  dialogHeaderClasses,
  dialogBodyClasses,
  dialogFooterClasses,
} from "./dialog.classes.js"
import type { DialogClassesOptions } from "./dialog.types.js"

function createDialog(args: DialogClassesOptions): HTMLElement {
  const cls = dialogClasses(args)
  const root = document.createElement("div")
  root.className = cls
  root.setAttribute("role", "dialog")
  root.setAttribute("aria-modal", "true")

  const header = document.createElement("div")
  header.className = dialogHeaderClasses()
  header.textContent = "Dialog Title"
  root.appendChild(header)

  const body = document.createElement("div")
  body.className = dialogBodyClasses()
  body.textContent = "This is the dialog content."
  root.appendChild(body)

  const footer = document.createElement("div")
  footer.className = dialogFooterClasses()
  const btn = document.createElement("button")
  btn.type = "button"
  btn.textContent = "Close"
  footer.appendChild(btn)
  root.appendChild(footer)

  return root
}

const meta = {
  title: "Overlays/Dialog",
  tags: ["autodocs", "beta"],
  render: (args) => createDialog(args as DialogClassesOptions),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "full"] },
    centered: { control: "boolean" },
    scrollBehavior: { control: "select", options: ["inside", "outside"] },
  },
  args: { size: "md" },
} satisfies Meta<DialogClassesOptions>

export default meta
type Story = StoryObj<DialogClassesOptions>

export const Playground: Story = {}
export const Centered: Story = { args: { centered: true } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const ExtraLarge: Story = { args: { size: "xl" } }
export const Full: Story = { args: { size: "full" } }
export const ScrollInside: Story = { args: { scrollBehavior: "inside" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
