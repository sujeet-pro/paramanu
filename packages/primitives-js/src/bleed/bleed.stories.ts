import type { Meta, StoryObj } from "@storybook/html"
import { bleedClasses } from "./bleed.classes.js"
import type { BleedClassesOptions } from "./bleed.types.js"

function createBleed(args: BleedClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.padding = "32px"
  wrapper.style.border = "1px dashed #ccc"
  const el = document.createElement("div")
  el.className = bleedClasses(args)
  const inner = document.createElement("div")
  inner.style.background = "#e2e8f0"
  inner.style.padding = "16px"
  inner.textContent = "Bleed content"
  el.appendChild(inner)
  wrapper.appendChild(el)
  return wrapper
}

const meta = {
  title: "Primitives/Bleed",
  tags: ["autodocs"],
  render: (args) => createBleed(args as BleedClassesOptions),
  argTypes: {
    inline: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    block: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
  },
  args: { inline: "4" },
} satisfies Meta<BleedClassesOptions>

export default meta
type Story = StoryObj<BleedClassesOptions>

export const Playground: Story = {}
export const BlockBleed: Story = { args: { inline: undefined, block: "4" } }
