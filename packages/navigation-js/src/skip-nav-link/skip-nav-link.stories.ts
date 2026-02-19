import type { Meta, StoryObj } from "@storybook/html-vite"
import { skipLinkClasses } from "./skip-nav-link.classes.js"

interface SkipLinkArgs {
  href: string
  label: string
}

function createSkipLink(args: SkipLinkArgs): HTMLElement {
  const wrapper = document.createElement("div")

  const link = document.createElement("a")
  link.className = skipLinkClasses()
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
  tags: ["autodocs", "beta"],
  render: (args) => createSkipLink(args as SkipLinkArgs),
  argTypes: {
    href: { control: "text" },
    label: { control: "text" },
  },
  args: {
    href: "#main-content",
    label: "Skip to main content",
  },
} satisfies Meta<SkipLinkArgs>

export default meta
type Story = StoryObj<SkipLinkArgs>

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
