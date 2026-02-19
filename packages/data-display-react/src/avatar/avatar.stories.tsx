import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Avatar } from "./avatar.js"

const meta = {
  title: "Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs", "beta"],
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
export const WithImg: Story = { args: { src: "https://i.pravatar.cc/150?u=a", alt: "User" } }
export const WithInitials: Story = { args: { name: "Jane Smith" } }
export const Square: Story = { args: { variant: "square", name: "Alice" } }
export const ExtraSmall: Story = { args: { size: "xs", name: "A" } }
export const Small: Story = { args: { size: "sm", name: "S" } }
export const Large: Story = { args: { size: "lg", name: "L" } }
export const ExtraLarge: Story = { args: { size: "2xl", name: "Bob Ross" } }
export const DangerColor: Story = { args: { color: "danger", name: "Error" } }
export const SuccessColor: Story = { args: { color: "success", name: "OK" } }
export const NeutralColor: Story = { args: { color: "neutral", name: "N" } }

export const Hover: Story = {
  args: { name: "Hover" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { name: "Focus" },
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  args: { name: "Test User" },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-avatar")
    await expect(el).toBeTruthy()
  },
}

export const Accessibility: Story = {
  args: { src: "https://i.pravatar.cc/150?u=a11y", alt: "Accessible avatar", name: "Test" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAttribute("alt")
  },
}
