import type { Meta, StoryObj } from "@storybook/html-vite"
import { pwdInputClasses } from "./password-input.classes.js"
import { inputClasses } from "../input/input.classes.js"
import type { PwdInputClassesOptions } from "./password-input.types.js"

interface PwdInputArgs extends PwdInputClassesOptions {
  placeholder: string
}

function createPwdInput(args: PwdInputArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = pwdInputClasses({
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
  toggle.className = "pm-pwd-input__toggle"
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
  tags: ["autodocs", "beta"],
  render: (args) => createPwdInput(args as PwdInputArgs),
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
} satisfies Meta<PwdInputArgs>

export default meta
type Story = StoryObj<PwdInputArgs>

export const Playground: Story = {}

export const Outline: Story = {
  args: { variant: "outline", placeholder: "Outline password" },
}

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Filled password" },
}

export const Unstyled: Story = {
  args: { variant: "unstyled", placeholder: "Unstyled password" },
}

export const Small: Story = {
  args: { size: "sm", placeholder: "Small password" },
}

export const Large: Story = {
  args: { size: "lg", placeholder: "Large password" },
}

export const ExtraSmall: Story = {
  args: { size: "xs", placeholder: "Extra small password" },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled password" },
}

export const Invalid: Story = {
  args: { invalid: true, placeholder: "Invalid password" },
}

export const FullWidth: Story = {
  args: { fullWidth: true, placeholder: "Full width password" },
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
