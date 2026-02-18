import type { Meta, StoryObj } from "@storybook/html-vite"

function createLocaleDemo(): HTMLElement {
  const wrapper = document.createElement("div")

  const description = document.createElement("p")
  description.textContent =
    "LocaleProvider manages the lang attribute for localization. Used by FormatNumber and FormatByte."
  wrapper.appendChild(description)

  const locales = ["en-US", "de-DE", "ja", "ar-SA"]
  locales.forEach((locale) => {
    const el = document.createElement("div")
    el.style.padding = "4px"
    const formatted = new Intl.NumberFormat(locale).format(1234567.89)
    el.textContent = `${locale}: ${formatted}`
    wrapper.appendChild(el)
  })

  return wrapper
}

const meta = {
  title: "Utilities/LocaleProvider",
  tags: ["autodocs", "stable"],
} satisfies Meta

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => createLocaleDemo(),
}
