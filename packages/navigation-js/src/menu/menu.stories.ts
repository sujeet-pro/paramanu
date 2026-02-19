import type { Meta, StoryObj } from "@storybook/html-vite"
import {
  menuClasses,
  menuItemClasses,
  menuSeparatorClasses,
  menuGroupClasses,
  menuGroupLabelClasses,
} from "./menu.classes.js"
import type { MenuClassesOptions } from "./menu.types.js"

interface MenuArgs extends MenuClassesOptions {}

function createMenu(args: MenuArgs): HTMLElement {
  const ul = document.createElement("ul")
  ul.className = menuClasses(args)
  ul.setAttribute("role", "menu")

  const items = ["Cut", "Copy", "Paste"]
  items.forEach((text) => {
    const li = document.createElement("li")
    li.className = menuItemClasses()
    li.setAttribute("role", "menuitem")
    li.textContent = text
    ul.appendChild(li)
  })

  const sep = document.createElement("li")
  sep.className = menuSeparatorClasses()
  sep.setAttribute("role", "separator")
  ul.appendChild(sep)

  const destructive = document.createElement("li")
  destructive.className = menuItemClasses({ destructive: true })
  destructive.setAttribute("role", "menuitem")
  destructive.textContent = "Delete"
  ul.appendChild(destructive)

  return ul
}

const meta = {
  title: "Navigation/Menu",
  tags: ["autodocs", "beta"],
  render: (args) => createMenu(args as MenuArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    size: "md",
  },
} satisfies Meta<MenuArgs>

export default meta
type Story = StoryObj<MenuArgs>

export const Playground: Story = {}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
