import type { Meta, StoryObj } from "@storybook/html-vite"
import { affixClasses } from "./affix.classes.js"
import type { AffixClassesOptions } from "./affix.types.js"

function createAffix(args: AffixClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")

  const affix = document.createElement("div")
  affix.className = affixClasses(args)
  affix.style.padding = "12px"
  affix.style.background = "#e0f0ff"
  affix.style.borderBottom = "1px solid #ccc"
  affix.textContent = `Sticky ${args.position ?? "top"} content`
  wrapper.appendChild(affix)

  const content = document.createElement("div")
  content.style.padding = "16px"
  content.textContent = "Scroll to see the sticky behavior."
  wrapper.appendChild(content)

  return wrapper
}

const meta = {
  title: "Utilities/Affix",
  tags: ["autodocs", "beta"],
  render: (args) => createAffix(args as AffixClassesOptions),
  argTypes: {
    position: { control: "select", options: ["top", "bottom"] },
    offset: {
      control: "select",
      options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"],
    },
  },
  args: { position: "top" },
} satisfies Meta<AffixClassesOptions>

export default meta
type Story = StoryObj<AffixClassesOptions>

export const Playground: Story = {}
export const BottomPosition: Story = { args: { position: "bottom" } }
export const WithOffset: Story = { args: { position: "top", offset: "4" } }
export const OffsetSmall: Story = { args: { position: "top", offset: "1" } }
export const OffsetLarge: Story = { args: { position: "top", offset: "12" } }
export const BottomWithOffset: Story = { args: { position: "bottom", offset: "4" } }
