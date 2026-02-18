import type { Meta, StoryObj } from "@storybook/html-vite"
import { toastClasses } from "./toast.classes.js"
import type { ToastClassesOptions, ToastVariant } from "./toast.types.js"

interface ToastArgs extends ToastClassesOptions {
  title: string
  message: string
}

function createToast(args: ToastArgs): HTMLDivElement {
  const classes = toastClasses({
    variant: args.variant,
    dismissible: args.dismissible,
    entering: args.entering,
    exiting: args.exiting,
  })
  const variant = args.variant ?? "info"
  const role = variant === "warning" || variant === "danger" ? "alert" : "status"

  const el = document.createElement("div")
  el.className = classes.root
  el.setAttribute("role", role)

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

  el.appendChild(content)

  if (args.dismissible) {
    const close = document.createElement("button")
    close.className = classes.close
    close.type = "button"
    close.setAttribute("aria-label", "Close")
    close.textContent = "\u00d7"
    close.addEventListener("click", () => el.remove())
    el.appendChild(close)
  }

  return el
}

const meta = {
  title: "Feedback/Toast",
  tags: ["autodocs", "stable"],
  render: (args) => createToast(args as ToastArgs),
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "danger"] },
    dismissible: { control: "boolean" },
    entering: { control: "boolean" },
    exiting: { control: "boolean" },
    title: { control: "text" },
    message: { control: "text" },
  },
  args: {
    variant: "info",
    title: "Toast Title",
    message: "This is a toast message.",
  },
} satisfies Meta<ToastArgs>

export default meta
type Story = StoryObj<ToastArgs>

export const Playground: Story = {}

export const Info: Story = { args: { variant: "info", title: "Info" } }
export const Success: Story = { args: { variant: "success", title: "Success" } }
export const Warning: Story = { args: { variant: "warning", title: "Warning" } }
export const Danger: Story = { args: { variant: "danger", title: "Error" } }

export const AllVariants: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "8px"
    const variants: ToastVariant[] = ["info", "success", "warning", "danger"]
    for (const variant of variants) {
      container.appendChild(createToast({ variant, title: variant, message: `${variant} toast.` }))
    }
    return container
  },
}

export const Dismissible: Story = { args: { dismissible: true, title: "Dismissible" } }

export const Entering: Story = { args: { entering: true, title: "Entering" } }
export const Exiting: Story = { args: { exiting: true, title: "Exiting" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
