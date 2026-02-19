import type { Meta, StoryObj } from "@storybook/html-vite"
import { accordionClasses, accordionItemClasses, accordionTriggerClasses, accordionContentClasses, accordionIconClasses } from "./accordion.classes.js"
import type { AccordionClassesOptions } from "./accordion.types.js"

interface AccordionArgs extends AccordionClassesOptions {}

function createAccordion(args: AccordionArgs): HTMLElement {
  const root = document.createElement("div")
  root.className = accordionClasses(args)

  const items = [
    { title: "Section 1", content: "Content for section 1.", open: true },
    { title: "Section 2", content: "Content for section 2.", open: false },
    { title: "Section 3", content: "Content for section 3.", open: false },
  ]

  items.forEach((item, i) => {
    const itemEl = document.createElement("div")
    itemEl.className = accordionItemClasses({ open: item.open, variant: args.variant })
    itemEl.dataset.state = item.open ? "open" : "closed"

    const trigger = document.createElement("button")
    trigger.className = accordionTriggerClasses({ open: item.open, size: args.size })
    trigger.type = "button"
    trigger.setAttribute("aria-expanded", String(item.open))
    trigger.setAttribute("aria-controls", `content-${i}`)

    trigger.textContent = item.title

    const icon = document.createElement("span")
    icon.className = accordionIconClasses({ open: item.open })
    icon.setAttribute("aria-hidden", "true")
    icon.innerHTML = "&#9660;"
    trigger.appendChild(icon)

    const content = document.createElement("div")
    content.className = accordionContentClasses({ open: item.open, size: args.size })
    content.id = `content-${i}`
    content.setAttribute("role", "region")
    if (!item.open) content.hidden = true

    const inner = document.createElement("div")
    inner.className = "pm-accordion__content-inner"
    inner.textContent = item.content
    content.appendChild(inner)

    itemEl.appendChild(trigger)
    itemEl.appendChild(content)
    root.appendChild(itemEl)
  })

  return root
}

const meta = {
  title: "Disclosure/Accordion",
  tags: ["autodocs", "beta"],
  render: (args) => createAccordion(args as AccordionArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "separated", "filled"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    variant: "default",
    size: "md",
  },
} satisfies Meta<AccordionArgs>

export default meta
type Story = StoryObj<AccordionArgs>

export const Playground: Story = {}

export const Bordered: Story = {
  args: { variant: "bordered" },
}

export const Separated: Story = {
  args: { variant: "separated" },
}

export const Filled: Story = {
  args: { variant: "filled" },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const Default: Story = {
  args: { variant: "default" },
}

export const Medium: Story = {
  args: { size: "md" },
}

export const AllVariantsAndSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "24px"

    const variants = ["default", "bordered", "separated", "filled"] as const
    for (const variant of variants) {
      const label = document.createElement("p")
      label.textContent = variant
      label.style.fontWeight = "bold"
      container.appendChild(label)
      container.appendChild(createAccordion({ variant, size: "md" }))
    }
    return container
  },
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
