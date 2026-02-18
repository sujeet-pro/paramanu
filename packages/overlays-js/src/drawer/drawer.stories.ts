import type { Meta, StoryObj } from "@storybook/html"
import { drawerClasses, drawerHeaderClasses, drawerBodyClasses, drawerFooterClasses } from "./drawer.classes.js"
import type { DrawerClassesOptions } from "./drawer.types.js"

function createDrawer(args: DrawerClassesOptions): HTMLElement {
  const cls = drawerClasses(args)
  const root = document.createElement("div")
  root.className = cls
  root.setAttribute("role", "dialog")
  root.setAttribute("aria-modal", "true")

  const header = document.createElement("div")
  header.className = drawerHeaderClasses()
  header.textContent = "Drawer Title"
  root.appendChild(header)

  const body = document.createElement("div")
  body.className = drawerBodyClasses()
  body.textContent = "Drawer content goes here."
  root.appendChild(body)

  const footer = document.createElement("div")
  footer.className = drawerFooterClasses()
  const btn = document.createElement("button")
  btn.type = "button"
  btn.textContent = "Close"
  footer.appendChild(btn)
  root.appendChild(footer)

  return root
}

const meta = {
  title: "Overlays/Drawer",
  tags: ["autodocs"],
  render: (args) => createDrawer(args as DrawerClassesOptions),
  argTypes: {
    placement: { control: "select", options: ["start", "end", "top", "bottom"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl", "full"] },
  },
  args: { placement: "end", size: "md" },
} satisfies Meta<DrawerClassesOptions>

export default meta
type Story = StoryObj<DrawerClassesOptions>

export const Playground: Story = {}
export const StartPlacement: Story = { args: { placement: "start" } }
export const Large: Story = { args: { size: "lg" } }
