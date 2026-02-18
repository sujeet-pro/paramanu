import type { Meta, StoryObj } from "@storybook/html-vite"
import {
  alertDialogClasses,
  alertDialogHeaderClasses,
  alertDialogBodyClasses,
  alertDialogFooterClasses,
} from "./alert-dialog.classes.js"
import type { AlertDialogClassesOptions } from "./alert-dialog.types.js"

function createAlertDialog(args: AlertDialogClassesOptions): HTMLElement {
  const cls = alertDialogClasses(args)
  const root = document.createElement("div")
  root.className = cls
  root.setAttribute("role", "alertdialog")
  root.setAttribute("aria-modal", "true")

  const header = document.createElement("div")
  header.className = alertDialogHeaderClasses()
  header.textContent = "Confirm Action"
  root.appendChild(header)

  const body = document.createElement("div")
  body.className = alertDialogBodyClasses()
  body.textContent = "Are you sure you want to proceed?"
  root.appendChild(body)

  const footer = document.createElement("div")
  footer.className = alertDialogFooterClasses()
  for (const label of ["Cancel", "Confirm"]) {
    const btn = document.createElement("button")
    btn.type = "button"
    btn.textContent = label
    footer.appendChild(btn)
  }
  root.appendChild(footer)

  return root
}

const meta = {
  title: "Overlays/Alert Dialog",
  tags: ["autodocs", "stable"],
  render: (args) => createAlertDialog(args as AlertDialogClassesOptions),
  argTypes: {
    variant: { control: "select", options: ["info", "danger", "warning"] },
  },
  args: { variant: "info" },
} satisfies Meta<AlertDialogClassesOptions>

export default meta
type Story = StoryObj<AlertDialogClassesOptions>

export const Playground: Story = {}
export const Danger: Story = { args: { variant: "danger" } }
export const Warning: Story = { args: { variant: "warning" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
