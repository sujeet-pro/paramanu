import type { Meta, StoryObj } from "@storybook/html-vite"
import { themeClasses } from "./theme-provider.classes.js"

function createThemeDemo(): HTMLElement {
  const wrapper = document.createElement("div")

  const description = document.createElement("p")
  description.textContent = "Theme manages color scheme via data-pm-theme attribute."
  wrapper.appendChild(description)

  const modes = ["light", "dark", "system"] as const
  modes.forEach((mode) => {
    const el = document.createElement("div")
    el.className = themeClasses(mode)
    el.style.padding = "8px"
    el.style.marginBottom = "4px"
    el.textContent = `Theme mode: ${mode} (class: ${themeClasses(mode)})`
    wrapper.appendChild(el)
  })

  return wrapper
}

const meta = {
  title: "Utilities/Theme",
  tags: ["autodocs", "beta"],
} satisfies Meta

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => createThemeDemo(),
}
