import type { Meta, StoryObj } from "@storybook/html"
import { radioClasses, radioGroupClasses } from "./radio.classes.js"
import type { RadioClassesOptions } from "./radio.types.js"

interface RadioArgs extends RadioClassesOptions {
  label: string
  name: string
  value: string
}

function createRadio(args: RadioArgs): HTMLElement {
  const label = document.createElement("label")
  label.className = radioClasses({
    size: args.size,
    disabled: args.disabled,
    invalid: args.invalid,
    checked: args.checked,
  })

  const input = document.createElement("input")
  input.type = "radio"
  input.className = "pm-radio__input"
  input.name = args.name || "demo"
  input.value = args.value || "1"
  if (args.checked) input.checked = true
  if (args.disabled) input.disabled = true
  if (args.invalid) input.setAttribute("aria-invalid", "true")

  const indicator = document.createElement("span")
  indicator.className = "pm-radio__indicator"

  const text = document.createElement("span")
  text.className = "pm-radio__label"
  text.textContent = args.label

  label.appendChild(input)
  label.appendChild(indicator)
  label.appendChild(text)
  return label
}

function createRadioGroup(): HTMLElement {
  const group = document.createElement("div")
  group.className = radioGroupClasses({ orientation: "vertical" })
  group.setAttribute("role", "radiogroup")

  const options = ["Apple", "Banana", "Cherry"]
  options.forEach((opt) => {
    const radio = createRadio({ label: opt, name: "fruits", value: opt.toLowerCase(), size: "md" })
    group.appendChild(radio)
  })

  return group
}

const meta = {
  title: "Forms/Radio",
  tags: ["autodocs"],
  render: (args) => createRadio(args as RadioArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    checked: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "Option",
    size: "md",
    name: "demo",
    value: "1",
  },
} satisfies Meta<RadioArgs>

export default meta
type Story = StoryObj<RadioArgs>

export const Playground: Story = {}

export const Checked: Story = {
  args: { checked: true, label: "Selected" },
}

export const Small: Story = {
  args: { size: "sm", label: "Small radio" },
}

export const Large: Story = {
  args: { size: "lg", label: "Large radio" },
}

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled radio" },
}

export const Invalid: Story = {
  args: { invalid: true, label: "Invalid radio" },
}

export const Group: Story = {
  render: () => createRadioGroup(),
}
