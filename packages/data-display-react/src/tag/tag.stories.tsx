import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, userEvent, within } from "@storybook/test"
import { Tag } from "./tag.js"

const meta = {
  title: "Data Display/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["filled", "outline", "subtle"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "select", options: ["primary", "neutral", "danger", "success"] },
    removable: { control: "boolean" },
    interactive: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Tag",
    variant: "filled",
    size: "md",
    color: "primary",
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Filled: Story = { args: { variant: "filled", children: "Filled" } }
export const Outline: Story = { args: { variant: "outline", children: "Outline" } }
export const Subtle: Story = { args: { variant: "subtle", children: "Subtle" } }
export const Danger: Story = { args: { color: "danger", children: "Error" } }
export const Success: Story = { args: { color: "success", children: "Active" } }

export const Removable: Story = {
  args: { removable: true, children: "Removable", onRemove: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const removeBtn = canvas.getByRole("button", { name: "Remove" })
    await userEvent.click(removeBtn)
    expect(args.onRemove).toHaveBeenCalled()
  },
}

export const Interactive: Story = {
  args: { interactive: true, children: "Clickable" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
}
