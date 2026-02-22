import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Spacer } from "./spacer.js"

const meta = {
  title: "Primitives/Spacer",
  tags: ["autodocs", "beta"],
  component: Spacer,
  argTypes: {
    size: {
      control: "select",
      options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"],
    },
    axis: { control: "select", options: ["horizontal", "vertical"] },
  },
  args: {},
} satisfies Meta<typeof Spacer>

export default meta
type Story = StoryObj<typeof meta>

/** Spacer fills available space between items. */
export const Playground: Story = {
  render: (args) => (
    <div
      style={{ display: "flex", border: "1px dashed #ccc", height: "50px", alignItems: "center" }}
    >
      <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>Left</div>
      <Spacer {...args} />
      <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>Right</div>
    </div>
  ),
}

/** Fixed size spacer. */
export const FixedSize: Story = {
  args: { size: "8" },
  render: (args) => (
    <div style={{ display: "flex", border: "1px dashed #ccc", alignItems: "center" }}>
      <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>Before</div>
      <Spacer {...args} />
      <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>After</div>
    </div>
  ),
}

/** Vertical spacer in a column layout. */
export const VerticalSpacer: Story = {
  args: { size: "6", axis: "vertical" },
  render: (args) => (
    <div>
      <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>Above</div>
      <Spacer {...args} />
      <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>Below</div>
    </div>
  ),
}

/** Horizontal axis spacer. */
export const AxisHorizontal: Story = {
  args: { axis: "horizontal" },
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
  render: Playground.render,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-spacer")
    await expect(el).toBeTruthy()
  },
}
