import type { Meta, StoryObj } from "@storybook/html-vite"
import { hovercardClasses } from "./hover-card.classes.js"
import type { HovercardClassesOptions } from "./hover-card.types.js"

function createHovercard(args: HovercardClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.padding = "100px"

  const trigger = document.createElement("a")
  trigger.href = "#"
  trigger.textContent = "Hover over me"
  wrapper.appendChild(trigger)

  const card = document.createElement("div")
  card.className = hovercardClasses(args)
  card.textContent = "Hover card preview content"
  card.style.padding = "16px"
  wrapper.appendChild(card)

  return wrapper
}

const meta = {
  title: "Overlays/Hovercard",
  tags: ["autodocs", "beta"],
  render: (args) => createHovercard(args as HovercardClassesOptions),
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
  },
  args: { placement: "bottom" },
} satisfies Meta<HovercardClassesOptions>

export default meta
type Story = StoryObj<HovercardClassesOptions>

export const Playground: Story = {}
export const TopPlacement: Story = { args: { placement: "top" } }
export const LeftPlacement: Story = { args: { placement: "left" } }
export const RightPlacement: Story = { args: { placement: "right" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
