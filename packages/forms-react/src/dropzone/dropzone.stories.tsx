import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Dropzone } from "./dropzone.js"

const meta = {
  title: "Forms/Dropzone",
  component: Dropzone,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    dragging: { control: "boolean" },
  },
} satisfies Meta<typeof Dropzone>

export default meta
type Story = StoryObj<typeof Dropzone>

export const Playground: Story = {
  args: { children: "Drop files here or click to browse" },
}

export const Dragging: Story = {
  args: { dragging: true, children: "Release to upload" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Drop files here or click to browse" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("button")
    await expect(el).toHaveAttribute("aria-disabled", "true")
  },
}
