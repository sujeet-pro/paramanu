import type { Meta, StoryObj } from "@storybook/html"
import { inlineMessageClasses } from "./inline-message.classes.js"
import type { InlineMessageClassesOptions, InlineMessageVariant, InlineMessageSize } from "./inline-message.types.js"

interface InlineMessageArgs extends InlineMessageClassesOptions {
  text: string
}

function createInlineMessage(args: InlineMessageArgs): HTMLDivElement {
  const classes = inlineMessageClasses({ variant: args.variant, size: args.size })
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
  tags: ["autodocs"],
  render: (args) => createInlineMessage(args as InlineMessageArgs),
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
} satisfies Meta<InlineMessageArgs>

export default meta
type Story = StoryObj<InlineMessageArgs>

export const Playground: Story = {}

export const AllVariantsAndSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "8px"

    const variants: InlineMessageVariant[] = ["info", "success", "warning", "danger"]
    const sizes: InlineMessageSize[] = ["sm", "md"]

    for (const variant of variants) {
      for (const size of sizes) {
        container.appendChild(createInlineMessage({ variant, size, text: `${variant} / ${size}` }))
      }
    }
    return container
  },
}

export const Info: Story = { args: { variant: "info" } }
export const Danger: Story = { args: { variant: "danger", text: "Error message." } }
export const Small: Story = { args: { size: "sm", text: "Small message." } }
