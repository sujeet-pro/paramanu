import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { Rating } from "./rating.js"

const meta = {
  title: "Forms/Rating",
  component: Rating,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  args: {
    size: "md",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
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

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const ExtraSmall: Story = {
  args: { size: "xs" },
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

export const RateInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const rating = canvas.getByRole("radiogroup")
    await expect(rating).toBeTruthy()
  },
}

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-rating")
    await expect(el).toBeTruthy()
  },
}

export const Accessibility: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const rating = canvas.getByRole("radiogroup")
    await expect(rating).toHaveAttribute("aria-label", "Rating")
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
