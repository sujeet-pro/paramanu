import type { Meta, StoryObj } from "@storybook/html"
import { textareaClasses } from "./textarea.classes.js"
import type { TextareaClassesOptions } from "./textarea.types.js"

interface TextareaArgs extends TextareaClassesOptions {
  placeholder: string
  rows: number
}

function createTextarea(args: TextareaArgs): HTMLTextAreaElement {
  const textarea = document.createElement("textarea")
  textarea.className = textareaClasses({
    variant: args.variant,
    size: args.size,
    invalid: args.invalid,
    disabled: args.disabled,
    readOnly: args.readOnly,
    fullWidth: args.fullWidth,
    resize: args.resize,
  })
  textarea.placeholder = args.placeholder || ""
  textarea.rows = args.rows || 3
  if (args.disabled) {
    textarea.disabled = true
    textarea.setAttribute("aria-disabled", "true")
  }
  if (args.readOnly) textarea.readOnly = true
  if (args.invalid) textarea.setAttribute("aria-invalid", "true")
  return textarea
}

const meta = {
  title: "Forms/Textarea",
  tags: ["autodocs"],
  render: (args) => createTextarea(args as TextareaArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "unstyled"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    readOnly: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
    rows: { control: "number" },
  },
  args: {
    placeholder: "Enter text...",
    variant: "outline",
    size: "md",
    rows: 3,
  },
} satisfies Meta<TextareaArgs>

export default meta
type Story = StoryObj<TextareaArgs>

export const Playground: Story = {}

export const Outline: Story = {
  args: { variant: "outline", placeholder: "Outline textarea" },
}

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Filled textarea" },
}

export const Small: Story = {
  args: { size: "sm", placeholder: "Small textarea" },
}

export const Large: Story = {
  args: { size: "lg", placeholder: "Large textarea" },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled textarea" },
}

export const Invalid: Story = {
  args: { invalid: true, placeholder: "Invalid textarea" },
}

export const NoResize: Story = {
  args: { resize: "none", placeholder: "Cannot resize" },
}
