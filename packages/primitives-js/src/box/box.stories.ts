import type { Meta, StoryObj } from "@storybook/html-vite"
import { boxClasses } from "./box.classes.js"
import type { BoxClassesOptions } from "./box.types.js"

interface BoxArgs extends BoxClassesOptions {
  content: string
}

function createBox(args: BoxArgs): HTMLElement {
  const el = document.createElement("div")
  el.className = boxClasses({
    display: args.display,
    p: args.p,
    px: args.px,
    py: args.py,
    m: args.m,
    mx: args.mx,
    my: args.my,
    overflow: args.overflow,
    position: args.position,
  })
  el.textContent = args.content
  el.style.border = "1px dashed #ccc"
  return el
}

const meta = {
  title: "Primitives/Box",
  tags: ["autodocs", "beta"],
  render: (args) => createBox(args as BoxArgs),
  argTypes: {
    display: {
      control: "select",
      options: [
        "block",
        "inline-block",
        "inline",
        "flex",
        "inline-flex",
        "grid",
        "inline-grid",
        "none",
      ],
    },
    p: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    px: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    py: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    m: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    mx: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    my: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    overflow: { control: "select", options: ["visible", "hidden", "scroll", "auto"] },
    position: { control: "select", options: ["static", "relative", "absolute", "fixed", "sticky"] },
    content: { control: "text" },
  },
  args: {
    content: "Box content",
    p: "4",
  },
} satisfies Meta<BoxArgs>

export default meta
type Story = StoryObj<BoxArgs>

/** The default playground story with all controls exposed. */
export const Playground: Story = {}

/** Box with padding on all sides. */
export const WithPadding: Story = {
  args: { p: "4", content: "Padding: 4" },
}

/** Box with directional padding. */
export const WithDirectionalPadding: Story = {
  args: { px: "6", py: "3", content: "px: 6, py: 3" },
}

/** Box with display flex. */
export const DisplayFlex: Story = {
  args: { display: "flex", p: "4", content: "" },
  render: (args) => {
    const el = document.createElement("div")
    el.className = boxClasses({ display: args.display, p: args.p })
    el.style.border = "1px dashed #ccc"
    el.style.gap = "8px"
    for (let i = 1; i <= 3; i++) {
      const child = document.createElement("div")
      child.style.background = "#e2e8f0"
      child.style.padding = "8px"
      child.textContent = `Item ${i}`
      el.appendChild(child)
    }
    return el
  },
}

/** Box with overflow hidden. */
export const OverflowHidden: Story = {
  args: {
    overflow: "hidden",
    p: "4",
    content:
      "This is a long text that will overflow the container boundary and get clipped by overflow hidden.",
  },
  render: (args) => {
    const el = createBox(args as BoxArgs)
    el.style.width = "200px"
    el.style.height = "80px"
    return el
  },
}

export const DisplayBlock: Story = { args: { display: "block", content: "Block display" } }
export const DisplayInlineBlock: Story = {
  args: { display: "inline-block", content: "Inline block" },
}
export const DisplayInline: Story = { args: { display: "inline", content: "Inline" } }
export const DisplayGrid: Story = { args: { display: "grid", content: "Grid display" } }
export const DisplayNone: Story = { args: { display: "none", content: "Hidden" } }

export const OverflowScroll: Story = {
  args: { overflow: "scroll", p: "4", content: "Scroll overflow content" },
  render: (args) => {
    const el = createBox(args as BoxArgs)
    el.style.width = "200px"
    el.style.height = "80px"
    return el
  },
}

export const PositionRelative: Story = {
  args: { position: "relative", p: "4", content: "Relative" },
}
export const PositionSticky: Story = { args: { position: "sticky", p: "4", content: "Sticky" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
