import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Affix } from "./affix.js"

const meta = {
  title: "Utilities/Affix",
  component: Affix,
  tags: ["autodocs", "beta"],
  argTypes: {
    position: {
      control: "select",
      options: ["top", "bottom"],
    },
    offset: {
      control: "select",
      options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"],
    },
  },
  args: {
    position: "top",
    children: (
      <div style={{ padding: "12px", background: "#e0f0ff", borderBottom: "1px solid #ccc" }}>
        Sticky header content
      </div>
    ),
  },
} satisfies Meta<typeof Affix>

export default meta
type Story = StoryObj<typeof Affix>

export const Playground: Story = {}

export const BottomPosition: Story = {
  args: {
    position: "bottom",
    children: (
      <div style={{ padding: "12px", background: "#ffe0e0", borderTop: "1px solid #ccc" }}>
        Sticky footer content
      </div>
    ),
  },
}

export const WithOffset: Story = {
  args: { position: "top", offset: "4" },
}

export const OffsetSmall: Story = {
  args: { position: "top", offset: "1" },
}

export const OffsetLarge: Story = {
  args: { position: "top", offset: "12" },
}

export const BottomWithOffset: Story = {
  args: {
    position: "bottom",
    offset: "4",
    children: (
      <div style={{ padding: "12px", background: "#ffe0e0", borderTop: "1px solid #ccc" }}>
        Sticky bottom with offset
      </div>
    ),
  },
}

export const RenderTest: Story = {
  args: {
    children: <div>Test content</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}
