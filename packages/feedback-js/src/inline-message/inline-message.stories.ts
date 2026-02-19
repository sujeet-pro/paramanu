import type { Meta, StoryObj } from "@storybook/html-vite"
import { inlineMsgClasses } from "./inline-message.classes.js"
import type { InlineMsgClassesOptions, InlineMsgVariant, InlineMsgSize } from "./inline-message.types.js"

interface InlineMsgArgs extends InlineMsgClassesOptions {
  text: string
}

function createInlineMsg(args: InlineMsgArgs): HTMLDivElement {
  const classes = inlineMsgClasses({ variant: args.variant, size: args.size })
  const variant = args.variant ?? "info"
  const role = variant === "warning" || variant === "danger" ? "alert" : "status"

  const el = document.createElement("div")
  el.className = classes.root
  el.setAttribute("role", role)

  const content = document.createElement("div")
  content.className = classes.content
  content.textContent = args.text
  el.appendChild(content)

  return el
}

const meta = {
  title: "Feedback/Inline Message",
  tags: ["autodocs", "beta"],
  render: (args) => createInlineMsg(args as InlineMsgArgs),
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "danger"] },
    size: { control: "select", options: ["sm", "md"] },
    text: { control: "text" },
  },
  args: {
    variant: "info",
    size: "md",
    text: "This is an inline message.",
  },
} satisfies Meta<InlineMsgArgs>

export default meta
type Story = StoryObj<InlineMsgArgs>

export const Playground: Story = {}

export const AllVariantsAndSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "8px"

    const variants: InlineMsgVariant[] = ["info", "success", "warning", "danger"]
    const sizes: InlineMsgSize[] = ["sm", "md"]

    for (const variant of variants) {
      for (const size of sizes) {
        container.appendChild(createInlineMsg({ variant, size, text: `${variant} / ${size}` }))
      }
    }
    return container
  },
}

export const Info: Story = { args: { variant: "info" } }
export const Danger: Story = { args: { variant: "danger", text: "Error message." } }
export const Small: Story = { args: { size: "sm", text: "Small message." } }
export const Success: Story = { args: { variant: "success", text: "Success message." } }
export const Warning: Story = { args: { variant: "warning", text: "Warning message." } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
