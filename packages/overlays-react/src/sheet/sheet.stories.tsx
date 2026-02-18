import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Sheet, SheetHeader, SheetBody, SheetHandle } from "./sheet.js"

const meta = {
  title: "Overlays/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "full"] },
    dismissible: { control: "boolean" },
    open: { control: "boolean" },
  },
  args: { open: true, size: "md" },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Sheet {...args}>
      <SheetHandle />
      <SheetHeader>Sheet Title</SheetHeader>
      <SheetBody>Bottom sheet content.</SheetBody>
    </Sheet>
  ),
}

export const Large: Story = {
  args: { size: "lg", onClose: fn() },
  render: (args) => (
    <Sheet {...args}>
      <SheetHandle />
      <SheetHeader>Large Sheet</SheetHeader>
      <SheetBody>More content space.</SheetBody>
    </Sheet>
  ),
}

export const Full: Story = {
  args: { size: "full", onClose: fn() },
  render: (args) => (
    <Sheet {...args}>
      <SheetHandle />
      <SheetHeader>Full Sheet</SheetHeader>
      <SheetBody>Full height sheet.</SheetBody>
    </Sheet>
  ),
}
