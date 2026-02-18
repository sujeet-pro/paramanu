import type { Meta, StoryObj } from "@storybook/react"
import { Portal } from "./portal.js"

const meta = {
  title: "Utilities/Portal",
  component: Portal,
  tags: ["autodocs"],
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
