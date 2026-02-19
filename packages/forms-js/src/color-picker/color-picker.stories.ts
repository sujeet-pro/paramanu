import type { Meta, StoryObj } from "@storybook/html-vite"
import { colorpickerClasses } from "./color-picker.classes.js"
import type { ColorpickerClassesOptions } from "./color-picker.types.js"

type ColorpickerArgs = ColorpickerClassesOptions

function createColorpicker(args: ColorpickerArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = colorpickerClasses(args)
  const swatch = document.createElement("button")
  swatch.type = "button"
  swatch.className = "pm-colorpicker__swatch"
  swatch.style.backgroundColor = "#3b82f6"
  swatch.setAttribute("aria-label", "Choose color")
  if (args.disabled) swatch.disabled = true
  wrapper.appendChild(swatch)
  return wrapper
}

const meta = {
  title: "Forms/Color Picker",
  tags: ["autodocs", "beta"],
  render: (args) => createColorpicker(args as ColorpickerArgs),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    open: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<ColorpickerArgs>

export default meta
type Story = StoryObj<ColorpickerArgs>

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
