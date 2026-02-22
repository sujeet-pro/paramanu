import type { Meta, StoryObj } from "@storybook/html-vite"
import { floatClasses } from "./float.classes.js"
import type { FloatClassesOptions } from "./float.types.js"

function createFloat(args: FloatClassesOptions): HTMLElement {
  const parent = document.createElement("div")
  parent.style.position = "relative"
  parent.style.width = "200px"
  parent.style.height = "200px"
  parent.style.border = "1px dashed #ccc"
  parent.style.background = "#f8fafc"

  const float = document.createElement("div")
  float.className = floatClasses(args)
  const badge = document.createElement("div")
  badge.style.background = "#ef4444"
  badge.style.color = "white"
  badge.style.borderRadius = "50%"
  badge.style.width = "24px"
  badge.style.height = "24px"
  badge.style.display = "flex"
  badge.style.alignItems = "center"
  badge.style.justifyContent = "center"
  badge.style.fontSize = "12px"
  badge.textContent = "3"
  float.appendChild(badge)

  const content = document.createElement("div")
  content.style.padding = "16px"
  content.textContent = "Parent"

  parent.appendChild(float)
  parent.appendChild(content)
  return parent
}

const meta = {
  title: "Primitives/Float",
  tags: ["autodocs", "beta"],
  render: (args) => createFloat(args as FloatClassesOptions),
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top-start",
        "top-center",
        "top-end",
        "middle-start",
        "middle-center",
        "middle-end",
        "bottom-start",
        "bottom-center",
        "bottom-end",
      ],
    },
    offset: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6"] },
  },
  args: { placement: "top-end" },
} satisfies Meta<FloatClassesOptions>

export default meta
type Story = StoryObj<FloatClassesOptions>

export const Playground: Story = {}
export const TopStart: Story = { args: { placement: "top-start" } }
export const TopCenter: Story = { args: { placement: "top-center" } }
export const TopEnd: Story = { args: { placement: "top-end" } }
export const MiddleStart: Story = { args: { placement: "middle-start" } }
export const MiddleCenter: Story = { args: { placement: "middle-center" } }
export const MiddleEnd: Story = { args: { placement: "middle-end" } }
export const BottomStart: Story = { args: { placement: "bottom-start" } }
export const BottomCenter: Story = { args: { placement: "bottom-center" } }
export const BottomEnd: Story = { args: { placement: "bottom-end" } }
export const WithOffset: Story = { args: { placement: "top-end", offset: "2" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
