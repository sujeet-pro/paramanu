import type { Meta, StoryObj } from "@storybook/html"

function createPortalDemo(): HTMLElement {
  const wrapper = document.createElement("div")

  const description = document.createElement("p")
  description.textContent =
    "Portal renders content into a separate DOM node. Use the vanilla JS createPortal() API."
  wrapper.appendChild(description)

  const container = document.createElement("div")
  container.setAttribute("data-pm-portal", "")
  container.style.padding = "16px"
  container.style.background = "#e0f0ff"
  container.textContent = "This content would be portalled to document.body"
  wrapper.appendChild(container)

  return wrapper
}

const meta = {
  title: "Utilities/Portal",
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => createPortalDemo(),
}
