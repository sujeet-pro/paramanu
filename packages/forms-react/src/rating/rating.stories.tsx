import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Rating } from "./rating.js"

const meta = {
  title: "Forms/Rating",
  component: Rating,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof Rating>

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Rating size="xs" aria-label="Extra small rating" />
      <Rating size="sm" aria-label="Small rating" />
      <Rating size="md" aria-label="Medium rating" />
      <Rating size="lg" aria-label="Large rating" />
    </div>
  ),
}

export const ReadOnly: Story = {
  args: { readOnly: true },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const rating = canvas.getByRole("radiogroup")
    await expect(rating).toHaveAttribute("aria-disabled", "true")
  },
}
