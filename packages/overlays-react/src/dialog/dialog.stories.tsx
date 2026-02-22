import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "./dialog.js"

const meta = {
  title: "Overlays/Dialog",
  component: Dialog,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "full"] },
    centered: { control: "boolean" },
    scrollBehavior: { control: "select", options: ["inside", "outside"] },
    open: { control: "boolean" },
  },
  args: { size: "md", open: true },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Dialog {...args}>
      <DialogHeader>Dialog Title</DialogHeader>
      <DialogBody>This is the dialog content.</DialogBody>
      <DialogFooter>
        <button type="button" onClick={args.onClose}>
          Close
        </button>
      </DialogFooter>
    </Dialog>
  ),
}

export const Centered: Story = {
  args: { centered: true, onClose: fn() },
  render: (args) => (
    <Dialog {...args}>
      <DialogHeader>Centered Dialog</DialogHeader>
      <DialogBody>Vertically centered in the viewport.</DialogBody>
      <DialogFooter>
        <button type="button" onClick={args.onClose}>
          Close
        </button>
      </DialogFooter>
    </Dialog>
  ),
}

export const Small: Story = {
  args: { size: "sm", onClose: fn() },
  render: (args) => (
    <Dialog {...args}>
      <DialogHeader>Small Dialog</DialogHeader>
      <DialogBody>A compact dialog panel.</DialogBody>
    </Dialog>
  ),
}

export const Large: Story = {
  args: { size: "lg", onClose: fn() },
  render: (args) => (
    <Dialog {...args}>
      <DialogHeader>Large Dialog</DialogHeader>
      <DialogBody>A wider dialog panel.</DialogBody>
    </Dialog>
  ),
}

export const ExtraLarge: Story = {
  args: { size: "xl", onClose: fn() },
  render: (args) => (
    <Dialog {...args}>
      <DialogHeader>Extra Large Dialog</DialogHeader>
      <DialogBody>An extra wide dialog panel.</DialogBody>
    </Dialog>
  ),
}

export const FullSize: Story = {
  args: { size: "full", onClose: fn() },
  render: (args) => (
    <Dialog {...args}>
      <DialogHeader>Full Screen Dialog</DialogHeader>
      <DialogBody>Takes up the entire viewport.</DialogBody>
    </Dialog>
  ),
}

export const ScrollInside: Story = {
  args: { scrollBehavior: "inside", onClose: fn() },
  render: (args) => (
    <Dialog {...args}>
      <DialogHeader>Scrollable Body</DialogHeader>
      <DialogBody scrollBehavior="inside">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>Paragraph {i + 1} of scrollable content.</p>
        ))}
      </DialogBody>
    </Dialog>
  ),
}

export const CloseBtn: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Dialog {...args}>
      <DialogHeader>Dialog</DialogHeader>
      <DialogBody>Content</DialogBody>
      <DialogFooter>
        <button type="button" onClick={args.onClose}>
          Close
        </button>
      </DialogFooter>
    </Dialog>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const closeBtn = canvas.getByRole("button", { name: "Close" })
    await userEvent.click(closeBtn)
    await expect(args.onClose).toHaveBeenCalledTimes(1)
  },
}

export const Accessibility: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Dialog {...args}>
      <DialogHeader>Dialog</DialogHeader>
      <DialogBody>Content</DialogBody>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("dialog")).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Dialog {...args}>
      <DialogHeader>Dialog</DialogHeader>
      <DialogBody>Content</DialogBody>
    </Dialog>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Dialog {...args}>
      <DialogHeader>Dialog</DialogHeader>
      <DialogBody>Content</DialogBody>
    </Dialog>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
