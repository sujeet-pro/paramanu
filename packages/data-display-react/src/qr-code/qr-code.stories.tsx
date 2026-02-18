import type { Meta, StoryObj } from "@storybook/react"
import { QrCode } from "./qr-code.js"

const meta = {
  title: "Data Display/QR Code",
  component: QrCode,
  tags: ["autodocs"],
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
      <svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#eee" /><text x="50" y="55" textAnchor="middle" fontSize="10">QR</text></svg>
    </QrCode>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <QrCode {...args}>
      <svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#eee" /></svg>
    </QrCode>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <QrCode {...args}>
      <svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#eee" /></svg>
    </QrCode>
  ),
}

export const ExtraLarge: Story = {
  args: { size: "xl" },
  render: (args) => (
    <QrCode {...args}>
      <svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#eee" /></svg>
    </QrCode>
  ),
}
