import type { Meta, StoryObj } from "@storybook/html-vite"
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
  tags: ["autodocs", "stable"],
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
export const Open: Story = { args: { open: true } }
export const Filled: Story = { args: { variant: "filled" } }
export const Unstyled: Story = { args: { variant: "unstyled" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const ExtraSmall: Story = { args: { size: "xs" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
