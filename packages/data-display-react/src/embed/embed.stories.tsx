import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Embed } from "./embed.js"

const meta = {
  title: "Data Display/Embed",
  component: Embed,
  tags: ["autodocs", "beta"],
  argTypes: {
    ratio: { control: "select", options: ["1/1", "4/3", "16/9", "21/9"] },
    fullWidth: { control: "boolean" },
  },
  args: { ratio: "16/9" },
} satisfies Meta<typeof Embed>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { src: "https://www.example.com", title: "Example embed" },
}

export const Square: Story = {
  args: { ratio: "1/1", src: "https://www.example.com", title: "Square embed" },
}

export const FourThirds: Story = {
  args: { ratio: "4/3", src: "https://www.example.com", title: "4:3 embed" },
}

export const UltraWide: Story = {
  args: { ratio: "21/9", src: "https://www.example.com", title: "Ultra-wide embed" },
}

export const FullWidth: Story = {
  args: { fullWidth: true, src: "https://www.example.com", title: "Full width embed" },
}

export const Hover: Story = {
  args: { src: "https://www.example.com", title: "Hover embed" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { src: "https://www.example.com", title: "Focus embed" },
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  args: { src: "https://www.example.com", title: "Test embed" },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-embed")
    await expect(el).toBeTruthy()
  },
}
