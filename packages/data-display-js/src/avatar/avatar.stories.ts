import type { Meta, StoryObj } from "@storybook/html-vite"
import { avatarClasses } from "./avatar.classes.js"
import type { AvatarClassesOptions } from "./avatar.types.js"

interface AvatarArgs extends AvatarClassesOptions {
  name: string
  src: string
}

function createAvatar(args: AvatarArgs): HTMLSpanElement {
  const cls = avatarClasses({ size: args.size, variant: args.variant, color: args.color })
  const root = document.createElement("span")
  root.className = cls.root
  root.setAttribute("role", "img")
  if (args.name) root.setAttribute("aria-label", args.name)

  if (args.src) {
    const img = document.createElement("img")
    img.className = cls.image
    img.src = args.src
    img.alt = args.name || ""
    root.appendChild(img)
  } else {
    const fallback = document.createElement("span")
    fallback.className = cls.fallback
    const parts = (args.name || "").trim().split(/\s+/)
    fallback.textContent =
      parts.length > 1
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : (parts[0]?.[0] || "?").toUpperCase()
    root.appendChild(fallback)
  }

  return root
}

const meta = {
  title: "Data Display/Avatar",
  tags: ["autodocs", "beta"],
  render: (args) => createAvatar(args as AvatarArgs),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    variant: { control: "select", options: ["circle", "square"] },
    color: { control: "select", options: ["primary", "neutral", "danger", "success"] },
    name: { control: "text" },
    src: { control: "text" },
  },
  args: { size: "md", variant: "circle", color: "primary", name: "John Doe", src: "" },
} satisfies Meta<AvatarArgs>

export default meta
type Story = StoryObj<AvatarArgs>

export const Playground: Story = {}
export const WithInitials: Story = { args: { name: "Jane Smith" } }
export const Square: Story = { args: { variant: "square", name: "Alice" } }
export const Small: Story = { args: { size: "sm", name: "S" } }
export const ExtraSmall: Story = { args: { size: "xs", name: "X" } }
export const Large: Story = { args: { size: "lg", name: "L" } }
export const ExtraLarge: Story = { args: { size: "xl", name: "XL" } }
export const TwoExtraLarge: Story = { args: { size: "2xl", name: "Bob Ross" } }
export const Neutral: Story = { args: { color: "neutral", name: "N" } }
export const Danger: Story = { args: { color: "danger", name: "D" } }
export const Success: Story = { args: { color: "success", name: "S" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
