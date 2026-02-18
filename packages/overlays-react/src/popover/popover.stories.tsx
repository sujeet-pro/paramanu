import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Popover } from "./popover.js"

const meta = {
  title: "Overlays/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right", "top-start", "top-end", "bottom-start", "bottom-end"] },
    hasArrow: { control: "boolean" },
    open: { control: "boolean" },
  },
  args: { open: true, placement: "bottom" },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <button type="button">Trigger</button>
      <Popover {...args}>
        <div style={{ padding: 16 }}>Popover content</div>
      </Popover>
    </div>
  ),
}

export const WithArrow: Story = {
  args: { hasArrow: true, onClose: fn() },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <button type="button">Trigger</button>
      <Popover {...args}>
        <div style={{ padding: 16 }}>Popover with arrow</div>
      </Popover>
    </div>
  ),
}

export const TopPlacement: Story = {
  args: { placement: "top", onClose: fn() },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <Popover {...args}>
        <div style={{ padding: 16 }}>Top popover</div>
      </Popover>
    </div>
  ),
}
