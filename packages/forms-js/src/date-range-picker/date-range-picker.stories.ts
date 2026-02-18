import type { Meta, StoryObj } from "@storybook/html-vite"
import { dateRangePickerClasses } from "./date-range-picker.classes.js"
import type { DateRangePickerClassesOptions } from "./date-range-picker.types.js"

type DateRangePickerArgs = DateRangePickerClassesOptions

function createDateRangePicker(args: DateRangePickerArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = dateRangePickerClasses(args)

  const startInput = document.createElement("input")
  startInput.type = "text"
  startInput.placeholder = "Start date"
  startInput.className = "pm-date-range-picker__start"
  if (args.disabled) startInput.disabled = true

  const separator = document.createElement("span")
  separator.className = "pm-date-range-picker__separator"
  separator.textContent = " - "

  const endInput = document.createElement("input")
  endInput.type = "text"
  endInput.placeholder = "End date"
  endInput.className = "pm-date-range-picker__end"
  if (args.disabled) endInput.disabled = true

  wrapper.appendChild(startInput)
  wrapper.appendChild(separator)
  wrapper.appendChild(endInput)
  return wrapper
}

const meta = {
  title: "Forms/Date Range Picker",
  tags: ["autodocs", "stable"],
  render: (args) => createDateRangePicker(args as DateRangePickerArgs),
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
  },
  args: { variant: "outline", size: "md" },
} satisfies Meta<DateRangePickerArgs>

export default meta
type Story = StoryObj<DateRangePickerArgs>

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
