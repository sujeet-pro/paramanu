import type { Meta, StoryObj } from "@storybook/html-vite"
import {
  dropdownClasses,
  dropdownMenuTriggerClasses,
  dropdownMenuContentClasses,
} from "./dropdown-menu.classes.js"
import type { DropdownClassesOptions } from "./dropdown-menu.types.js"

interface DropdownArgs extends DropdownClassesOptions {}

function createDropdown(args: DropdownArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = dropdownClasses(args)

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
  tags: ["autodocs", "beta"],
  render: (args) => createDropdown(args as DropdownArgs),
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
} satisfies Meta<DropdownArgs>

export default meta
type Story = StoryObj<DropdownArgs>

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

export const Hover: Story = {
  args: { open: true },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
