import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { BackToTop } from "./back-to-top.js"

const meta = {
  title: "Navigation/Back to Top",
  component: BackToTop,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    position: {
      control: "select",
      options: ["bottom-right", "bottom-left", "bottom-center"],
    },
    visible: { control: "boolean" },
  },
  args: {
    size: "md",
    position: "bottom-right",
    visible: true,
  },
} satisfies Meta<typeof BackToTop>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Default: Story = {
  args: { visible: true },
}

export const Small: Story = {
  args: { size: "sm", visible: true },
}

export const Large: Story = {
  args: { size: "lg", visible: true },
}

export const BottomLeft: Story = {
  args: { position: "bottom-left", visible: true },
}

export const BottomCenter: Story = {
  args: { position: "bottom-center", visible: true },
}

export const Hidden: Story = {
  args: { visible: false },
}

export const Accessibility: Story = {
  args: { visible: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole("button", { name: "Back to top" })
    await expect(btn).toBeInTheDocument()
    await expect(btn).toHaveAttribute("type", "button")
  },
}
