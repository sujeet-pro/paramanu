import type { Meta, StoryObj } from "@storybook/react"
import { HoverCard } from "./hover-card.js"

const meta = {
  title: "Overlays/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    open: { control: "boolean" },
  },
  args: {
    open: true,
    placement: "bottom",
    children: "Hover card preview content with user details.",
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof HoverCard>

export const Playground: Story = {}

export const TopPlacement: Story = {
  args: { placement: "top" },
}
