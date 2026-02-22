import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Box } from "./box.js"

const meta = {
  title: "Primitives/Box",
  tags: ["autodocs", "beta"],
  component: Box,
  argTypes: {
    as: {
      control: "select",
      options: ["div", "section", "article", "span"],
    },
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
  },
  args: {
    children: "Box content",
  },
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story with all controls exposed. */
export const Playground: Story = {
  args: {
    p: "4",
    children: "A simple box with padding",
  },
  render: (args) => (
    <Box {...args} style={{ border: "1px dashed #ccc" }}>
      {args.children}
    </Box>
  ),
}

/** Box with padding on all sides. */
export const WithPadding: Story = {
  args: { p: "4" },
  render: (args) => (
    <Box {...args} style={{ border: "1px dashed #ccc" }}>
      Padding: {args.p}
    </Box>
  ),
}

/** Box with horizontal and vertical padding. */
export const WithDirectionalPadding: Story = {
  args: { px: "6", py: "3" },
  render: (args) => (
    <Box {...args} style={{ border: "1px dashed #ccc" }}>
      px: {args.px}, py: {args.py}
    </Box>
  ),
}

/** Box with display set to flex. */
export const DisplayFlex: Story = {
  args: { display: "flex", p: "4" },
  render: (args) => (
    <Box {...args} style={{ border: "1px dashed #ccc", gap: "8px" }}>
      <div style={{ background: "#e2e8f0", padding: "8px" }}>Item 1</div>
      <div style={{ background: "#e2e8f0", padding: "8px" }}>Item 2</div>
      <div style={{ background: "#e2e8f0", padding: "8px" }}>Item 3</div>
    </Box>
  ),
}

/** Box with overflow hidden. */
export const OverflowHidden: Story = {
  args: { overflow: "hidden", p: "4" },
  render: (args) => (
    <Box {...args} style={{ border: "1px dashed #ccc", width: "200px", height: "80px" }}>
      This is a long text that will overflow the container boundary and get clipped by overflow
      hidden.
    </Box>
  ),
}

/** Box with sticky position. */
export const PositionRelative: Story = {
  args: { position: "relative", p: "4" },
  render: (args) => (
    <Box {...args} style={{ border: "1px dashed #ccc" }}>
      Relative positioned box
    </Box>
  ),
}

/** Box rendered as a section element. */
export const AsSection: Story = {
  args: { as: "section", p: "4" },
  render: (args) => (
    <Box {...args} style={{ border: "1px dashed #ccc" }}>
      Rendered as &lt;section&gt;
    </Box>
  ),
}

/** Box with display block. */
export const DisplayBlock: Story = {
  args: { display: "block", p: "4" },
  render: Playground.render,
}

/** Box with display inline-block. */
export const DisplayInlineBlock: Story = {
  args: { display: "inline-block", p: "4" },
  render: Playground.render,
}

/** Box with display grid. */
export const DisplayGrid: Story = {
  args: { display: "grid", p: "4" },
  render: Playground.render,
}

/** Box with display none. */
export const DisplayNone: Story = {
  args: { display: "none", p: "4" },
  render: Playground.render,
}

/** Box with overflow scroll. */
export const OverflowScroll: Story = {
  args: { overflow: "scroll", p: "4" },
  render: (args) => (
    <Box {...args} style={{ border: "1px dashed #ccc", width: "200px", height: "80px" }}>
      Scroll overflow content that is long enough to need scrolling.
    </Box>
  ),
}

/** Box with position sticky. */
export const PositionSticky: Story = {
  args: { position: "sticky", p: "4" },
  render: Playground.render,
}

export const Hover: Story = {
  args: { p: "4" },
  render: Playground.render,
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { p: "4" },
  render: Playground.render,
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  args: { p: "4" },
  render: Playground.render,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-box")
    await expect(el).toBeTruthy()
  },
}
