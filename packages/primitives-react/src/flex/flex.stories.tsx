import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Flex } from "./flex.js"

const meta = {
  title: "Primitives/Flex",
  tags: ["autodocs", "stable"],
  component: Flex,
  argTypes: {
    direction: { control: "select", options: ["row", "column", "row-reverse", "column-reverse"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around", "evenly"] },
    wrap: { control: "select", options: ["wrap", "nowrap", "wrap-reverse"] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    inline: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

const items = (
  <>
    <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>Item 1</div>
    <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>Item 2</div>
    <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>Item 3</div>
  </>
)

/** The default playground story with all controls exposed. */
export const Playground: Story = {
  args: { gap: "4", children: items },
}

/** Horizontal row layout (default). */
export const Row: Story = {
  args: { direction: "row", gap: "4", children: items },
}

/** Vertical column layout. */
export const Column: Story = {
  args: { direction: "column", gap: "4", children: items },
}

/** Centered items on both axes. */
export const Centered: Story = {
  args: { align: "center", justify: "center", gap: "4", children: items },
  render: (args) => (
    <Flex {...args} style={{ height: "200px", border: "1px dashed #ccc" }}>
      {args.children}
    </Flex>
  ),
}

/** Space between items. */
export const SpaceBetween: Story = {
  args: { justify: "between", gap: "4", children: items },
}

/** Wrapping items. */
export const Wrapping: Story = {
  args: { wrap: "wrap", gap: "4" },
  render: (args) => (
    <Flex {...args} style={{ width: "300px", border: "1px dashed #ccc" }}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{ background: "#e2e8f0", padding: "8px 16px" }}>
          Item {i + 1}
        </div>
      ))}
    </Flex>
  ),
}

/** Inline flex display. */
export const Inline: Story = {
  args: { inline: true, gap: "2", children: items },
}

/** Row reverse direction. */
export const RowReverse: Story = {
  args: { direction: "row-reverse", gap: "4", children: items },
}

/** Column reverse direction. */
export const ColumnReverse: Story = {
  args: { direction: "column-reverse", gap: "4", children: items },
}

/** Align items to start. */
export const AlignStart: Story = {
  args: { align: "start", gap: "4", children: items },
}

/** Align items to end. */
export const AlignEnd: Story = {
  args: { align: "end", gap: "4", children: items },
}

/** Align items to baseline. */
export const AlignBaseline: Story = {
  args: { align: "baseline", gap: "4", children: items },
}

/** Align items stretch. */
export const AlignStretch: Story = {
  args: { align: "stretch", gap: "4", children: items },
}

/** Justify space around. */
export const JustifyAround: Story = {
  args: { justify: "around", gap: "4", children: items },
}

/** Justify space evenly. */
export const JustifyEvenly: Story = {
  args: { justify: "evenly", gap: "4", children: items },
}

/** Wrap reverse. */
export const WrapReverse: Story = {
  args: { wrap: "wrap-reverse", gap: "4" },
  render: Wrapping.render,
}

export const Hover: Story = {
  args: { gap: "4", children: items },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { gap: "4", children: items },
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  args: { gap: "4", children: items },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-flex")
    await expect(el).toBeTruthy()
  },
}
