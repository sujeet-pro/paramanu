import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Float } from "./float.js"

const meta = {
  title: "Primitives/Float",
  tags: ["autodocs", "beta"],
  component: Float,
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top-start", "top-center", "top-end",
        "middle-start", "middle-center", "middle-end",
        "bottom-start", "bottom-center", "bottom-end",
      ],
    },
    offset: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6"] },
  },
  args: { placement: "top-end" },
} satisfies Meta<typeof Float>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story. */
export const Playground: Story = {
  render: (args) => (
    <div style={{ position: "relative", width: "200px", height: "200px", border: "1px dashed #ccc", background: "#f8fafc" }}>
      <Float {...args}>
        <div style={{ background: "#ef4444", color: "white", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>
          3
        </div>
      </Float>
      <div style={{ padding: "16px" }}>Parent</div>
    </div>
  ),
}

/** Top-end placement (default). */
export const TopEnd: Story = {
  args: { placement: "top-end" },
  render: Playground.render,
}

/** Bottom-start placement. */
export const BottomStart: Story = {
  args: { placement: "bottom-start" },
  render: Playground.render,
}

/** Middle-center placement. */
export const MiddleCenter: Story = {
  args: { placement: "middle-center" },
  render: Playground.render,
}

/** With offset. */
export const WithOffset: Story = {
  args: { placement: "top-end", offset: "2" },
  render: Playground.render,
}

/** Top-start placement. */
export const TopStart: Story = {
  args: { placement: "top-start" },
  render: Playground.render,
}

/** Top-center placement. */
export const TopCenter: Story = {
  args: { placement: "top-center" },
  render: Playground.render,
}

/** Middle-start placement. */
export const MiddleStart: Story = {
  args: { placement: "middle-start" },
  render: Playground.render,
}

/** Middle-end placement. */
export const MiddleEnd: Story = {
  args: { placement: "middle-end" },
  render: Playground.render,
}

/** Bottom-center placement. */
export const BottomCenter: Story = {
  args: { placement: "bottom-center" },
  render: Playground.render,
}

/** Bottom-end placement. */
export const BottomEnd: Story = {
  args: { placement: "bottom-end" },
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
    const el = canvasElement.querySelector(".pm-float")
    await expect(el).toBeTruthy()
  },
}
