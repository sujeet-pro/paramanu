import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Hovercard } from "./hover-card.js"

const meta = {
  title: "Overlays/Hovercard",
  component: Hovercard,
  tags: ["autodocs", "beta"],
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
} satisfies Meta<typeof Hovercard>

export default meta
type Story = StoryObj<typeof Hovercard>

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
      <Hovercard {...args}>User profile preview</Hovercard>
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
      <Hovercard open placement="bottom">
        Preview content
      </Hovercard>
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
