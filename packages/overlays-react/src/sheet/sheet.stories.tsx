import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Sheet, SheetHeader, SheetBody, SheetHandle } from "./sheet.js"

const meta = {
  title: "Overlays/Sheet",
  component: Sheet,
  tags: ["autodocs", "stable"],
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

export const Small: Story = {
  args: { size: "sm", onClose: fn() },
  render: (args) => (
    <Sheet {...args}>
      <SheetHandle />
      <SheetHeader>Small Sheet</SheetHeader>
      <SheetBody>Compact content.</SheetBody>
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

export const NonDismissible: Story = {
  args: { dismissible: false, onClose: fn() },
  render: (args) => (
    <Sheet {...args}>
      <SheetHeader>Non-dismissible Sheet</SheetHeader>
      <SheetBody>Cannot be swiped away.</SheetBody>
    </Sheet>
  ),
}

export const CloseAction: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Sheet {...args}>
      <SheetHandle />
      <SheetHeader>Sheet</SheetHeader>
      <SheetBody>
        <button type="button" onClick={args.onClose}>
          Close Sheet
        </button>
      </SheetBody>
    </Sheet>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const closeBtn = canvas.getByRole("button", { name: "Close Sheet" })
    await userEvent.click(closeBtn)
    await expect(args.onClose).toHaveBeenCalledTimes(1)
  },
}

export const Accessibility: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Sheet {...args}>
      <SheetHeader>Sheet</SheetHeader>
      <SheetBody>Content</SheetBody>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("dialog")).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Sheet {...args}>
      <SheetHeader>Sheet</SheetHeader>
      <SheetBody>Content</SheetBody>
    </Sheet>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Sheet {...args}>
      <SheetHeader>Sheet</SheetHeader>
      <SheetBody>Content</SheetBody>
    </Sheet>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
