import type { Meta, StoryObj } from "@storybook/html-vite"

function createFormatNumberDemo(): HTMLElement {
  const wrapper = document.createElement("div")

  const examples = [
    { label: "Decimal", value: 1234567.89, options: {} },
    { label: "Currency (EUR)", value: 1234.56, options: { style: "currency", currency: "EUR", locale: "de-DE" } },
    { label: "Percent", value: 0.856, options: { style: "percent" } },
    { label: "Compact", value: 1500000, options: { notation: "compact" } },
  ] as const

  examples.forEach(({ label, value, options }) => {
    const el = document.createElement("div")
    el.style.padding = "4px"
    const locale = (options as Record<string, string>).locale ?? "en-US"
    const formatted = new Intl.NumberFormat(locale, options as Intl.NumberFormatOptions).format(value)
    el.textContent = `${label}: ${formatted}`
    wrapper.appendChild(el)
  })

  return wrapper
}

const meta = {
  title: "Utilities/FormatNumber",
  tags: ["autodocs", "beta"],
} satisfies Meta

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => createFormatNumberDemo(),
}
