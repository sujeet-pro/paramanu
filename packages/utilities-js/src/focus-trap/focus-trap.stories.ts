import type { Meta, StoryObj } from "@storybook/html-vite"

function createFocusTrapDemo(): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.padding = "24px"
  wrapper.style.border = "2px solid #ccc"

  const p = document.createElement("p")
  p.textContent = "Focus trap demo. Use the vanilla JS createFocusTrap() API to trap focus."
  wrapper.appendChild(p)

  const btn1 = document.createElement("button")
  btn1.type = "button"
  btn1.textContent = "First button"
  wrapper.appendChild(btn1)

  const btn2 = document.createElement("button")
  btn2.type = "button"
  btn2.textContent = "Second button"
  btn2.style.marginLeft = "8px"
  wrapper.appendChild(btn2)

  const btn3 = document.createElement("button")
  btn3.type = "button"
  btn3.textContent = "Third button"
  btn3.style.marginLeft = "8px"
  wrapper.appendChild(btn3)

  return wrapper
}

const meta = {
  title: "Utilities/FocusTrap",
  tags: ["autodocs", "stable"],
} satisfies Meta

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => createFocusTrapDemo(),
}
