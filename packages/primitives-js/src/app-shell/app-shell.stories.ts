import type { Meta, StoryObj } from "@storybook/html-vite"
import {
  shellClasses,
  appShellHeaderClasses,
  appShellSidebarClasses,
  appShellMainClasses,
  appShellFooterClasses,
} from "./app-shell.classes.js"
import type { ShellClassesOptions } from "./app-shell.types.js"

function createShell(args: ShellClassesOptions): HTMLElement {
  const shell = document.createElement("div")
  shell.className = shellClasses(args)
  shell.style.height = "400px"
  shell.style.border = "1px solid #e2e8f0"

  const header = document.createElement("header")
  header.className = appShellHeaderClasses({ sticky: true })
  header.innerHTML =
    '<div style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">Header</div>'

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
  tags: ["autodocs", "beta"],
  render: (args) => createShell(args as ShellClassesOptions),
  argTypes: {
    sidebarCollapsed: { control: "boolean" },
    sidebarPosition: { control: "select", options: ["start", "end"] },
  },
  args: {},
} satisfies Meta<ShellClassesOptions>

export default meta
type Story = StoryObj<ShellClassesOptions>

export const Playground: Story = {}
export const SidebarEnd: Story = { args: { sidebarPosition: "end" } }
export const CollapsedSidebar: Story = { args: { sidebarCollapsed: true } }

export const SidebarStart: Story = { args: { sidebarPosition: "start" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
