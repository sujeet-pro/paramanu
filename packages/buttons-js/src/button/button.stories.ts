import type { Meta, StoryObj } from "@storybook/html"
import { buttonClasses } from "./button.classes.js"
import type { ButtonClassesOptions, ButtonVariant, ButtonSize } from "./button.types.js"

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
    loading: args.loading,
    active: args.active,
  })
  button.textContent = args.label
  button.type = "button"
  if (args.disabled) {
    button.disabled = true
    button.setAttribute("aria-disabled", "true")
  }
  if (args.loading) {
    button.setAttribute("aria-busy", "true")
  }
  return button
}

const meta = {
  title: "Buttons/Button",
  tags: ["autodocs"],
  render: (args) => createButton(args as ButtonArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost", "outline", "link"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    active: { control: "boolean" },
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

export const Playground: Story = {}

export const Primary: Story = {
  args: { variant: "primary", label: "Primary" },
}

export const Secondary: Story = {
  args: { variant: "secondary", label: "Secondary" },
}

export const Danger: Story = {
  args: { variant: "danger", label: "Danger" },
}

export const Ghost: Story = {
  args: { variant: "ghost", label: "Ghost" },
}

export const Outline: Story = {
  args: { variant: "outline", label: "Outline" },
}

export const Link: Story = {
  args: { variant: "link", label: "Link" },
}

export const AllVariantsAndSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "16px"

    const variants: ButtonVariant[] = ["primary", "secondary", "danger", "ghost", "outline", "link"]
    const sizes: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"]

    for (const variant of variants) {
      const row = document.createElement("div")
      row.style.display = "flex"
      row.style.gap = "8px"
      row.style.alignItems = "center"

      for (const size of sizes) {
        row.appendChild(createButton({ label: `${variant} ${size}`, variant, size }))
      }
      container.appendChild(row)
    }
    return container
  },
}

export const States: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.gap = "8px"
    container.style.flexWrap = "wrap"

    container.appendChild(createButton({ label: "Default" }))
    container.appendChild(createButton({ label: "Disabled", disabled: true }))
    container.appendChild(createButton({ label: "Loading", loading: true }))
    container.appendChild(createButton({ label: "Active", active: true }))
    return container
  },
}

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" },
}

export const FullWidth: Story = {
  args: { fullWidth: true, label: "Full Width" },
}

export const Loading: Story = {
  args: { loading: true, label: "Loading" },
}

export const Active: Story = {
  args: { active: true, label: "Active" },
}

export const LongLabel: Story = {
  args: { label: "This is a button with a very long label that might wrap" },
}
