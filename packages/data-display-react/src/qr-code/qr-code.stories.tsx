import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { QrCode } from "./qr-code.js"

const meta = {
  title: "Data Display/QR Code",
  component: QrCode,
  tags: ["autodocs", "stable"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
  args: { size: "md" },
} satisfies Meta<typeof QrCode>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <QrCode {...args}>
      <svg viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#eee" />
        <text x="50" y="55" textAnchor="middle" fontSize="10">
          QR
        </text>
      </svg>
    </QrCode>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <QrCode {...args}>
      <svg viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#eee" />
      </svg>
    </QrCode>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <QrCode {...args}>
      <svg viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#eee" />
      </svg>
    </QrCode>
  ),
}

export const ExtraLarge: Story = {
  args: { size: "xl" },
  render: (args) => (
    <QrCode {...args}>
      <svg viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#eee" />
      </svg>
    </QrCode>
  ),
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <QrCode {...args}>
      <svg viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#eee" />
      </svg>
    </QrCode>
  ),
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <QrCode {...args}>
      <svg viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#eee" />
      </svg>
    </QrCode>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <QrCode>
      <svg viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#eee" />
      </svg>
    </QrCode>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-qr-code")
    await expect(el).toBeTruthy()
  },
}

export const Accessibility: Story = {
  render: () => (
    <QrCode>
      <svg viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#eee" />
      </svg>
    </QrCode>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toBeTruthy()
  },
}
