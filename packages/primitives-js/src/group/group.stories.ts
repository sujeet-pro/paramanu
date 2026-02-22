import type { Meta, StoryObj } from "@storybook/html-vite"
import { groupClasses } from "./group.classes.js"
import type { GroupClassesOptions } from "./group.types.js"

function createGroup(args: GroupClassesOptions): HTMLElement {
  const el = document.createElement("div")
  el.className = groupClasses(args)
  el.setAttribute("role", "group")
  for (let i = 1; i <= 3; i++) {
    const btn = document.createElement("button")
    btn.type = "button"
    btn.style.padding = "8px 16px"
    btn.textContent = `Action ${i}`
    el.appendChild(btn)
  }
  return el
}

const meta = {
  title: "Primitives/Group",
  tags: ["autodocs", "beta"],
  render: (args) => createGroup(args as GroupClassesOptions),
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    attached: { control: "boolean" },
    wrap: { control: "boolean" },
    grow: { control: "boolean" },
  },
  args: { gap: "3" },
} satisfies Meta<GroupClassesOptions>

export default meta
type Story = StoryObj<GroupClassesOptions>

export const Playground: Story = {}
export const Vertical: Story = { args: { orientation: "vertical" } }
export const Attached: Story = { args: { attached: true, gap: undefined } }
export const AttachedVertical: Story = {
  args: { attached: true, orientation: "vertical", gap: undefined },
}
export const WithWrap: Story = { args: { wrap: true } }
export const Grow: Story = { args: { grow: true } }
export const AlignCenter: Story = { args: { align: "center" } }
export const AlignEnd: Story = { args: { align: "end" } }
export const JustifyBetween: Story = { args: { justify: "between" } }
export const JustifyCenter: Story = { args: { justify: "center" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
