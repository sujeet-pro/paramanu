import type { Meta, StoryObj } from "@storybook/html-vite"
import { flexClasses } from "./flex.classes.js"
import type { FlexClassesOptions } from "./flex.types.js"

interface FlexArgs extends FlexClassesOptions {
  itemCount: number
}

function createFlex(args: FlexArgs): HTMLElement {
  const el = document.createElement("div")
  el.className = flexClasses({
    direction: args.direction,
    align: args.align,
    justify: args.justify,
    wrap: args.wrap,
    gap: args.gap,
    inline: args.inline,
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
  title: "Primitives/Flex",
  tags: ["autodocs", "beta"],
  render: (args) => createFlex(args as FlexArgs),
  argTypes: {
    direction: { control: "select", options: ["row", "column", "row-reverse", "column-reverse"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    wrap: { control: "select", options: ["wrap", "nowrap", "wrap-reverse"] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    inline: { control: "boolean" },
    itemCount: { control: "number" },
  },
  args: {
    gap: "4",
    itemCount: 3,
  },
} satisfies Meta<FlexArgs>

export default meta
type Story = StoryObj<FlexArgs>

/** The default playground story. */
export const Playground: Story = {}

/** Vertical column layout. */
export const Column: Story = {
  args: { direction: "column" },
}

/** Centered items. */
export const Centered: Story = {
  args: { align: "center", justify: "center" },
  render: (args) => {
    const el = createFlex(args as FlexArgs)
    el.style.height = "200px"
    el.style.border = "1px dashed #ccc"
    return el
  },
}

/** Space between items. */
export const SpaceBetween: Story = {
  args: { justify: "between" },
}

/** Wrapping items. */
export const Wrapping: Story = {
  args: { wrap: "wrap", itemCount: 8 },
  render: (args) => {
    const el = createFlex(args as FlexArgs)
    el.style.width = "300px"
    el.style.border = "1px dashed #ccc"
    return el
  },
}

export const RowReverse: Story = { args: { direction: "row-reverse" } }
export const ColumnReverse: Story = { args: { direction: "column-reverse" } }
export const AlignStart: Story = { args: { align: "start" } }
export const AlignEnd: Story = { args: { align: "end" } }
export const AlignBaseline: Story = { args: { align: "baseline" } }
export const AlignStretch: Story = { args: { align: "stretch" } }
export const JustifyAround: Story = { args: { justify: "around" } }
export const JustifyEvenly: Story = { args: { justify: "evenly" } }
export const WrapReverse: Story = {
  args: { wrap: "wrap-reverse", itemCount: 8 },
  render: (args) => {
    const el = createFlex(args as FlexArgs)
    el.style.width = "300px"
    el.style.border = "1px dashed #ccc"
    return el
  },
}
export const InlineFlex: Story = { args: { inline: true } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
