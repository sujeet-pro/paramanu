import type { Meta, StoryObj } from "@storybook/html-vite"
import { stackClasses } from "./stack.classes.js"
import type { StackClassesOptions } from "./stack.types.js"

interface StackArgs extends StackClassesOptions {
  itemCount: number
}

function createStack(args: StackArgs): HTMLElement {
  const el = document.createElement("div")
  el.className = stackClasses({
    direction: args.direction,
    gap: args.gap,
    align: args.align,
    justify: args.justify,
    separator: args.separator,
  })
  for (let i = 1; i <= (args.itemCount || 3); i++) {
    const child = document.createElement("div")
    child.style.background = "#e2e8f0"
    child.style.padding = "8px 16px"
    child.textContent = `Item ${i}`
    el.appendChild(child)
  }
  return el
}

const meta = {
  title: "Primitives/Stack",
  tags: ["autodocs", "stable"],
  render: (args) => createStack(args as StackArgs),
  argTypes: {
    direction: { control: "select", options: ["vertical", "horizontal"] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around", "evenly"] },
    separator: { control: "boolean" },
    itemCount: { control: "number" },
  },
  args: {
    gap: "4",
    itemCount: 3,
  },
} satisfies Meta<StackArgs>

export default meta
type Story = StoryObj<StackArgs>

/** The default playground story. */
export const Playground: Story = {}

/** Horizontal stack. */
export const Horizontal: Story = {
  args: { direction: "horizontal" },
}

/** Stack with separator dividers. */
export const WithSeparator: Story = {
  args: { separator: true },
}

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
