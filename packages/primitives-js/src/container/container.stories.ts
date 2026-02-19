import type { Meta, StoryObj } from "@storybook/html-vite"
import { containerClasses } from "./container.classes.js"
import type { ContainerClassesOptions } from "./container.types.js"

function createContainer(args: ContainerClassesOptions): HTMLElement {
  const el = document.createElement("div")
  el.className = containerClasses(args)
  el.style.border = "1px dashed #ccc"
  const child = document.createElement("div")
  child.style.background = "#e2e8f0"
  child.style.padding = "16px"
  child.textContent = "Content inside container"
  el.appendChild(child)
  return el
}

const meta = {
  title: "Primitives/Container",
  tags: ["autodocs", "beta"],
  render: (args) => createContainer(args as ContainerClassesOptions),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl", "full"] },
    fluid: { control: "boolean" },
    px: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    center: { control: "boolean" },
  },
  args: { size: "lg" },
} satisfies Meta<ContainerClassesOptions>

export default meta
type Story = StoryObj<ContainerClassesOptions>

export const Playground: Story = {}
export const ExtraSmall: Story = { args: { size: "xs" } }
export const Small: Story = { args: { size: "sm" } }
export const Medium: Story = { args: { size: "md" } }
export const Large: Story = { args: { size: "lg" } }
export const ExtraLarge: Story = { args: { size: "xl" } }
export const TwoXL: Story = { args: { size: "2xl" } }
export const Full: Story = { args: { size: "full" } }
export const Fluid: Story = { args: { fluid: true } }
export const Centered: Story = { args: { center: true } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
