import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "./drawer.js"

const meta = {
  title: "Overlays/Drawer",
  component: Drawer,
  tags: ["autodocs", "stable"],
  argTypes: {
    placement: { control: "select", options: ["start", "end", "top", "bottom"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl", "full"] },
    open: { control: "boolean" },
  },
  args: { open: true, placement: "end", size: "md" },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Drawer {...args}>
      <DrawerHeader>Drawer Title</DrawerHeader>
      <DrawerBody>Drawer content goes here.</DrawerBody>
      <DrawerFooter>
        <button type="button" onClick={args.onClose}>Close</button>
      </DrawerFooter>
    </Drawer>
  ),
}

export const StartPlacement: Story = {
  args: { placement: "start", onClose: fn() },
  render: (args) => (
    <Drawer {...args}>
      <DrawerHeader>Left Drawer</DrawerHeader>
      <DrawerBody>Slides in from the left.</DrawerBody>
    </Drawer>
  ),
}

export const TopPlacement: Story = {
  args: { placement: "top", onClose: fn() },
  render: (args) => (
    <Drawer {...args}>
      <DrawerHeader>Top Drawer</DrawerHeader>
      <DrawerBody>Slides in from the top.</DrawerBody>
    </Drawer>
  ),
}

export const BottomPlacement: Story = {
  args: { placement: "bottom", onClose: fn() },
  render: (args) => (
    <Drawer {...args}>
      <DrawerHeader>Bottom Drawer</DrawerHeader>
      <DrawerBody>Slides in from the bottom.</DrawerBody>
    </Drawer>
  ),
}

export const Large: Story = {
  args: { size: "lg", onClose: fn() },
  render: (args) => (
    <Drawer {...args}>
      <DrawerHeader>Large Drawer</DrawerHeader>
      <DrawerBody>A wider drawer panel.</DrawerBody>
    </Drawer>
  ),
}

export const Full: Story = {
  args: { size: "full", onClose: fn() },
  render: (args) => (
    <Drawer {...args}>
      <DrawerHeader>Full Drawer</DrawerHeader>
      <DrawerBody>Full width drawer.</DrawerBody>
    </Drawer>
  ),
}

export const CloseButton: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Drawer {...args}>
      <DrawerHeader>Drawer</DrawerHeader>
      <DrawerBody>Content</DrawerBody>
      <DrawerFooter>
        <button type="button" onClick={args.onClose}>
          Close
        </button>
      </DrawerFooter>
    </Drawer>
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
    <Drawer {...args}>
      <DrawerHeader>Drawer</DrawerHeader>
      <DrawerBody>Content</DrawerBody>
    </Drawer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("dialog")).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Drawer {...args}>
      <DrawerHeader>Drawer</DrawerHeader>
      <DrawerBody>Content</DrawerBody>
    </Drawer>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Drawer {...args}>
      <DrawerHeader>Drawer</DrawerHeader>
      <DrawerBody>Content</DrawerBody>
    </Drawer>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
