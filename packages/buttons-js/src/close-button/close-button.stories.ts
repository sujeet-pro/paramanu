import type { Meta, StoryObj } from "@storybook/html"
import { closeButtonClasses } from "./close-button.classes.js"
import type { CloseButtonClassesOptions, CloseButtonSize } from "./close-button.types.js"

interface CloseButtonArgs extends CloseButtonClassesOptions {
  ariaLabel: string
}

function createCloseButton(args: CloseButtonArgs): HTMLButtonElement {
  const button = document.createElement("button")
  button.className = closeButtonClasses({
    size: args.size,
    disabled: args.disabled,
  })
  button.type = "button"
  button.setAttribute("aria-label", args.ariaLabel ?? "Close")
  button.innerHTML = `<svg aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
  if (args.disabled) {
    button.disabled = true
    button.setAttribute("aria-disabled", "true")
  }
  return button
}

const meta = {
  title: "Buttons/Close Button",
  tags: ["autodocs"],
  render: (args) => createCloseButton(args as CloseButtonArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    ariaLabel: { control: "text" },
  },
  args: {
    size: "md",
    ariaLabel: "Close",
  },
} satisfies Meta<CloseButtonArgs>

export default meta
type Story = StoryObj<CloseButtonArgs>

export const Playground: Story = {}

export const AllSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.gap = "8px"
    container.style.alignItems = "center"

    const sizes: CloseButtonSize[] = ["xs", "sm", "md", "lg"]
    for (const size of sizes) {
      container.appendChild(createCloseButton({ size, ariaLabel: `Close ${size}` }))
    }
    return container
  },
}

export const Disabled: Story = {
  args: { disabled: true, ariaLabel: "Disabled close" },
}

export const States: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.gap = "8px"

    container.appendChild(createCloseButton({ ariaLabel: "Default" }))
    container.appendChild(createCloseButton({ disabled: true, ariaLabel: "Disabled" }))
    return container
  },
}
