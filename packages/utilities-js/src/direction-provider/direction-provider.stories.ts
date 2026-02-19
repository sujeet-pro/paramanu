import type { Meta, StoryObj } from "@storybook/html-vite"

function createDirectionDemo(): HTMLElement {
  const wrapper = document.createElement("div")

  const description = document.createElement("p")
  description.textContent = "DirectionProvider manages the dir attribute for RTL/LTR layouts."
  wrapper.appendChild(description)

  const ltrExample = document.createElement("div")
  ltrExample.dir = "ltr"
  ltrExample.style.padding = "8px"
  ltrExample.style.marginBottom = "8px"
  ltrExample.textContent = "LTR: This text flows left to right"
  wrapper.appendChild(ltrExample)

  const rtlExample = document.createElement("div")
  rtlExample.dir = "rtl"
  rtlExample.style.padding = "8px"
  rtlExample.textContent = "RTL: This text flows right to left"
  wrapper.appendChild(rtlExample)

  return wrapper
}

const meta = {
  title: "Utilities/DirectionProvider",
  tags: ["autodocs", "beta"],
} satisfies Meta

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => createDirectionDemo(),
}

export const LTR: Story = {
  render: () => {
    const el = document.createElement("div")
    el.dir = "ltr"
    el.style.padding = "16px"
    el.textContent = "Left-to-right layout direction"
    return el
  },
}

export const RTL: Story = {
  render: () => {
    const el = document.createElement("div")
    el.dir = "rtl"
    el.style.padding = "16px"
    el.textContent = "Right-to-left layout direction"
    return el
  },
}
