import type { Meta, StoryObj } from "@storybook/html-vite"

function createFormatByteDemo(): HTMLElement {
  const wrapper = document.createElement("div")

  const examples = [
    { label: "500 bytes", value: 500 },
    { label: "1.5 KB", value: 1500 },
    { label: "1.5 MB", value: 1500000 },
    { label: "1.5 GB", value: 1500000000 },
  ]

  const units = ["B", "KB", "MB", "GB", "TB", "PB"]

  examples.forEach(({ label, value }) => {
    const el = document.createElement("div")
    el.style.padding = "4px"
    let size = value
    let unitIndex = 0
    while (size >= 1000 && unitIndex < units.length - 1) {
      size /= 1000
      unitIndex++
    }
    el.textContent = `${label}: ${size.toFixed(1)} ${units[unitIndex]}`
    wrapper.appendChild(el)
  })

  return wrapper
}

const meta = {
  title: "Utilities/FormatByte",
  tags: ["autodocs", "stable"],
} satisfies Meta

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => createFormatByteDemo(),
}
