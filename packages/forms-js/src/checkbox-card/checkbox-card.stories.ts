import type { Meta, StoryObj } from "@storybook/html-vite"
import { checkboxCardClasses } from "./checkbox-card.classes.js"
import type { CheckboxCardClassesOptions } from "./checkbox-card.types.js"

interface CheckboxCardArgs extends CheckboxCardClassesOptions {
  label: string
}

function createCheckboxCard(args: CheckboxCardArgs): HTMLElement {
  const label = document.createElement("label")
  label.className = checkboxCardClasses({
    size: args.size,
    disabled: args.disabled,
    checked: args.checked,
  })

  const input = document.createElement("input")
  input.type = "checkbox"
  input.className = "pm-checkbox-card__input"
  if (args.checked) input.checked = true
  if (args.disabled) input.disabled = true

  const content = document.createElement("div")
  content.className = "pm-checkbox-card__content"
  content.textContent = args.label

  label.appendChild(input)
  label.appendChild(content)
  return label
}

const meta = {
  title: "Forms/Checkbox Card",
  tags: ["autodocs", "stable"],
  render: (args) => createCheckboxCard(args as CheckboxCardArgs),
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
  },
} satisfies Meta<CheckboxCardArgs>

export default meta
type Story = StoryObj<CheckboxCardArgs>

export const Playground: Story = {}

export const Checked: Story = {
  args: { checked: true, label: "Checked card" },
}

export const ExtraSmall: Story = {
  args: { size: "xs", label: "Extra small card" },
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

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, label: "Disabled checked card" },
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
