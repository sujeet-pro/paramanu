import type { Meta, StoryObj } from "@storybook/html-vite"
import { popoverClasses } from "./popover.classes.js"
import type { PopoverClassesOptions } from "./popover.types.js"

function createPopover(args: PopoverClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.padding = "100px"
  const trigger = document.createElement("button")
  trigger.type = "button"
  trigger.textContent = "Trigger"
  wrapper.appendChild(trigger)

  const popover = document.createElement("div")
  popover.className = popoverClasses(args)
  popover.textContent = "Popover content"
  popover.style.padding = "16px"
  wrapper.appendChild(popover)

  return wrapper
}

const meta = {
  title: "Overlays/Popover",
  tags: ["autodocs", "beta"],
  render: (args) => createPopover(args as PopoverClassesOptions),
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
    hasArrow: { control: "boolean" },
  },
  args: { placement: "bottom" },
} satisfies Meta<PopoverClassesOptions>

export default meta
type Story = StoryObj<PopoverClassesOptions>

export const Playground: Story = {}
export const WithArrow: Story = { args: { hasArrow: true } }
export const TopPlacement: Story = { args: { placement: "top" } }
export const LeftPlacement: Story = { args: { placement: "left" } }
export const RightPlacement: Story = { args: { placement: "right" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
