import type { Meta, StoryObj } from "@storybook/html"
import { inlineDialogClasses, inlineDialogBodyClasses } from "./inline-dialog.classes.js"
import type { InlineDialogClassesOptions } from "./inline-dialog.types.js"

function createInlineDialog(args: InlineDialogClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.padding = "40px"

  const trigger = document.createElement("button")
  trigger.type = "button"
  trigger.textContent = "Toggle"
  wrapper.appendChild(trigger)

  const dialog = document.createElement("div")
  dialog.className = inlineDialogClasses(args)
  dialog.setAttribute("role", "dialog")

  const body = document.createElement("div")
  body.className = inlineDialogBodyClasses()
  body.textContent = "Inline dialog content"
  dialog.appendChild(body)

  wrapper.appendChild(dialog)
  return wrapper
}

const meta = {
  title: "Overlays/InlineDialog",
  tags: ["autodocs"],
  render: (args) => createInlineDialog(args as InlineDialogClassesOptions),
  argTypes: {
    visible: { control: "boolean" },
  },
  args: { visible: true },
} satisfies Meta<InlineDialogClassesOptions>

export default meta
type Story = StoryObj<InlineDialogClassesOptions>

export const Playground: Story = {}
export const Hidden: Story = { args: { visible: false } }
