import type { Meta, StoryObj } from "@storybook/html"
import { editableTextClasses } from "./editable-text.classes.js"
import type { EditableTextClassesOptions } from "./editable-text.types.js"

interface EditableTextArgs extends EditableTextClassesOptions {
  text: string
}

function createEditableText(args: EditableTextArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = editableTextClasses({
    size: args.size,
    disabled: args.disabled,
    editing: args.editing,
  })
  wrapper.setAttribute("role", "group")
  if (args.disabled) wrapper.setAttribute("aria-disabled", "true")

  if (args.editing) {
    const input = document.createElement("input")
    input.className = `pm-input pm-input--outline pm-input--${args.size || "md"}`
    input.value = args.text || "Editing"
    wrapper.appendChild(input)
  } else {
    const span = document.createElement("span")
    span.textContent = args.text || "Click to edit"
    wrapper.appendChild(span)
  }

  return wrapper
}

const meta = {
  title: "Forms/Editable Text",
  tags: ["autodocs"],
  render: (args) => createEditableText(args as EditableTextArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    editing: { control: "boolean" },
    text: { control: "text" },
  },
  args: {
    size: "md",
    text: "Click to edit",
  },
} satisfies Meta<EditableTextArgs>

export default meta
type Story = StoryObj<EditableTextArgs>

export const Playground: Story = {}

export const Editing: Story = {
  args: { editing: true, text: "Editing mode" },
}

export const Small: Story = {
  args: { size: "sm", text: "Small editable" },
}

export const Large: Story = {
  args: { size: "lg", text: "Large editable" },
}

export const Disabled: Story = {
  args: { disabled: true, text: "Cannot edit" },
}
