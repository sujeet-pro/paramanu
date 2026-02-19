import type { Meta, StoryObj } from "@storybook/html-vite"
import { timepickerClasses } from "./time-picker.classes.js"
import type { TimepickerClassesOptions } from "./time-picker.types.js"

type TimepickerArgs = TimepickerClassesOptions

function createTimepicker(args: TimepickerArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = timepickerClasses(args)
  const input = document.createElement("input")
  input.type = "text"
  input.className = "pm-timepicker__input"
  input.placeholder = "Select time..."
  if (args.disabled) input.disabled = true
  if (args.invalid) input.setAttribute("aria-invalid", "true")
  wrapper.appendChild(input)
  return wrapper
}

const meta = {
  title: "Forms/Time Picker",
  tags: ["autodocs", "beta"],
  render: (args) => createTimepicker(args as TimepickerArgs),
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
  },
  args: { variant: "outline", size: "md" },
} satisfies Meta<TimepickerArgs>

export default meta
type Story = StoryObj<TimepickerArgs>

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
