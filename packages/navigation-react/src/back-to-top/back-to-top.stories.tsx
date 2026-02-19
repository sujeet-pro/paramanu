import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Btt } from "./back-to-top.js"

const meta = {
  title: "Navigation/Back to Top",
  component: Btt,
  tags: ["autodocs", "beta"],
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
    onClick: fn(),
  },
} satisfies Meta<typeof Btt>

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

export const ClickAction: Story = {
  args: { visible: true, onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole("button", { name: "Back to top" })
    await userEvent.click(btn)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
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

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
