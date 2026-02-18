import type { Meta, StoryObj } from "@storybook/html-vite"

function createClientOnlyDemo(): HTMLElement {
  const wrapper = document.createElement("div")

  const description = document.createElement("p")
  description.textContent =
    "ClientOnly renders content only on the client side after hydration. Use the React component or the isClient() function."
  wrapper.appendChild(description)

  const demo = document.createElement("div")
  demo.style.padding = "16px"
  demo.style.background = "#e0ffe0"
  demo.textContent = "This content is client-rendered"
  wrapper.appendChild(demo)

  return wrapper
}

const meta = {
  title: "Utilities/ClientOnly",
  tags: ["autodocs", "stable"],
} satisfies Meta

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => createClientOnlyDemo(),
}
