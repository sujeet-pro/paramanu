import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Slider } from "./slider.js"

const meta = {
  title: "Forms/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" },
    showMarks: { control: "boolean" },
  },
  args: { size: "md", orientation: "horizontal" },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof Slider>

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Slider size="xs" aria-label="Extra small slider" />
      <Slider size="sm" aria-label="Small slider" />
      <Slider size="md" aria-label="Medium slider" />
      <Slider size="lg" aria-label="Large slider" />
    </div>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
}

export const WithMarks: Story = {
  args: { showMarks: true },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole("slider")
    await expect(slider).toHaveAttribute("aria-disabled", "true")
  },
}
