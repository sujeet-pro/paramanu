import type { Meta, StoryObj } from "@storybook/html-vite"
import { collapsibleClasses, collapsibleTriggerClasses, collapsibleContentClasses } from "./collapsible.classes.js"
import type { CollapsibleClassesOptions } from "./collapsible.types.js"

interface CollapsibleArgs extends CollapsibleClassesOptions {}

function createCollapsible(args: CollapsibleArgs): HTMLElement {
  const root = document.createElement("div")
  root.className = collapsibleClasses(args)

  const trigger = document.createElement("button")
  trigger.className = collapsibleTriggerClasses({ open: args.open, disabled: args.disabled, size: args.size })
  trigger.type = "button"
  trigger.textContent = "Toggle Content"
  trigger.setAttribute("aria-expanded", String(args.open ?? false))
  trigger.setAttribute("aria-controls", "collapsible-content")
  if (args.disabled) {
    trigger.disabled = true
    trigger.setAttribute("aria-disabled", "true")
  }

  const content = document.createElement("div")
  content.className = collapsibleContentClasses({ open: args.open, size: args.size })
  content.id = "collapsible-content"
  content.setAttribute("role", "region")

  const inner = document.createElement("div")
  inner.className = "pm-collapsible__content-inner"
  inner.textContent = "This content can be expanded and collapsed."
  content.appendChild(inner)

  root.appendChild(trigger)
  root.appendChild(content)
  return root
}

const meta = {
  title: "Disclosure/Collapsible",
  tags: ["autodocs", "beta"],
  render: (args) => createCollapsible(args as CollapsibleArgs),
  argTypes: {
    open: { control: "boolean" },
    disabled: { control: "boolean" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    open: false,
    disabled: false,
    size: "md",
  },
} satisfies Meta<CollapsibleArgs>

export default meta
type Story = StoryObj<CollapsibleArgs>

export const Playground: Story = {}

export const Open: Story = {
  args: { open: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Small: Story = {
  args: { size: "sm", open: true },
}

export const Large: Story = {
  args: { size: "lg", open: true },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
