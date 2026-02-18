import type { Meta, StoryObj } from "@storybook/html-vite"
import { colorPickerClasses } from "./color-picker.classes.js"
import type { ColorPickerClassesOptions } from "./color-picker.types.js"

type ColorPickerArgs = ColorPickerClassesOptions

function createColorPicker(args: ColorPickerArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = colorPickerClasses(args)
  const swatch = document.createElement("button")
  swatch.type = "button"
  swatch.className = "pm-color-picker__swatch"
  swatch.style.backgroundColor = "#3b82f6"
  swatch.setAttribute("aria-label", "Choose color")
  if (args.disabled) swatch.disabled = true
  wrapper.appendChild(swatch)
  return wrapper
}

const meta = {
  title: "Forms/Color Picker",
  tags: ["autodocs", "stable"],
  render: (args) => createColorPicker(args as ColorPickerArgs),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    open: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<ColorPickerArgs>

export default meta
type Story = StoryObj<ColorPickerArgs>

export const Playground: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Open: Story = { args: { open: true } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
