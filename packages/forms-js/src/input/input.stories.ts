import type { Meta, StoryObj } from "@storybook/html"
import { inputClasses } from "./input.classes.js"
import type { InputClassesOptions } from "./input.types.js"

interface InputArgs extends InputClassesOptions {
  placeholder: string
}

function createInput(args: InputArgs): HTMLInputElement {
  const input = document.createElement("input")
  input.type = "text"
  input.className = inputClasses({
    variant: args.variant,
    size: args.size,
    invalid: args.invalid,
    disabled: args.disabled,
    readOnly: args.readOnly,
    fullWidth: args.fullWidth,
  })
  input.placeholder = args.placeholder || ""
  if (args.disabled) {
    input.disabled = true
    input.setAttribute("aria-disabled", "true")
  }
  if (args.readOnly) {
    input.readOnly = true
  }
  if (args.invalid) {
    input.setAttribute("aria-invalid", "true")
  }
  return input
}

const meta = {
  title: "Forms/Input",
  tags: ["autodocs"],
  render: (args) => createInput(args as InputArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "unstyled"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    readOnly: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Enter text...",
    variant: "outline",
    size: "md",
  },
} satisfies Meta<InputArgs>

export default meta
type Story = StoryObj<InputArgs>

export const Playground: Story = {}

export const Outline: Story = {
  args: { variant: "outline", placeholder: "Outline input" },
}

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Filled input" },
}

export const Unstyled: Story = {
  args: { variant: "unstyled", placeholder: "Unstyled input" },
}

export const Small: Story = {
  args: { size: "sm", placeholder: "Small input" },
}

export const Large: Story = {
  args: { size: "lg", placeholder: "Large input" },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input" },
}

export const Invalid: Story = {
  args: { invalid: true, placeholder: "Invalid input" },
}

export const ReadOnly: Story = {
  args: { readOnly: true, placeholder: "Read-only input" },
}

export const FullWidth: Story = {
  args: { fullWidth: true, placeholder: "Full width input" },
}
