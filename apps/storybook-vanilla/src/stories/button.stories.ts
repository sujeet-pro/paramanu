import type { Meta, StoryObj } from "@storybook/html"
import { buttonClasses } from "@paramanu/buttons-js"
import type { ButtonClassesOptions } from "@paramanu/buttons-js"

interface ButtonArgs extends ButtonClassesOptions {
  label: string
}

function createButton(args: ButtonArgs): HTMLButtonElement {
  const button = document.createElement("button")
  button.className = buttonClasses({
    variant: args.variant,
    size: args.size,
    disabled: args.disabled,
    fullWidth: args.fullWidth,
  })
  button.textContent = args.label
  button.type = "button"
  if (args.disabled) {
    button.disabled = true
    button.setAttribute("aria-disabled", "true")
  }
  return button
}

const meta = {
  title: "Components/Button",
  render: (args) => createButton(args as ButtonArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "Button",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<ButtonArgs>

export default meta
type Story = StoryObj<ButtonArgs>

export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Primary Button",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Secondary Button",
  },
}

export const Danger: Story = {
  args: {
    variant: "danger",
    label: "Danger Button",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    label: "Ghost Button",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    label: "Small Button",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large Button",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled Button",
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: "Full Width Button",
  },
}
