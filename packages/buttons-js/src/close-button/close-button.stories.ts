import type { Meta, StoryObj } from "@storybook/html-vite"
import { closeBtnClasses } from "./close-button.classes.js"
import type { CloseBtnClassesOptions, CloseBtnSize } from "./close-button.types.js"

interface CloseBtnArgs extends CloseBtnClassesOptions {
  ariaLabel: string
}

function createCloseBtn(args: CloseBtnArgs): HTMLButtonElement {
  const button = document.createElement("button")
  button.className = closeBtnClasses({
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
  title: "Btns/Close Btn",
  tags: ["autodocs", "beta"],
  render: (args) => createCloseBtn(args as CloseBtnArgs),
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
} satisfies Meta<CloseBtnArgs>

export default meta
type Story = StoryObj<CloseBtnArgs>

export const Playground: Story = {}

export const AllSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.gap = "8px"
    container.style.alignItems = "center"

    const sizes: CloseBtnSize[] = ["xs", "sm", "md", "lg"]
    for (const size of sizes) {
      container.appendChild(createCloseBtn({ size, ariaLabel: `Close ${size}` }))
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

    container.appendChild(createCloseBtn({ ariaLabel: "Default" }))
    container.appendChild(createCloseBtn({ disabled: true, ariaLabel: "Disabled" }))
    return container
  },
}

export const ExtraSmall: Story = {
  args: { size: "xs", ariaLabel: "Close extra small" },
}

export const Small: Story = {
  args: { size: "sm", ariaLabel: "Close small" },
}

export const Medium: Story = {
  args: { size: "md", ariaLabel: "Close medium" },
}

export const Large: Story = {
  args: { size: "lg", ariaLabel: "Close large" },
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
