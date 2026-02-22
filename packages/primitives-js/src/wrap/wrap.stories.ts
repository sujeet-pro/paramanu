import type { Meta, StoryObj } from "@storybook/html-vite"
import { wrapClasses } from "./wrap.classes.js"
import type { WrapClassesOptions } from "./wrap.types.js"

function createWrap(args: WrapClassesOptions): HTMLElement {
  const el = document.createElement("div")
  el.className = wrapClasses(args)
  for (let i = 1; i <= 10; i++) {
    const child = document.createElement("div")
    child.style.background = "#e2e8f0"
    child.style.padding = "4px 12px"
    child.style.borderRadius = "4px"
    child.textContent = `Tag ${i}`
    el.appendChild(child)
  }
  return el
}

const meta = {
  title: "Primitives/Wrap",
  tags: ["autodocs", "beta"],
  render: (args) => createWrap(args as WrapClassesOptions),
  argTypes: {
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    direction: { control: "select", options: ["row", "row-reverse"] },
  },
  args: { gap: "3" },
} satisfies Meta<WrapClassesOptions>

export default meta
type Story = StoryObj<WrapClassesOptions>

export const Playground: Story = {}
export const Reversed: Story = { args: { direction: "row-reverse" } }
export const AlignStart: Story = { args: { align: "start" } }
export const AlignCenter: Story = { args: { align: "center" } }
export const AlignEnd: Story = { args: { align: "end" } }
export const AlignStretch: Story = { args: { align: "stretch" } }
export const AlignBaseline: Story = { args: { align: "baseline" } }
export const JustifyStart: Story = { args: { justify: "start" } }
export const JustifyCenter: Story = { args: { justify: "center" } }
export const JustifyEnd: Story = { args: { justify: "end" } }
export const JustifyBetween: Story = { args: { justify: "between" } }
export const JustifyAround: Story = { args: { justify: "around" } }
export const JustifyEvenly: Story = { args: { justify: "evenly" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
