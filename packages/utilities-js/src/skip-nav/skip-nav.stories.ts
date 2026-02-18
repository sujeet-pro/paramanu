import type { Meta, StoryObj } from "@storybook/html-vite"
import { skipNavClasses, skipNavTargetClasses } from "./skip-nav.classes.js"

function createSkipNav(): HTMLElement {
  const wrapper = document.createElement("div")

  const link = document.createElement("a")
  link.href = "#main-content"
  link.className = skipNavClasses()
  link.textContent = "Skip to content"
  wrapper.appendChild(link)

  const nav = document.createElement("nav")
  nav.style.padding = "16px"
  nav.style.background = "#f0f0f0"
  nav.textContent = "Navigation bar"
  wrapper.appendChild(nav)

  const main = document.createElement("main")
  main.id = "main-content"
  main.className = skipNavTargetClasses()
  main.tabIndex = -1
  main.style.padding = "16px"
  main.textContent = "Main content area. Tab to the skip link to see it."
  wrapper.appendChild(main)

  return wrapper
}

const meta = {
  title: "Utilities/SkipNav",
  tags: ["autodocs", "stable"],
} satisfies Meta

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => createSkipNav(),
}
