import type { Meta, StoryObj } from "@storybook/html-vite"
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
  tags: ["autodocs", "stable"],
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

export const DirectionHorizontal: Story = {
  args: { direction: "horizontal" },
  render: (args) => {
    const el = document.createElement("div")
    el.className = scrollAreaClasses(args as ScrollAreaClassesOptions)
    el.style.width = "300px"
    el.tabIndex = 0
    el.setAttribute("role", "region")
    el.setAttribute("aria-label", "Horizontal scroll")
    const inner = document.createElement("div")
    inner.style.display = "flex"
    inner.style.gap = "16px"
    inner.style.width = "800px"
    for (let i = 1; i <= 8; i++) {
      const child = document.createElement("div")
      child.style.background = "#e2e8f0"
      child.style.padding = "16px"
      child.style.minWidth = "100px"
      child.textContent = `Item ${i}`
      inner.appendChild(child)
    }
    el.appendChild(inner)
    return el
  },
}

export const DirectionBoth: Story = { args: { direction: "both" } }
export const ScrollbarAlways: Story = { args: { scrollbar: "always" } }
export const ScrollbarHover: Story = { args: { scrollbar: "hover" } }
export const HiddenScrollbar: Story = { args: { scrollbar: "hidden" } }
export const ScrollbarSizeNone: Story = { args: { scrollbarSize: "none" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
