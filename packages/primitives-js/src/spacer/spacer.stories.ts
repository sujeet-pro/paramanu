import type { Meta, StoryObj } from "@storybook/html-vite"
import { spacerClasses } from "./spacer.classes.js"
import type { SpacerClassesOptions } from "./spacer.types.js"

function createSpacerDemo(args: SpacerClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.display = "flex"
  wrapper.style.border = "1px dashed #ccc"
  wrapper.style.height = "50px"
  wrapper.style.alignItems = "center"

  const left = document.createElement("div")
  left.style.background = "#e2e8f0"
  left.style.padding = "8px 16px"
  left.textContent = "Left"

  const spacer = document.createElement("div")
  spacer.className = spacerClasses(args)
  spacer.setAttribute("aria-hidden", "true")

  const right = document.createElement("div")
  right.style.background = "#e2e8f0"
  right.style.padding = "8px 16px"
  right.textContent = "Right"

  wrapper.appendChild(left)
  wrapper.appendChild(spacer)
  wrapper.appendChild(right)
  return wrapper
}

const meta = {
  title: "Primitives/Spacer",
  tags: ["autodocs", "beta"],
  render: (args) => createSpacerDemo(args as SpacerClassesOptions),
  argTypes: {
    size: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    axis: { control: "select", options: ["horizontal", "vertical"] },
  },
  args: {},
} satisfies Meta<SpacerClassesOptions>

export default meta
type Story = StoryObj<SpacerClassesOptions>

export const Playground: Story = {}
export const FixedSize: Story = { args: { size: "8" } }
export const AxisHorizontal: Story = { args: { axis: "horizontal" } }
export const AxisVertical: Story = {
  args: { size: "6", axis: "vertical" },
  render: (args) => {
    const wrapper = document.createElement("div")
    const above = document.createElement("div")
    above.style.background = "#e2e8f0"
    above.style.padding = "8px 16px"
    above.textContent = "Above"
    const spacer = document.createElement("div")
    spacer.className = spacerClasses(args as SpacerClassesOptions)
    spacer.setAttribute("aria-hidden", "true")
    const below = document.createElement("div")
    below.style.background = "#e2e8f0"
    below.style.padding = "8px 16px"
    below.textContent = "Below"
    wrapper.appendChild(above)
    wrapper.appendChild(spacer)
    wrapper.appendChild(below)
    return wrapper
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
