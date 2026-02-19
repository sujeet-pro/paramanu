import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Backdrop } from "./backdrop.js"

const meta = {
  title: "Overlays/Backdrop",
  component: Backdrop,
  tags: ["autodocs", "beta"],
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

export const Hidden: Story = {
  args: { visible: false },
}

export const ClickBackdrop: Story = {
  args: { onClick: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const backdrop = canvasElement.querySelector("[aria-hidden]")
    if (backdrop) {
      await userEvent.click(backdrop as HTMLElement)
    }
  },
}

export const Accessibility: Story = {
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector("[aria-hidden]")
    await expect(el).toBeTruthy()
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
