import type { Meta, StoryObj } from "@storybook/html"
import { contextMenuClasses } from "./context-menu.classes.js"
import type { ContextMenuClassesOptions } from "./context-menu.types.js"

interface ContextMenuArgs extends ContextMenuClassesOptions {}

function createContextMenu(args: ContextMenuArgs): HTMLElement {
  const div = document.createElement("div")
  div.className = contextMenuClasses(args)
  div.setAttribute("role", "menu")

  ;["Cut", "Copy", "Paste"].forEach((text) => {
    const item = document.createElement("div")
    item.setAttribute("role", "menuitem")
    item.textContent = text
    div.appendChild(item)
  })

  return div
}

const meta = {
  title: "Navigation/Context Menu",
  tags: ["autodocs"],
  render: (args) => createContextMenu(args as ContextMenuArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    open: { control: "boolean" },
  },
  args: {
    size: "md",
    open: true,
  },
} satisfies Meta<ContextMenuArgs>

export default meta
type Story = StoryObj<ContextMenuArgs>

export const Playground: Story = {}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const Closed: Story = {
  args: { open: false },
}
