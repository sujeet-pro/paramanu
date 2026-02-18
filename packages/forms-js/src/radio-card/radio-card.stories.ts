import type { Meta, StoryObj } from "@storybook/html"
import { radioCardClasses } from "./radio-card.classes.js"
import type { RadioCardClassesOptions } from "./radio-card.types.js"

interface RadioCardArgs extends RadioCardClassesOptions {
  label: string
  name: string
  value: string
}

function createRadioCard(args: RadioCardArgs): HTMLElement {
  const label = document.createElement("label")
  label.className = radioCardClasses({
    size: args.size,
    disabled: args.disabled,
    checked: args.checked,
  })

  const input = document.createElement("input")
  input.type = "radio"
  input.className = "pm-radio-card__input"
  input.name = args.name || "demo"
  input.value = args.value || "a"
  if (args.checked) input.checked = true
  if (args.disabled) input.disabled = true

  const content = document.createElement("div")
  content.className = "pm-radio-card__content"
  content.textContent = args.label

  label.appendChild(input)
  label.appendChild(content)
  return label
}

const meta = {
  title: "Forms/Radio Card",
  tags: ["autodocs"],
  render: (args) => createRadioCard(args as RadioCardArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "Option A",
    size: "md",
    name: "demo",
    value: "a",
  },
} satisfies Meta<RadioCardArgs>

export default meta
type Story = StoryObj<RadioCardArgs>

export const Playground: Story = {}

export const Checked: Story = {
  args: { checked: true, label: "Selected card" },
}

export const Small: Story = {
  args: { size: "sm", label: "Small card" },
}

export const Large: Story = {
  args: { size: "lg", label: "Large card" },
}

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled card" },
}
