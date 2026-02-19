import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Cascader } from "./cascader.js"

const meta = {
  title: "Forms/Cascader",
  tags: ["autodocs", "beta"],
  component: Cascader,
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof Cascader>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { children: "Cascader content" } }
export const Open: Story = { args: { open: true, children: "Open cascader" } }
export const Disabled: Story = { args: { disabled: true, children: "Disabled" } }
export const Invalid: Story = { args: { invalid: true, children: "Invalid" } }
export const Filled: Story = { args: { variant: "filled", children: "Filled" } }
export const Unstyled: Story = { args: { variant: "unstyled", children: "Unstyled" } }
export const Small: Story = { args: { size: "sm", children: "Small" } }
export const Large: Story = { args: { size: "lg", children: "Large" } }
export const FullWidth: Story = { args: { fullWidth: true, children: "Full width" } }

export const KeyboardInteraction: Story = {
  args: { children: <button role="combobox">Select category...</button> },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("combobox")
    await userEvent.tab()
    await expect(trigger).toHaveFocus()
  },
}

export const Accessibility: Story = {
  args: {
    "aria-label": "Category selector",
    children: <button role="combobox">Select category...</button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("combobox")
    await expect(el).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { children: "Cascader content" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { children: "Cascader content" },
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  args: { children: "Cascader content" },
  parameters: { pseudo: { active: true } },
}
