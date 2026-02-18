import type { Meta, StoryObj } from "@storybook/html-vite"
import { skipNavLinkClasses } from "./skip-nav-link.classes.js"

interface SkipNavLinkArgs {
  href: string
  label: string
}

function createSkipNavLink(args: SkipNavLinkArgs): HTMLElement {
  const wrapper = document.createElement("div")

  const link = document.createElement("a")
  link.className = skipNavLinkClasses()
  link.href = args.href
  link.textContent = args.label

  const main = document.createElement("main")
  main.id = "main-content"
  main.textContent = "Main content area"

  wrapper.appendChild(link)
  wrapper.appendChild(main)
  return wrapper
}

const meta = {
  title: "Navigation/Skip Nav Link",
  tags: ["autodocs", "stable"],
  render: (args) => createSkipNavLink(args as SkipNavLinkArgs),
  argTypes: {
    href: { control: "text" },
    label: { control: "text" },
  },
  args: {
    href: "#main-content",
    label: "Skip to main content",
  },
} satisfies Meta<SkipNavLinkArgs>

export default meta
type Story = StoryObj<SkipNavLinkArgs>

export const Playground: Story = {}

export const CustomTarget: Story = {
  args: { href: "#content", label: "Skip to content" },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
