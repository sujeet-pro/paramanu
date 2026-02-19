import type { Meta, StoryObj } from "@storybook/html-vite"
import { editableClasses } from "./editable-text.classes.js"
import type { EditableClassesOptions } from "./editable-text.types.js"

interface EditableArgs extends EditableClassesOptions {
  text: string
}

function createEditable(args: EditableArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = editableClasses({
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
  tags: ["autodocs", "beta"],
  render: (args) => createEditable(args as EditableArgs),
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
} satisfies Meta<EditableArgs>

export default meta
type Story = StoryObj<EditableArgs>

export const Playground: Story = {}

export const Editing: Story = {
  args: { editing: true, text: "Editing mode" },
}

export const ExtraSmall: Story = {
  args: { size: "xs", text: "Extra small editable" },
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

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
