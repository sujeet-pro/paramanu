import type { Meta, StoryObj } from "@storybook/html-vite"
import { dropzoneClasses } from "./dropzone.classes.js"
import type { DropzoneClassesOptions } from "./dropzone.types.js"

type DropzoneArgs = DropzoneClassesOptions

function createDropzone(args: DropzoneArgs): HTMLElement {
  const el = document.createElement("div")
  el.className = dropzoneClasses(args)
  el.role = "button"
  el.tabIndex = args.disabled ? -1 : 0
  el.textContent = args.dragging ? "Release to upload" : "Drop files here or click to browse"
  if (args.disabled) el.setAttribute("aria-disabled", "true")
  return el
}

const meta = {
  title: "Forms/Dropzone",
  tags: ["autodocs", "beta"],
  render: (args) => createDropzone(args as DropzoneArgs),
  argTypes: {
    disabled: { control: "boolean" },
    dragging: { control: "boolean" },
  },
} satisfies Meta<DropzoneArgs>

export default meta
type Story = StoryObj<DropzoneArgs>

export const Playground: Story = {}
export const Dragging: Story = { args: { dragging: true } }
export const Disabled: Story = { args: { disabled: true } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
