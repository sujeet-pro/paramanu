import type { Meta, StoryObj } from "@storybook/html-vite"
import { linkClasses } from "./link.classes.js"
import type { LinkClassesOptions } from "./link.types.js"

interface LinkArgs extends LinkClassesOptions {
  label: string
  href: string
}

function createLink(args: LinkArgs): HTMLElement {
  const a = document.createElement("a")
  a.className = linkClasses({
    variant: args.variant,
    active: args.active,
    disabled: args.disabled,
    external: args.external,
    underline: args.underline,
  })
  a.href = args.href
  a.textContent = args.label
  if (args.disabled) {
    a.setAttribute("aria-disabled", "true")
    a.tabIndex = -1
  }
  if (args.external) {
    a.target = "_blank"
    a.rel = "noopener noreferrer"
  }
  if (args.active) {
    a.setAttribute("aria-current", "page")
  }
  return a
}

const meta = {
  title: "Navigation/Link",
  tags: ["autodocs", "stable"],
  render: (args) => createLink(args as LinkArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "subtle", "nav"],
    },
    underline: {
      control: "select",
      options: ["auto", "always", "hover", "never"],
    },
    active: { control: "boolean" },
    disabled: { control: "boolean" },
    external: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    variant: "default",
    underline: "auto",
    label: "Link Text",
    href: "#",
  },
} satisfies Meta<LinkArgs>

export default meta
type Story = StoryObj<LinkArgs>

export const Playground: Story = {}

export const Subtle: Story = {
  args: { variant: "subtle", label: "Subtle Link" },
}

export const Nav: Story = {
  args: { variant: "nav", label: "Nav Link" },
}

export const Active: Story = {
  args: { active: true, label: "Active Link" },
}

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled Link" },
}

export const External: Story = {
  args: { external: true, label: "External Link", href: "https://example.com" },
}

export const UnderlineAlways: Story = {
  args: { underline: "always", label: "Always Underlined" },
}

export const UnderlineHover: Story = {
  args: { underline: "hover", label: "Hover Underlined" },
}

export const UnderlineNever: Story = {
  args: { underline: "never", label: "Never Underlined" },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
