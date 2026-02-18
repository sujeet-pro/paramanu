import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Link } from "./link.js"

const meta = {
  title: "Navigation/Link",
  component: Link,
  tags: ["autodocs"],
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
  },
  args: {
    variant: "default",
    underline: "auto",
    active: false,
    disabled: false,
    external: false,
    children: "Link Text",
    href: "#",
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Default: Story = {
  args: { variant: "default", children: "Default Link", href: "#" },
}

export const Subtle: Story = {
  args: { variant: "subtle", children: "Subtle Link", href: "#" },
}

export const Nav: Story = {
  args: { variant: "nav", children: "Nav Link", href: "#" },
}

export const Active: Story = {
  args: { active: true, children: "Active Link", href: "#" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled Link", href: "#" },
}

export const External: Story = {
  args: { external: true, children: "External Link", href: "https://example.com" },
}

export const UnderlineAlways: Story = {
  args: { underline: "always", children: "Always Underlined", href: "#" },
}

export const UnderlineNever: Story = {
  args: { underline: "never", children: "Never Underlined", href: "#" },
}

export const ExternalAccessibility: Story = {
  args: { external: true, children: "External", href: "https://example.com" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole("link", { name: "External" })
    await expect(link).toHaveAttribute("target", "_blank")
    await expect(link).toHaveAttribute("rel", "noopener noreferrer")
  },
}

export const DisabledAccessibility: Story = {
  args: { disabled: true, children: "Cannot Click", href: "#" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole("link", { name: "Cannot Click" })
    await expect(link).toHaveAttribute("aria-disabled", "true")
    await expect(link).toHaveAttribute("tabindex", "-1")
  },
}
