import type { Meta, StoryObj } from "@storybook/html-vite"
import { ctxMenuClasses } from "./context-menu.classes.js"
import type { CtxMenuClassesOptions } from "./context-menu.types.js"

interface CtxMenuArgs extends CtxMenuClassesOptions {}

function createCtxMenu(args: CtxMenuArgs): HTMLElement {
  const div = document.createElement("div")
  div.className = ctxMenuClasses(args)
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
  tags: ["autodocs", "beta"],
  render: (args) => createCtxMenu(args as CtxMenuArgs),
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
} satisfies Meta<CtxMenuArgs>

export default meta
type Story = StoryObj<CtxMenuArgs>

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

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
