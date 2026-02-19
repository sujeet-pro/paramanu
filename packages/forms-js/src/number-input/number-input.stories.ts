import type { Meta, StoryObj } from "@storybook/html-vite"
import { numInputClasses } from "./number-input.classes.js"
import { inputClasses } from "../input/input.classes.js"
import type { NumInputClassesOptions } from "./number-input.types.js"

interface NumInputArgs extends NumInputClassesOptions {
  min?: number
  max?: number
  step?: number
}

function createNumInput(args: NumInputArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = numInputClasses({
    variant: args.variant,
    size: args.size,
    invalid: args.invalid,
    disabled: args.disabled,
  })

  const input = document.createElement("input")
  input.type = "number"
  input.inputMode = "numeric"
  input.className = inputClasses({ variant: args.variant, size: args.size })
  if (args.min !== undefined) input.min = String(args.min)
  if (args.max !== undefined) input.max = String(args.max)
  if (args.step !== undefined) input.step = String(args.step)
  if (args.disabled) {
    input.disabled = true
    input.setAttribute("aria-disabled", "true")
  }
  if (args.invalid) input.setAttribute("aria-invalid", "true")

  const stepper = document.createElement("div")
  stepper.className = "pm-num-input__stepper"

  const increment = document.createElement("button")
  increment.type = "button"
  increment.className = "pm-num-input__increment"
  increment.setAttribute("aria-label", "Increment")
  increment.innerHTML = "&#9650;"
  increment.addEventListener("click", () => {
    if (!args.disabled) input.stepUp()
  })

  const decrement = document.createElement("button")
  decrement.type = "button"
  decrement.className = "pm-num-input__decrement"
  decrement.setAttribute("aria-label", "Decrement")
  decrement.innerHTML = "&#9660;"
  decrement.addEventListener("click", () => {
    if (!args.disabled) input.stepDown()
  })

  stepper.appendChild(increment)
  stepper.appendChild(decrement)
  wrapper.appendChild(input)
  wrapper.appendChild(stepper)
  return wrapper
}

const meta = {
  title: "Forms/Number Input",
  tags: ["autodocs", "beta"],
  render: (args) => createNumInput(args as NumInputArgs),
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
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
  args: {
    variant: "outline",
    size: "md",
  },
} satisfies Meta<NumInputArgs>

export default meta
type Story = StoryObj<NumInputArgs>

export const Playground: Story = {}

export const Outline: Story = {
  args: { variant: "outline" },
}

export const Filled: Story = {
  args: { variant: "filled" },
}

export const Unstyled: Story = {
  args: { variant: "unstyled" },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const ExtraSmall: Story = {
  args: { size: "xs" },
}

export const WithMinMax: Story = {
  args: { min: 0, max: 100, step: 5 },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Invalid: Story = {
  args: { invalid: true },
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
