import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Portal } from "./portal.js"

const meta = {
  title: "Utilities/Portal",
  component: Portal,
  tags: ["autodocs", "stable"],
  argTypes: {
    disabled: { control: "boolean" },
  },
  args: {
    children: <div style={{ padding: "16px", background: "#e0f0ff" }}>Portalled content</div>,
  },
} satisfies Meta<typeof Portal>

export default meta
type Story = StoryObj<typeof Portal>

export const Playground: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}

export const RenderTest: Story = {
  args: {
    disabled: true,
    children: <div>Test content</div>,
  },
  play: async ({ canvasElement }) => {
    const text = canvasElement.textContent
    await expect(text).toContain("Test content")
  },
}
