import type { Meta, StoryObj } from "@storybook/html"
import { timePickerClasses } from "./time-picker.classes.js"
import type { TimePickerClassesOptions } from "./time-picker.types.js"

type TimePickerArgs = TimePickerClassesOptions

function createTimePicker(args: TimePickerArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = timePickerClasses(args)
  const input = document.createElement("input")
  input.type = "text"
  input.className = "pm-time-picker__input"
  input.placeholder = "Select time..."
  if (args.disabled) input.disabled = true
  if (args.invalid) input.setAttribute("aria-invalid", "true")
  wrapper.appendChild(input)
  return wrapper
}

const meta = {
  title: "Forms/Time Picker",
  tags: ["autodocs"],
  render: (args) => createTimePicker(args as TimePickerArgs),
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
  },
  args: { variant: "outline", size: "md" },
} satisfies Meta<TimePickerArgs>

export default meta
type Story = StoryObj<TimePickerArgs>

export const Playground: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
