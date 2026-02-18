import type { Meta, StoryObj } from "@storybook/html-vite"
import { datePickerClasses } from "./date-picker.classes.js"
import type { DatePickerClassesOptions } from "./date-picker.types.js"

type DatePickerArgs = DatePickerClassesOptions & { placeholder: string }

function createDatePicker(args: DatePickerArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = datePickerClasses(args)

  const input = document.createElement("input")
  input.type = "text"
  input.className = "pm-date-picker__input"
  input.setAttribute("role", "combobox")
  input.setAttribute("aria-expanded", String(args.open || false))
  input.setAttribute("aria-haspopup", "dialog")
  input.placeholder = args.placeholder || "Select date..."
  if (args.disabled) input.disabled = true
  if (args.invalid) input.setAttribute("aria-invalid", "true")

  const icon = document.createElement("span")
  icon.className = "pm-date-picker__icon"
  icon.setAttribute("aria-hidden", "true")
  icon.innerHTML = "&#128197;"

  wrapper.appendChild(input)
  wrapper.appendChild(icon)
  return wrapper
}

const meta = {
  title: "Forms/Date Picker",
  tags: ["autodocs", "stable"],
  render: (args) => createDatePicker(args as DatePickerArgs),
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: { variant: "outline", size: "md", placeholder: "Select date..." },
} satisfies Meta<DatePickerArgs>

export default meta
type Story = StoryObj<DatePickerArgs>

export const Playground: Story = {}
export const Open: Story = { args: { open: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
export const Filled: Story = { args: { variant: "filled" } }
export const Unstyled: Story = { args: { variant: "unstyled" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
