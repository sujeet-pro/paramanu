import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Popover } from "./popover.js"

const meta = {
  title: "Overlays/Popover",
  component: Popover,
  tags: ["autodocs", "beta"],
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top",
        "bottom",
        "left",
        "right",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
      ],
    },
    hasArrow: { control: "boolean" },
    open: { control: "boolean" },
  },
  args: { open: true, placement: "bottom" },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <button type="button">Trigger</button>
      <Popover {...args}>
        <div style={{ padding: 16 }}>Popover content</div>
      </Popover>
    </div>
  ),
}

export const WithArrow: Story = {
  args: { hasArrow: true, onClose: fn() },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <button type="button">Trigger</button>
      <Popover {...args}>
        <div style={{ padding: 16 }}>Popover with arrow</div>
      </Popover>
    </div>
  ),
}

export const TopPlacement: Story = {
  args: { placement: "top", onClose: fn() },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <Popover {...args}>
        <div style={{ padding: 16 }}>Top popover</div>
      </Popover>
    </div>
  ),
}

export const LeftPlacement: Story = {
  args: { placement: "left", onClose: fn() },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <Popover {...args}>
        <div style={{ padding: 16 }}>Left popover</div>
      </Popover>
    </div>
  ),
}

export const RightPlacement: Story = {
  args: { placement: "right", onClose: fn() },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <Popover {...args}>
        <div style={{ padding: 16 }}>Right popover</div>
      </Popover>
    </div>
  ),
}

export const TriggerOpen: Story = {
  args: { open: false, onClose: fn() },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <button type="button">Open Popover</button>
      <Popover {...args}>
        <div style={{ padding: 16 }}>Popover content</div>
      </Popover>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Open Popover" })
    await userEvent.click(trigger)
  },
}

export const Accessibility: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <button type="button">Trigger</button>
      <Popover {...args}>
        <div style={{ padding: 16 }}>Accessible popover</div>
      </Popover>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: "Trigger" })).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <Popover {...args}>
        <div style={{ padding: 16 }}>Content</div>
      </Popover>
    </div>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <div style={{ padding: 100 }}>
      <button type="button">Trigger</button>
      <Popover {...args}>
        <div style={{ padding: 16 }}>Content</div>
      </Popover>
    </div>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
