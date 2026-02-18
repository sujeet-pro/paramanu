import type { Meta, StoryObj } from "@storybook/html"
import { checkboxClasses } from "./checkbox.classes.js"
import type { CheckboxClassesOptions } from "./checkbox.types.js"

interface CheckboxArgs extends CheckboxClassesOptions {
  label: string
}

function createCheckbox(args: CheckboxArgs): HTMLElement {
  const label = document.createElement("label")
  label.className = checkboxClasses({
    size: args.size,
    disabled: args.disabled,
    invalid: args.invalid,
    checked: args.checked,
    indeterminate: args.indeterminate,
  })

  const input = document.createElement("input")
  input.type = "checkbox"
  input.className = "pm-checkbox__input"
  if (args.checked) input.checked = true
  if (args.disabled) input.disabled = true
  if (args.indeterminate) input.indeterminate = true
  if (args.invalid) input.setAttribute("aria-invalid", "true")

  const indicator = document.createElement("span")
  indicator.className = "pm-checkbox__indicator"
  indicator.innerHTML = "&#10003;"

  const text = document.createElement("span")
  text.className = "pm-checkbox__label"
  text.textContent = args.label

  label.appendChild(input)
  label.appendChild(indicator)
  label.appendChild(text)
  return label
}

const meta = {
  title: "Forms/Checkbox",
  tags: ["autodocs"],
  render: (args) => createCheckbox(args as CheckboxArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "Accept terms",
    size: "md",
  },
} satisfies Meta<CheckboxArgs>

export default meta
type Story = StoryObj<CheckboxArgs>

export const Playground: Story = {}

export const Checked: Story = {
  args: { checked: true, label: "Checked" },
}

export const Indeterminate: Story = {
  args: { indeterminate: true, label: "Indeterminate" },
}

export const Small: Story = {
  args: { size: "sm", label: "Small checkbox" },
}

export const Large: Story = {
  args: { size: "lg", label: "Large checkbox" },
}

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled checkbox" },
}

export const Invalid: Story = {
  args: { invalid: true, label: "Invalid checkbox" },
}
