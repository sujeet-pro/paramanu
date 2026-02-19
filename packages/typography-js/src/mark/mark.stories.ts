import type { Meta, StoryObj } from "@storybook/html-vite"
import { markClasses } from "./mark.classes.js"
import type { MarkClassesOptions } from "./mark.types.js"

function createMark(args: MarkClassesOptions): HTMLElement {
  const el = document.createElement("mark")
  el.className = markClasses(args)
  el.textContent = "marked text"
  return el
}

const meta = {
  title: "Typography/Mark",
  tags: ["autodocs", "beta"],
  render: (args) => createMark(args as MarkClassesOptions),
  argTypes: {
    variant: { control: "select", options: ["default", "underline", "circle", "filled"] },
    color: { control: "select", options: ["yellow", "primary", "danger", "success", "info"] },
  },
  args: {},
} satisfies Meta<MarkClassesOptions>

export default meta
type Story = StoryObj<MarkClassesOptions>

export const Playground: Story = {}
export const Underline: Story = { args: { variant: "underline" } }
export const Circle: Story = { args: { variant: "circle" } }
export const Filled: Story = { args: { variant: "filled" } }
export const ColorYellow: Story = { args: { color: "yellow" } }
export const Primary: Story = { args: { color: "primary" } }
export const ColorDanger: Story = { args: { color: "danger" } }
export const ColorSuccess: Story = { args: { color: "success" } }
export const ColorInfo: Story = { args: { color: "info" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
