import type { Meta, StoryObj } from "@storybook/html"
import { pinInputClasses } from "./pin-input.classes.js"
import type { PinInputClassesOptions } from "./pin-input.types.js"

interface PinInputArgs extends PinInputClassesOptions {
  length: number
}

function createPinInput(args: PinInputArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = pinInputClasses({
    size: args.size,
    disabled: args.disabled,
    invalid: args.invalid,
  })
  wrapper.setAttribute("role", "group")
  if (args.disabled) wrapper.setAttribute("aria-disabled", "true")
  if (args.invalid) wrapper.setAttribute("aria-invalid", "true")

  const count = args.length || 4
  for (let i = 0; i < count; i++) {
    const input = document.createElement("input")
    input.type = "text"
    input.inputMode = "numeric"
    input.maxLength = 1
    input.className = `pm-input pm-input--outline pm-input--${args.size || "md"}`
    input.setAttribute("aria-label", `Pin digit ${i + 1}`)
    input.style.width = "3rem"
    input.style.textAlign = "center"
    if (args.disabled) {
      input.disabled = true
      input.setAttribute("aria-disabled", "true")
    }
    if (args.invalid) input.setAttribute("aria-invalid", "true")
    wrapper.appendChild(input)
  }

  return wrapper
}

const meta = {
  title: "Forms/Pin Input",
  tags: ["autodocs"],
  render: (args) => createPinInput(args as PinInputArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    length: { control: "number" },
  },
  args: {
    size: "md",
    length: 4,
  },
} satisfies Meta<PinInputArgs>

export default meta
type Story = StoryObj<PinInputArgs>

export const Playground: Story = {}

export const SixDigits: Story = {
  args: { length: 6 },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Invalid: Story = {
  args: { invalid: true },
}
