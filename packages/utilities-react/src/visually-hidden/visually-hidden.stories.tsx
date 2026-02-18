import type { Meta, StoryObj } from "@storybook/react"
import { VisuallyHidden } from "./visually-hidden.js"

const meta = {
  title: "Utilities/VisuallyHidden",
  component: VisuallyHidden,
  tags: ["autodocs"],
  argTypes: {
    focusable: { control: "boolean" },
    as: { control: "select", options: ["span", "div", "a"] },
  },
  args: {
    children: "This text is only visible to screen readers",
  },
} satisfies Meta<typeof VisuallyHidden>

export default meta
type Story = StoryObj<typeof VisuallyHidden>

export const Playground: Story = {}

export const Focusable: Story = {
  args: { focusable: true, as: "a", children: "Skip to content" },
}
