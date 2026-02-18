import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Bleed } from "./bleed.js"

const meta = {
  title: "Primitives/Bleed",
  tags: ["autodocs", "stable"],
  component: Bleed,
  argTypes: {
    inline: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    block: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    inlineStart: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    inlineEnd: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    blockStart: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    blockEnd: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
  },
  args: {},
} satisfies Meta<typeof Bleed>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story. */
export const Playground: Story = {
  args: { inline: "4" },
  render: (args) => (
    <div style={{ padding: "32px", border: "1px dashed #ccc" }}>
      <p>Padded parent container</p>
      <Bleed {...args}>
        <div style={{ background: "#e2e8f0", padding: "16px" }}>
          This content bleeds into the parent padding
        </div>
      </Bleed>
      <p>More content</p>
    </div>
  ),
}

/** Bleed on inline (horizontal) axis. */
export const InlineBleed: Story = {
  args: { inline: "4" },
  render: (args) => (
    <div style={{ padding: "32px", border: "1px dashed #ccc" }}>
      <Bleed {...args}>
        <div style={{ background: "#e2e8f0", padding: "16px" }}>Inline bleed</div>
      </Bleed>
    </div>
  ),
}

/** Bleed on block (vertical) axis. */
export const BlockBleed: Story = {
  args: { block: "4" },
  render: (args) => (
    <div style={{ padding: "32px", border: "1px dashed #ccc" }}>
      <Bleed {...args}>
        <div style={{ background: "#e2e8f0", padding: "16px" }}>Block bleed</div>
      </Bleed>
    </div>
  ),
}

/** Bleed on inline-start side only. */
export const InlineStartBleed: Story = {
  args: { inlineStart: "4" },
  render: Playground.render,
}

/** Bleed on inline-end side only. */
export const InlineEndBleed: Story = {
  args: { inlineEnd: "4" },
  render: Playground.render,
}

/** Bleed on block-start side only. */
export const BlockStartBleed: Story = {
  args: { blockStart: "4" },
  render: Playground.render,
}

/** Bleed on block-end side only. */
export const BlockEndBleed: Story = {
  args: { blockEnd: "4" },
  render: Playground.render,
}

export const Hover: Story = {
  render: Playground.render,
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: Playground.render,
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  args: { inline: "4" },
  render: Playground.render,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-bleed")
    await expect(el).toBeTruthy()
  },
}
