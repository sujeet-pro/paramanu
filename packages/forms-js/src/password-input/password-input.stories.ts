import type { Meta, StoryObj } from "@storybook/html"
import { passwordInputClasses } from "./password-input.classes.js"
import { inputClasses } from "../input/input.classes.js"
import type { PasswordInputClassesOptions } from "./password-input.types.js"

interface PasswordInputArgs extends PasswordInputClassesOptions {
  placeholder: string
}

function createPasswordInput(args: PasswordInputArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = passwordInputClasses({
    variant: args.variant,
    size: args.size,
    invalid: args.invalid,
    disabled: args.disabled,
    fullWidth: args.fullWidth,
  })

  const input = document.createElement("input")
  input.type = "password"
  input.className = inputClasses({ variant: args.variant, size: args.size })
  input.placeholder = args.placeholder || ""
  if (args.disabled) {
    input.disabled = true
    input.setAttribute("aria-disabled", "true")
  }
  if (args.invalid) input.setAttribute("aria-invalid", "true")

  const toggle = document.createElement("button")
  toggle.type = "button"
  toggle.className = "pm-password-input__toggle"
  toggle.setAttribute("aria-label", "Show password")
  toggle.textContent = "Show"
  toggle.addEventListener("click", () => {
    const isVisible = input.type === "text"
    input.type = isVisible ? "password" : "text"
    toggle.textContent = isVisible ? "Show" : "Hide"
    toggle.setAttribute("aria-label", isVisible ? "Show password" : "Hide password")
  })

  wrapper.appendChild(input)
  wrapper.appendChild(toggle)
  return wrapper
}

const meta = {
  title: "Forms/Password Input",
  tags: ["autodocs"],
  render: (args) => createPasswordInput(args as PasswordInputArgs),
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
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Enter password...",
    variant: "outline",
    size: "md",
  },
} satisfies Meta<PasswordInputArgs>

export default meta
type Story = StoryObj<PasswordInputArgs>

export const Playground: Story = {}

export const Outline: Story = {
  args: { variant: "outline", placeholder: "Outline password" },
}

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Filled password" },
}

export const Small: Story = {
  args: { size: "sm", placeholder: "Small password" },
}

export const Large: Story = {
  args: { size: "lg", placeholder: "Large password" },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled password" },
}

export const Invalid: Story = {
  args: { invalid: true, placeholder: "Invalid password" },
}
