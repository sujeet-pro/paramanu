import type { Meta, StoryObj } from "@storybook/react"
import { Tooltip } from "./tooltip.js"

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
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
