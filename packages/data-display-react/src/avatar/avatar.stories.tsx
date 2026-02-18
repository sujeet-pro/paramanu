import type { Meta, StoryObj } from "@storybook/react"
import { Avatar } from "./avatar.js"

const meta = {
  title: "Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    variant: { control: "select", options: ["circle", "square"] },
    color: { control: "select", options: ["primary", "neutral", "danger", "success"] },
    src: { control: "text" },
    alt: { control: "text" },
    name: { control: "text" },
  },
  args: { size: "md", variant: "circle", color: "primary" },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { name: "John Doe" } }
export const WithImage: Story = { args: { src: "https://i.pravatar.cc/150?u=a", alt: "User" } }
export const WithInitials: Story = { args: { name: "Jane Smith" } }
export const Square: Story = { args: { variant: "square", name: "Alice" } }
export const ExtraSmall: Story = { args: { size: "xs", name: "A" } }
export const ExtraLarge: Story = { args: { size: "2xl", name: "Bob Ross" } }
export const DangerColor: Story = { args: { color: "danger", name: "Error" } }
export const SuccessColor: Story = { args: { color: "success", name: "OK" } }
