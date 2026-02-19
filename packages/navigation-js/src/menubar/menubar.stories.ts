import type { Meta, StoryObj } from "@storybook/html-vite"
import { menubarClasses, menubarItemClasses } from "./menubar.classes.js"

interface MenubarArgs {
  items: Array<{ text: string; active?: boolean; disabled?: boolean }>
}

function createMenubar(args: MenubarArgs): HTMLElement {
  const ul = document.createElement("ul")
  ul.className = menubarClasses()
  ul.setAttribute("role", "menubar")

  args.items.forEach((item) => {
    const li = document.createElement("li")
    li.setAttribute("role", "none")

    const btn = document.createElement("button")
    btn.className = menubarItemClasses({ active: item.active, disabled: item.disabled })
    btn.setAttribute("role", "menuitem")
    btn.textContent = item.text
    if (item.disabled) {
      btn.disabled = true
      btn.setAttribute("aria-disabled", "true")
    }

    li.appendChild(btn)
    ul.appendChild(li)
  })

  return ul
}

const meta = {
  title: "Navigation/Menubar",
  tags: ["autodocs", "beta"],
  render: (args) => createMenubar(args as MenubarArgs),
  args: {
    items: [
      { text: "File" },
      { text: "Edit" },
      { text: "View" },
      { text: "Help" },
    ],
  },
} satisfies Meta<MenubarArgs>

export default meta
type Story = StoryObj<MenubarArgs>

export const Playground: Story = {}

export const WithActive: Story = {
  args: {
    items: [
      { text: "File", active: true },
      { text: "Edit" },
      { text: "View" },
    ],
  },
}

export const WithDisabled: Story = {
  args: {
    items: [
      { text: "File" },
      { text: "Edit", disabled: true },
      { text: "View" },
    ],
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
