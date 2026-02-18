import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { ColorPicker } from "./color-picker.js"

const meta = {
  title: "Forms/Color Picker",
  tags: ["autodocs", "stable"],
  component: ColorPicker,
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    open: { control: "boolean" },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { children: "Color picker content" } }
export const Open: Story = { args: { open: true, children: "Open picker" } }
export const Disabled: Story = { args: { disabled: true, children: "Disabled picker" } }
export const Small: Story = { args: { size: "sm", children: "Small picker" } }
export const Large: Story = { args: { size: "lg", children: "Large picker" } }

export const KeyboardInteraction: Story = {
  args: {
    children: <button aria-label="Choose color">Pick color</button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole("button", { name: "Choose color" })
    await userEvent.tab()
    await expect(btn).toHaveFocus()
  },
}

export const Accessibility: Story = {
  args: {
    "aria-label": "Color selector",
    children: <button aria-label="Choose color">Pick color</button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("button", { name: "Choose color" })
    await expect(el).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { children: "Color picker content" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { children: "Color picker content" },
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  args: { children: "Color picker content" },
  parameters: { pseudo: { active: true } },
}
