import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Presence } from "./presence.js"

const meta = {
  title: "Utilities/Presence",
  component: Presence,
  tags: ["autodocs"],
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
