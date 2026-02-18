import type { Meta, StoryObj } from "@storybook/html-vite"
import { notificationClasses } from "./notification.classes.js"
import type { NotificationClassesOptions, NotificationVariant } from "./notification.types.js"

interface NotificationArgs extends NotificationClassesOptions {
  title: string
  message: string
  timestamp: string
}

function createNotification(args: NotificationArgs): HTMLDivElement {
  const classes = notificationClasses({
    variant: args.variant,
    unread: args.unread,
    dismissible: args.dismissible,
  })

  const el = document.createElement("div")
  el.className = classes.root
  el.setAttribute("role", "article")

  const content = document.createElement("div")
  content.className = classes.content
  if (args.title) {
    const title = document.createElement("div")
    title.className = classes.title
    title.textContent = args.title
    content.appendChild(title)
  }
  if (args.message) {
    const msg = document.createElement("div")
    msg.className = classes.message
    msg.textContent = args.message
    content.appendChild(msg)
  }
  if (args.timestamp) {
    const ts = document.createElement("time")
    ts.className = classes.timestamp
    ts.textContent = args.timestamp
    content.appendChild(ts)
  }
  el.appendChild(content)

  if (args.dismissible) {
    const close = document.createElement("button")
    close.className = classes.close
    close.type = "button"
    close.setAttribute("aria-label", "Dismiss notification")
    close.textContent = "\u00d7"
    el.appendChild(close)
  }

  return el
}

const meta = {
  title: "Feedback/Notification",
  tags: ["autodocs", "stable"],
  render: (args) => createNotification(args as NotificationArgs),
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "danger", "neutral"] },
    unread: { control: "boolean" },
    dismissible: { control: "boolean" },
    title: { control: "text" },
    message: { control: "text" },
    timestamp: { control: "text" },
  },
  args: {
    variant: "neutral",
    title: "New message",
    message: "You have a new message.",
    timestamp: "2 min ago",
  },
} satisfies Meta<NotificationArgs>

export default meta
type Story = StoryObj<NotificationArgs>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "8px"
    const variants: NotificationVariant[] = ["info", "success", "warning", "danger", "neutral"]
    for (const variant of variants) {
      container.appendChild(createNotification({ variant, title: variant, message: `${variant} notification.`, timestamp: "now" }))
    }
    return container
  },
}

export const Unread: Story = { args: { unread: true } }
export const Dismissible: Story = { args: { dismissible: true } }

export const Info: Story = { args: { variant: "info", title: "Info" } }
export const Success: Story = { args: { variant: "success", title: "Success" } }
export const Warning: Story = { args: { variant: "warning", title: "Warning" } }
export const Danger: Story = { args: { variant: "danger", title: "Danger" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
