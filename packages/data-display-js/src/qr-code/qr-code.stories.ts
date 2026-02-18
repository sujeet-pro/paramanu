import type { Meta, StoryObj } from "@storybook/html"
import { qrCodeClasses } from "./qr-code.classes.js"
import type { QrCodeClassesOptions } from "./qr-code.types.js"

function createQrCode(args: QrCodeClassesOptions): HTMLElement {
  const cls = qrCodeClasses(args)
  const root = document.createElement("div")
  root.className = cls.root
  root.setAttribute("role", "img")
  root.setAttribute("aria-label", "QR Code")
  root.innerHTML = `<svg class="${cls.svg}" viewBox="0 0 100 100"><rect width="100" height="100" fill="#eee" /><text x="50" y="55" text-anchor="middle" font-size="10">QR</text></svg>`
  return root
}

const meta = {
  title: "Data Display/QR Code",
  tags: ["autodocs"],
  render: (args) => createQrCode(args as QrCodeClassesOptions),
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
  args: { size: "md" },
} satisfies Meta<QrCodeClassesOptions>

export default meta
type Story = StoryObj<QrCodeClassesOptions>

export const Playground: Story = {}
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
