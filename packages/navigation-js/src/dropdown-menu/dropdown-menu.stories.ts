import type { Meta, StoryObj } from "@storybook/html"
import { dropdownMenuClasses, dropdownMenuTriggerClasses, dropdownMenuContentClasses } from "./dropdown-menu.classes.js"
import type { DropdownMenuClassesOptions } from "./dropdown-menu.types.js"

interface DropdownMenuArgs extends DropdownMenuClassesOptions {}

function createDropdownMenu(args: DropdownMenuArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = dropdownMenuClasses(args)

  const trigger = document.createElement("button")
  trigger.className = dropdownMenuTriggerClasses()
  trigger.textContent = "Options"
  trigger.setAttribute("aria-haspopup", "true")
  trigger.setAttribute("aria-expanded", String(args.open ?? false))

  const content = document.createElement("div")
  content.className = dropdownMenuContentClasses()
  content.setAttribute("role", "menu")

  ;["Item 1", "Item 2", "Item 3"].forEach((text) => {
    const item = document.createElement("div")
    item.setAttribute("role", "menuitem")
    item.textContent = text
    content.appendChild(item)
  })

  wrapper.appendChild(trigger)
  wrapper.appendChild(content)
  return wrapper
}

const meta = {
  title: "Navigation/Dropdown Menu",
  tags: ["autodocs"],
  render: (args) => createDropdownMenu(args as DropdownMenuArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    open: { control: "boolean" },
  },
  args: {
    size: "md",
    open: false,
  },
} satisfies Meta<DropdownMenuArgs>

export default meta
type Story = StoryObj<DropdownMenuArgs>

export const Playground: Story = {}

export const Open: Story = {
  args: { open: true },
}

export const Small: Story = {
  args: { size: "sm", open: true },
}

export const Large: Story = {
  args: { size: "lg", open: true },
}
