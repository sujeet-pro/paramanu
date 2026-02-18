import type { Meta, StoryObj } from "@storybook/html-vite"
import { tabsClasses, tabListClasses, tabClasses, tabPanelClasses } from "./tabs.classes.js"
import type { TabsClassesOptions } from "./tabs.types.js"

interface TabsArgs extends TabsClassesOptions {}

function createTabs(args: TabsArgs): HTMLElement {
  const root = document.createElement("div")
  root.className = tabsClasses(args)

  const list = document.createElement("div")
  list.className = tabListClasses()
  list.setAttribute("role", "tablist")

  const tabs = ["Tab 1", "Tab 2", "Tab 3"]
  tabs.forEach((text, i) => {
    const btn = document.createElement("button")
    btn.className = tabClasses({ active: i === 0 })
    btn.setAttribute("role", "tab")
    btn.setAttribute("aria-selected", String(i === 0))
    btn.tabIndex = i === 0 ? 0 : -1
    btn.type = "button"
    btn.textContent = text
    list.appendChild(btn)
  })

  const panel = document.createElement("div")
  panel.className = tabPanelClasses()
  panel.setAttribute("role", "tabpanel")
  panel.tabIndex = 0
  panel.textContent = "Content for Tab 1"

  root.appendChild(list)
  root.appendChild(panel)
  return root
}

const meta = {
  title: "Navigation/Tabs",
  tags: ["autodocs", "stable"],
  render: (args) => createTabs(args as TabsArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["line", "enclosed", "pill"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    fitted: { control: "boolean" },
  },
  args: {
    variant: "line",
    size: "md",
    orientation: "horizontal",
    fitted: false,
  },
} satisfies Meta<TabsArgs>

export default meta
type Story = StoryObj<TabsArgs>

export const Playground: Story = {}

export const Enclosed: Story = {
  args: { variant: "enclosed" },
}

export const Pill: Story = {
  args: { variant: "pill" },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
}

export const Fitted: Story = {
  args: { fitted: true },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
