import type { Meta, StoryObj } from "@storybook/html"
import {
  appShellClasses,
  appShellHeaderClasses,
  appShellSidebarClasses,
  appShellMainClasses,
  appShellFooterClasses,
} from "./app-shell.classes.js"
import type { AppShellClassesOptions } from "./app-shell.types.js"

function createAppShell(args: AppShellClassesOptions): HTMLElement {
  const shell = document.createElement("div")
  shell.className = appShellClasses(args)
  shell.style.height = "400px"
  shell.style.border = "1px solid #e2e8f0"

  const header = document.createElement("header")
  header.className = appShellHeaderClasses({ sticky: true })
  header.innerHTML = '<div style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">Header</div>'

  const sidebar = document.createElement("aside")
  sidebar.className = appShellSidebarClasses({ width: "md", collapsed: args.sidebarCollapsed })
  sidebar.innerHTML = '<div style="padding: 16px;">Sidebar</div>'

  const main = document.createElement("main")
  main.className = appShellMainClasses()
  main.innerHTML = '<div style="padding: 16px;">Main content area</div>'

  const footer = document.createElement("footer")
  footer.className = appShellFooterClasses()
  footer.innerHTML = '<div style="padding: 12px 16px; border-top: 1px solid #e2e8f0;">Footer</div>'

  shell.appendChild(header)
  shell.appendChild(sidebar)
  shell.appendChild(main)
  shell.appendChild(footer)
  return shell
}

const meta = {
  title: "Primitives/App Shell",
  tags: ["autodocs"],
  render: (args) => createAppShell(args as AppShellClassesOptions),
  argTypes: {
    sidebarCollapsed: { control: "boolean" },
    sidebarPosition: { control: "select", options: ["start", "end"] },
  },
  args: {},
} satisfies Meta<AppShellClassesOptions>

export default meta
type Story = StoryObj<AppShellClassesOptions>

export const Playground: Story = {}
export const SidebarEnd: Story = { args: { sidebarPosition: "end" } }
export const CollapsedSidebar: Story = { args: { sidebarCollapsed: true } }
