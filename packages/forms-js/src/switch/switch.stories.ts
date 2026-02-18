import type { Meta, StoryObj } from "@storybook/html"
import { switchClasses } from "./switch.classes.js"
import type { SwitchClassesOptions } from "./switch.types.js"

interface SwitchArgs extends SwitchClassesOptions {
  label: string
}

function createSwitch(args: SwitchArgs): HTMLElement {
  const label = document.createElement("label")
  label.className = switchClasses({
    size: args.size,
    disabled: args.disabled,
    checked: args.checked,
    labelPlacement: args.labelPlacement,
  })

  const input = document.createElement("input")
  input.type = "checkbox"
  input.role = "switch"
  input.className = "pm-switch__input"
  if (args.checked) input.checked = true
  if (args.disabled) input.disabled = true
  input.setAttribute("aria-checked", String(args.checked ?? false))

  const track = document.createElement("span")
  track.className = "pm-switch__track"
  const thumb = document.createElement("span")
  thumb.className = "pm-switch__thumb"
  track.appendChild(thumb)

  const text = document.createElement("span")
  text.className = "pm-switch__label"
  text.textContent = args.label

  label.appendChild(input)
  label.appendChild(track)
  label.appendChild(text)
  return label
}

const meta = {
  title: "Forms/Switch",
  tags: ["autodocs"],
  render: (args) => createSwitch(args as SwitchArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    labelPlacement: {
      control: "select",
      options: ["start", "end"],
    },
    label: { control: "text" },
  },
  args: {
    label: "Dark mode",
    size: "md",
  },
} satisfies Meta<SwitchArgs>

export default meta
type Story = StoryObj<SwitchArgs>

export const Playground: Story = {}

export const Checked: Story = {
  args: { checked: true, label: "Enabled" },
}

export const Small: Story = {
  args: { size: "sm", label: "Small switch" },
}

export const Large: Story = {
  args: { size: "lg", label: "Large switch" },
}

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled switch" },
}

export const LabelStart: Story = {
  args: { labelPlacement: "start", label: "Label start" },
}
