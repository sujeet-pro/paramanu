import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { HoverCard } from "./hover-card.js"

const meta = {
  title: "Overlays/HoverCard",
  component: HoverCard,
  tags: ["autodocs", "stable"],
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

export const LeftPlacement: Story = {
  args: { placement: "left" },
}

export const RightPlacement: Story = {
  args: { placement: "right" },
}

export const TriggerHover: Story = {
  args: { open: false },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <a href="#">Hover over me</a>
      <HoverCard {...args}>User profile preview</HoverCard>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("link", { name: "Hover over me" })
    await userEvent.hover(trigger)
  },
}

export const Accessibility: Story = {
  render: () => (
    <div style={{ padding: 100 }}>
      <a href="#">Trigger</a>
      <HoverCard open placement="bottom">
        Preview content
      </HoverCard>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("link", { name: "Trigger" })).toBeInTheDocument()
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
