import type { Meta, StoryObj } from "@storybook/html"
import { scrollAreaClasses } from "./scroll-area.classes.js"
import type { ScrollAreaClassesOptions } from "./scroll-area.types.js"

function createScrollArea(args: ScrollAreaClassesOptions): HTMLElement {
  const el = document.createElement("div")
  el.className = scrollAreaClasses(args)
  el.style.height = "200px"
  el.tabIndex = 0
  el.setAttribute("role", "region")
  el.setAttribute("aria-label", "Scrollable content")
  for (let i = 1; i <= 20; i++) {
    const p = document.createElement("p")
    p.textContent = `Line ${i}: Lorem ipsum dolor sit amet.`
    el.appendChild(p)
  }
  return el
}

const meta = {
  title: "Primitives/Scroll Area",
  tags: ["autodocs"],
  render: (args) => createScrollArea(args as ScrollAreaClassesOptions),
  argTypes: {
    direction: { control: "select", options: ["vertical", "horizontal", "both"] },
    scrollbar: { control: "select", options: ["auto", "always", "hover", "hidden"] },
    scrollbarSize: { control: "select", options: ["thin", "none"] },
    bordered: { control: "boolean" },
  },
  args: {},
} satisfies Meta<ScrollAreaClassesOptions>

export default meta
type Story = StoryObj<ScrollAreaClassesOptions>

export const Playground: Story = {}
export const Bordered: Story = { args: { bordered: true } }
export const HiddenScrollbar: Story = { args: { scrollbar: "hidden" } }
