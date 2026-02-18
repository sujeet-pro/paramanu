import type { Meta, StoryObj } from "@storybook/react"
import { Backdrop } from "./backdrop.js"

const meta = {
  title: "Overlays/Backdrop",
  component: Backdrop,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "transparent", "blur"],
    },
    visible: { control: "boolean" },
  },
  args: {
    variant: "default",
    visible: true,
    style: { position: "relative", width: "100%", height: "200px" },
  },
} satisfies Meta<typeof Backdrop>

export default meta
type Story = StoryObj<typeof Backdrop>

export const Playground: Story = {}

export const Blur: Story = {
  args: { variant: "blur" },
}

export const Transparent: Story = {
  args: { variant: "transparent" },
}
