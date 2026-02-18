import type { Meta, StoryObj } from "@storybook/html"
import { hoverCardClasses } from "./hover-card.classes.js"
import type { HoverCardClassesOptions } from "./hover-card.types.js"

function createHoverCard(args: HoverCardClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.padding = "100px"

  const trigger = document.createElement("a")
  trigger.href = "#"
  trigger.textContent = "Hover over me"
  wrapper.appendChild(trigger)

  const card = document.createElement("div")
  card.className = hoverCardClasses(args)
  card.textContent = "Hover card preview content"
  card.style.padding = "16px"
  wrapper.appendChild(card)

  return wrapper
}

const meta = {
  title: "Overlays/HoverCard",
  tags: ["autodocs"],
  render: (args) => createHoverCard(args as HoverCardClassesOptions),
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
  },
  args: { placement: "bottom" },
} satisfies Meta<HoverCardClassesOptions>

export default meta
type Story = StoryObj<HoverCardClassesOptions>

export const Playground: Story = {}
export const TopPlacement: Story = { args: { placement: "top" } }
