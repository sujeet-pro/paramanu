import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "./drawer.js"

const meta = {
  title: "Overlays/Drawer",
  component: Drawer,
  tags: ["autodocs"],
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
      <DrawerFooter><button type="button" onClick={args.onClose}>Close</button></DrawerFooter>
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

export const Large: Story = {
  args: { size: "lg", onClose: fn() },
  render: (args) => (
    <Drawer {...args}>
      <DrawerHeader>Large Drawer</DrawerHeader>
      <DrawerBody>A wider drawer panel.</DrawerBody>
    </Drawer>
  ),
}
