import type { Meta, StoryObj } from "@storybook/html-vite"
import { masonryClasses } from "./masonry.classes.js"
import type { MasonryClassesOptions } from "./masonry.types.js"

function createMasonry(args: MasonryClassesOptions): HTMLElement {
  const el = document.createElement("div")
  el.className = masonryClasses(args)
  const heights = [120, 200, 160, 80, 240, 100, 180, 140, 220]
  heights.forEach((h, i) => {
    const child = document.createElement("div")
    child.style.background = "#e2e8f0"
    child.style.height = `${h}px`
    child.style.display = "flex"
    child.style.alignItems = "center"
    child.style.justifyContent = "center"
    child.textContent = String(i + 1)
    el.appendChild(child)
  })
  return el
}

const meta = {
  title: "Primitives/Masonry",
  tags: ["autodocs", "stable"],
  render: (args) => createMasonry(args as MasonryClassesOptions),
  argTypes: {
    columns: { control: "select", options: [2, 3, 4, 5, 6] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
  },
  args: { columns: 3, gap: "4" },
} satisfies Meta<MasonryClassesOptions>

export default meta
type Story = StoryObj<MasonryClassesOptions>

export const Playground: Story = {}
export const TwoColumns: Story = { args: { columns: 2 } }
export const ThreeColumns: Story = { args: { columns: 3 } }
export const FourColumns: Story = { args: { columns: 4 } }
export const FiveColumns: Story = { args: { columns: 5 } }
export const SixColumns: Story = { args: { columns: 6 } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
