import type { Meta, StoryObj } from "@storybook/html-vite"
import { inlineDlgClasses, inlineDialogBodyClasses } from "./inline-dialog.classes.js"
import type { InlineDlgClassesOptions } from "./inline-dialog.types.js"

function createInlineDlg(args: InlineDlgClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.padding = "40px"

  const trigger = document.createElement("button")
  trigger.type = "button"
  trigger.textContent = "Toggle"
  wrapper.appendChild(trigger)

  const dialog = document.createElement("div")
  dialog.className = inlineDlgClasses(args)
  dialog.setAttribute("role", "dialog")

  const body = document.createElement("div")
  body.className = inlineDialogBodyClasses()
  body.textContent = "Inline dialog content"
  dialog.appendChild(body)

  wrapper.appendChild(dialog)
  return wrapper
}

const meta = {
  title: "Overlays/InlineDlg",
  tags: ["autodocs", "beta"],
  render: (args) => createInlineDlg(args as InlineDlgClassesOptions),
  argTypes: {
    visible: { control: "boolean" },
  },
  args: { visible: true },
} satisfies Meta<InlineDlgClassesOptions>

export default meta
type Story = StoryObj<InlineDlgClassesOptions>

export const Playground: Story = {}
export const Hidden: Story = { args: { visible: false } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
