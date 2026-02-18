import type { Meta, StoryObj } from "@storybook/html-vite"
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

function createCardGroup(): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.display = "flex"
  wrapper.style.gap = "1rem"

  ;["Basic", "Pro", "Enterprise"].forEach((plan) => {
    const card = createRadioCard({
      label: plan,
      name: "plan",
      value: plan.toLowerCase(),
      size: "md",
    })
    wrapper.appendChild(card)
  })

  return wrapper
}

const meta = {
  title: "Forms/Radio Card",
  tags: ["autodocs", "stable"],
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

export const ExtraSmall: Story = {
  args: { size: "xs", label: "Extra small card" },
}

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled card" },
}

export const CardGroup: Story = {
  render: () => createCardGroup(),
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
