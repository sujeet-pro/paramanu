import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Tooltip } from "./tooltip.js"

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs", "beta"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
  args: {
    placement: "top",
    children: "Tooltip text",
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof Tooltip>

export const Playground: Story = {}

export const BottomPlacement: Story = {
  args: { placement: "bottom" },
}

export const LeftPlacement: Story = {
  args: { placement: "left" },
}

export const RightPlacement: Story = {
  args: { placement: "right" },
}

export const TriggerHover: Story = {
  render: () => (
    <div style={{ padding: 100 }}>
      <button type="button">Hover me</button>
      <Tooltip placement="top">Tooltip content</Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Hover me" })
    await userEvent.hover(trigger)
  },
}

export const Accessibility: Story = {
  render: () => (
    <div style={{ padding: 100 }}>
      <button type="button">Trigger</button>
      <Tooltip placement="top">Accessible tooltip</Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("tooltip")).toBeInTheDocument()
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
