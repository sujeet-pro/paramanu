import type { Meta, StoryObj } from "@storybook/html"
import { sidebarClasses, sidebarSectionClasses, sidebarSectionLabelClasses, sidebarItemClasses } from "./sidebar.classes.js"
import type { SidebarClassesOptions } from "./sidebar.types.js"

interface SidebarArgs extends SidebarClassesOptions {}

function createSidebar(args: SidebarArgs): HTMLElement {
  const nav = document.createElement("nav")
  nav.className = sidebarClasses(args)

  const section = document.createElement("div")
  section.className = sidebarSectionClasses()

  const label = document.createElement("div")
  label.className = sidebarSectionLabelClasses()
  label.textContent = "Navigation"
  section.appendChild(label)

  const items = [
    { text: "Dashboard", active: true },
    { text: "Settings", active: false },
    { text: "Disabled", active: false, disabled: true },
  ]

  items.forEach((item) => {
    const a = document.createElement("a")
    a.className = sidebarItemClasses({ active: item.active, disabled: item.disabled })
    a.href = "#"
    a.textContent = item.text
    if (item.active) a.setAttribute("aria-current", "page")
    if (item.disabled) {
      a.setAttribute("aria-disabled", "true")
      a.tabIndex = -1
    }
    section.appendChild(a)
  })

  nav.appendChild(section)
  return nav
}

const meta = {
  title: "Navigation/Sidebar",
  tags: ["autodocs"],
  render: (args) => createSidebar(args as SidebarArgs),
  argTypes: {
    width: {
      control: "select",
      options: ["narrow", "default", "wide"],
    },
    position: {
      control: "select",
      options: ["left", "right"],
    },
    collapsed: { control: "boolean" },
  },
  args: {
    width: "default",
    position: "left",
    collapsed: false,
  },
} satisfies Meta<SidebarArgs>

export default meta
type Story = StoryObj<SidebarArgs>

export const Playground: Story = {}

export const Narrow: Story = {
  args: { width: "narrow" },
}

export const Wide: Story = {
  args: { width: "wide" },
}

export const Collapsed: Story = {
  args: { collapsed: true },
}

export const RightPosition: Story = {
  args: { position: "right" },
}
