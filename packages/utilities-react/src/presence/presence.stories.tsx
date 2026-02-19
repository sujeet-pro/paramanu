import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Presence } from "./presence.js"

const meta = {
  title: "Utilities/Presence",
  component: Presence,
  tags: ["autodocs", "beta"],
  argTypes: {
    present: { control: "boolean" },
    duration: { control: "number" },
  },
  args: {
    present: true,
    duration: 200,
    children: (
      <div style={{ padding: "16px", background: "#e0ffe0" }}>Animated content</div>
    ),
  },
} satisfies Meta<typeof Presence>

export default meta
type Story = StoryObj<typeof Presence>

export const Playground: Story = {}

export const WithRenderProp: Story = {
  args: {
    children: (state: string) => (
      <div style={{ padding: "16px", background: "#ffe0e0" }}>State: {state}</div>
    ),
  },
}

export const NotPresent: Story = {
  args: { present: false },
}

export const LongDuration: Story = {
  args: { present: true, duration: 1000 },
}

export const RenderTest: Story = {
  args: {
    present: true,
    children: <div>Test content</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}
