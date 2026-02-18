import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Divider } from "./divider.js"

const meta = {
  title: "Primitives/Divider",
  tags: ["autodocs", "stable"],
  component: Divider,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    variant: { control: "select", options: ["solid", "dashed", "dotted"] },
    labelPosition: { control: "select", options: ["start", "center", "end"] },
    my: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
  },
  args: {},
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story. */
export const Playground: Story = {
  render: (args) => (
    <div>
      <p>Content above</p>
      <Divider {...args} />
      <p>Content below</p>
    </div>
  ),
}

/** Horizontal solid divider (default). */
export const Solid: Story = {
  args: { variant: "solid" },
  render: (args) => (
    <div>
      <p>Above</p>
      <Divider {...args} />
      <p>Below</p>
    </div>
  ),
}

/** Dashed divider. */
export const Dashed: Story = {
  args: { variant: "dashed" },
  render: (args) => (
    <div>
      <p>Above</p>
      <Divider {...args} />
      <p>Below</p>
    </div>
  ),
}

/** Dotted divider. */
export const Dotted: Story = {
  args: { variant: "dotted" },
  render: (args) => (
    <div>
      <p>Above</p>
      <Divider {...args} />
      <p>Below</p>
    </div>
  ),
}

/** Divider with a label. */
export const WithLabel: Story = {
  render: () => <Divider label="OR" />,
}

/** Vertical divider. */
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", height: "50px", gap: "16px" }}>
      <span>Left</span>
      <Divider {...args} />
      <span>Right</span>
    </div>
  ),
}

/** Label at start position. */
export const LabelStart: Story = {
  render: () => <Divider label="OR" labelPosition="start" />,
}

/** Label at end position. */
export const LabelEnd: Story = {
  render: () => <Divider label="OR" labelPosition="end" />,
}

export const Hover: Story = {
  render: Playground.render,
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: Playground.render,
  parameters: { pseudo: { focusVisible: true } },
}

export const Accessibility: Story = {
  render: Playground.render,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector("[role='separator']") || canvasElement.querySelector("hr")
    await expect(el).toBeTruthy()
  },
}

export const RenderTest: Story = {
  render: Playground.render,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-divider")
    await expect(el).toBeTruthy()
  },
}
