import type { Meta, StoryObj } from "@storybook/html-vite"
import { themeProviderClasses } from "./theme-provider.classes.js"

function createThemeProviderDemo(): HTMLElement {
  const wrapper = document.createElement("div")

  const description = document.createElement("p")
  description.textContent = "ThemeProvider manages color scheme via data-pm-theme attribute."
  wrapper.appendChild(description)

  const modes = ["light", "dark", "system"] as const
  modes.forEach((mode) => {
    const el = document.createElement("div")
    el.className = themeProviderClasses(mode)
    el.style.padding = "8px"
    el.style.marginBottom = "4px"
    el.textContent = `Theme mode: ${mode} (class: ${themeProviderClasses(mode)})`
    wrapper.appendChild(el)
  })

  return wrapper
}

const meta = {
  title: "Utilities/ThemeProvider",
  tags: ["autodocs", "stable"],
} satisfies Meta

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => createThemeProviderDemo(),
}
