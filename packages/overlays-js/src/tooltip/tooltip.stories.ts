import type { Meta, StoryObj } from "@storybook/html-vite"
import { tooltipClasses } from "./tooltip.classes.js"
import type { TooltipClassesOptions } from "./tooltip.types.js"

function createTooltip(args: TooltipClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.padding = "100px"

  const trigger = document.createElement("button")
  trigger.type = "button"
  trigger.textContent = "Hover me"
  wrapper.appendChild(trigger)

  const tooltip = document.createElement("div")
  tooltip.className = tooltipClasses(args)
  tooltip.setAttribute("role", "tooltip")
  tooltip.textContent = "Tooltip text"
  wrapper.appendChild(tooltip)

  return wrapper
}

const meta = {
  title: "Overlays/Tooltip",
  tags: ["autodocs", "beta"],
  render: (args) => createTooltip(args as TooltipClassesOptions),
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
  },
  args: { placement: "top" },
} satisfies Meta<TooltipClassesOptions>

export default meta
type Story = StoryObj<TooltipClassesOptions>

export const Playground: Story = {}
export const BottomPlacement: Story = { args: { placement: "bottom" } }
export const LeftPlacement: Story = { args: { placement: "left" } }
export const RightPlacement: Story = { args: { placement: "right" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
