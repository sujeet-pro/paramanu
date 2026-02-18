import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Dropzone } from "./dropzone.js"

const meta = {
  title: "Forms/Dropzone",
  component: Dropzone,
  tags: ["autodocs", "stable"],
  argTypes: {
    disabled: { control: "boolean" },
    dragging: { control: "boolean" },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof Dropzone>

export default meta
type Story = StoryObj<typeof meta>

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

export const KeyboardInteraction: Story = {
  args: { children: "Drop files here or click to browse" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("button")
    await userEvent.tab()
    await expect(el).toHaveFocus()
  },
}

export const Accessibility: Story = {
  args: { "aria-label": "File upload area", children: "Drop files here" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("button", { name: "File upload area" })
    await expect(el).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { children: "Drop files here or click to browse" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { children: "Drop files here or click to browse" },
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  args: { children: "Drop files here or click to browse" },
  parameters: { pseudo: { active: true } },
}
