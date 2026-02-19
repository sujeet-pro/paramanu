import type { Meta, StoryObj } from "@storybook/html-vite"
import { emptyClasses } from "./empty-state.classes.js"
import type { EmptyClassesOptions } from "./empty-state.types.js"

function createEmpty(args: EmptyClassesOptions): HTMLElement {
  const cls = emptyClasses(args)
  const root = document.createElement("div")
  root.className = cls.root
  const heading = document.createElement("h3")
  heading.className = cls.heading
  heading.textContent = "No items found"
  const desc = document.createElement("p")
  desc.className = cls.description
  desc.textContent = "Get started by creating your first item."
  const actions = document.createElement("div")
  actions.className = cls.actions
  const btn = document.createElement("button")
  btn.type = "button"
  btn.textContent = "Create Item"
  actions.appendChild(btn)
  root.appendChild(heading)
  root.appendChild(desc)
  root.appendChild(actions)
  return root
}

const meta = {
  title: "Data Display/Empty State",
  tags: ["autodocs", "beta"],
  render: (args) => createEmpty(args as EmptyClassesOptions),
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    bordered: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<EmptyClassesOptions>

export default meta
type Story = StoryObj<EmptyClassesOptions>

export const Playground: Story = {}
export const Bordered: Story = { args: { bordered: true } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
