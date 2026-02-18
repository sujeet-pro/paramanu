import type { Meta, StoryObj } from "@storybook/html"
import { alertClasses } from "./alert.classes.js"
import type { AlertClassesOptions, AlertVariant, AlertStyle } from "./alert.types.js"

interface AlertArgs extends AlertClassesOptions {
  title: string
  description: string
}

function createAlert(args: AlertArgs): HTMLDivElement {
  const classes = alertClasses({
    variant: args.variant,
    alertStyle: args.alertStyle,
    dismissible: args.dismissible,
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

  if (args.description) {
    const desc = document.createElement("div")
    desc.className = classes.description
    desc.textContent = args.description
    content.appendChild(desc)
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
  title: "Feedback/Alert",
  tags: ["autodocs"],
  render: (args) => createAlert(args as AlertArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
    alertStyle: {
      control: "select",
      options: ["subtle", "solid", "outline"],
    },
    dismissible: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    variant: "info",
    alertStyle: "subtle",
    title: "Alert title",
    description: "This is a description of the alert message.",
  },
} satisfies Meta<AlertArgs>

export default meta
type Story = StoryObj<AlertArgs>

export const Playground: Story = {}

export const Info: Story = {
  args: { variant: "info", title: "Information" },
}

export const Success: Story = {
  args: { variant: "success", title: "Success" },
}

export const Warning: Story = {
  args: { variant: "warning", title: "Warning" },
}

export const Danger: Story = {
  args: { variant: "danger", title: "Error" },
}

export const Solid: Story = {
  args: { alertStyle: "solid", title: "Solid Alert" },
}

export const Outline: Story = {
  args: { alertStyle: "outline", title: "Outline Alert" },
}

export const AllVariantsAndStyles: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "12px"

    const variants: AlertVariant[] = ["info", "success", "warning", "danger"]
    const styles: AlertStyle[] = ["subtle", "solid", "outline"]

    for (const variant of variants) {
      for (const alertStyle of styles) {
        container.appendChild(
          createAlert({
            variant,
            alertStyle,
            title: `${variant} / ${alertStyle}`,
            description: "Alert description text.",
          }),
        )
      }
    }
    return container
  },
}

export const Dismissible: Story = {
  args: { dismissible: true, title: "Dismissible Alert" },
}
