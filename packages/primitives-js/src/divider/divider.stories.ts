import type { Meta, StoryObj } from "@storybook/html-vite"
import { dividerClasses } from "./divider.classes.js"
import type { DividerClassesOptions } from "./divider.types.js"

function createDivider(args: DividerClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")
  const above = document.createElement("p")
  above.textContent = "Content above"

  const hr = document.createElement("hr")
  hr.className = dividerClasses(args)
  hr.setAttribute("aria-orientation", args.orientation || "horizontal")

  const below = document.createElement("p")
  below.textContent = "Content below"

  wrapper.appendChild(above)
  wrapper.appendChild(hr)
  wrapper.appendChild(below)
  return wrapper
}

const meta = {
  title: "Primitives/Divider",
  tags: ["autodocs", "beta"],
  render: (args) => createDivider(args as DividerClassesOptions),
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    variant: { control: "select", options: ["solid", "dashed", "dotted"] },
    labelPosition: { control: "select", options: ["start", "center", "end"] },
    my: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
  },
  args: {},
} satisfies Meta<DividerClassesOptions>

export default meta
type Story = StoryObj<DividerClassesOptions>

export const Playground: Story = {}
export const Solid: Story = { args: { variant: "solid" } }
export const Dashed: Story = { args: { variant: "dashed" } }
export const Dotted: Story = { args: { variant: "dotted" } }

export const Vertical: Story = {
  render: (args) => {
    const wrapper = document.createElement("div")
    wrapper.style.display = "flex"
    wrapper.style.alignItems = "center"
    wrapper.style.height = "50px"
    wrapper.style.gap = "16px"
    const left = document.createElement("span")
    left.textContent = "Left"
    const hr = document.createElement("hr")
    hr.className = dividerClasses({ ...args, orientation: "vertical" })
    const right = document.createElement("span")
    right.textContent = "Right"
    wrapper.appendChild(left)
    wrapper.appendChild(hr)
    wrapper.appendChild(right)
    return wrapper
  },
}

export const LabelStart: Story = { args: { withLabel: true, labelPosition: "start" } }
export const LabelCenter: Story = { args: { withLabel: true, labelPosition: "center" } }
export const LabelEnd: Story = { args: { withLabel: true, labelPosition: "end" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
