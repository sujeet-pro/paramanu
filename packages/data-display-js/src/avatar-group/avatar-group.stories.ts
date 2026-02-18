import type { Meta, StoryObj } from "@storybook/html-vite"
import { avatarGroupClasses } from "./avatar-group.classes.js"
import { avatarClasses } from "../avatar/avatar.classes.js"
import type { AvatarGroupClassesOptions } from "./avatar-group.types.js"

interface AvatarGroupArgs extends AvatarGroupClassesOptions {
  count: number
  max: number
}

function createAvatarGroup(args: AvatarGroupArgs): HTMLElement {
  const cls = avatarGroupClasses({ size: args.size, spacing: args.spacing })
  const avCls = avatarClasses({ size: args.size })
  const root = document.createElement("div")
  root.className = cls.root
  root.setAttribute("role", "group")
  root.setAttribute("aria-label", "Avatars")

  const names = ["Alice", "Bob", "Carol", "David", "Eve"]
  const visible = args.max && args.count > args.max ? args.max : args.count
  const overflow = args.max && args.count > args.max ? args.count - args.max : 0

  for (let i = 0; i < visible; i++) {
    const avatar = document.createElement("span")
    avatar.className = avCls.root
    avatar.setAttribute("role", "img")
    const fb = document.createElement("span")
    fb.className = avCls.fallback
    fb.textContent = names[i % names.length][0]
    avatar.appendChild(fb)
    root.appendChild(avatar)
  }

  if (overflow > 0) {
    const ov = document.createElement("span")
    ov.className = cls.overflow
    ov.textContent = `+${overflow}`
    root.appendChild(ov)
  }

  return root
}

const meta = {
  title: "Data Display/Avatar Group",
  tags: ["autodocs", "stable"],
  render: (args) => createAvatarGroup(args as AvatarGroupArgs),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    spacing: { control: "select", options: ["tight", "normal"] },
    count: { control: "number" },
    max: { control: "number" },
  },
  args: { size: "md", spacing: "normal", count: 4, max: 0 },
} satisfies Meta<AvatarGroupArgs>

export default meta
type Story = StoryObj<AvatarGroupArgs>

export const Playground: Story = {}
export const WithMax: Story = { args: { count: 5, max: 3 } }
export const Tight: Story = { args: { spacing: "tight" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const ExtraLarge: Story = { args: { size: "xl" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
