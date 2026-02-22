import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Img } from "./image.js"

const meta = {
  title: "Data Display/Img",
  component: Img,
  tags: ["autodocs", "beta"],
  argTypes: {
    fit: { control: "select", options: ["cover", "contain", "fill", "none", "scale-down"] },
    radius: { control: "select", options: ["none", "sm", "md", "lg", "xl", "full"] },
    fallback: { control: "boolean" },
    loading: { control: "boolean" },
  },
  args: { fit: "cover", radius: "none" },
} satisfies Meta<typeof Img>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { src: "https://picsum.photos/400/300", alt: "Sample image" },
}

export const WithCaption: Story = {
  args: {
    src: "https://picsum.photos/400/300",
    alt: "Landscape",
    caption: "A beautiful landscape",
  },
}

export const Rounded: Story = {
  args: { src: "https://picsum.photos/400/300", alt: "Rounded", radius: "lg" },
}

export const Circle: Story = {
  args: { src: "https://picsum.photos/200/200", alt: "Circle", radius: "full" },
}

export const SmallRadius: Story = {
  args: { src: "https://picsum.photos/400/300", alt: "Small radius", radius: "sm" },
}

export const Fallback: Story = {
  args: { fallback: true, alt: "No image available" },
}

export const Loading: Story = {
  args: { loading: true, alt: "Loading" },
}

export const Contain: Story = {
  args: { src: "https://picsum.photos/400/300", alt: "Contain", fit: "contain" },
}

export const Fill: Story = {
  args: { src: "https://picsum.photos/400/300", alt: "Fill", fit: "fill" },
}

export const Hover: Story = {
  args: { src: "https://picsum.photos/400/300", alt: "Hover" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { src: "https://picsum.photos/400/300", alt: "Focus" },
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  args: { src: "https://picsum.photos/400/300", alt: "Test image" },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-img")
    await expect(el).toBeTruthy()
  },
}

export const Accessibility: Story = {
  args: { src: "https://picsum.photos/400/300", alt: "Accessible image" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAttribute("alt")
  },
}
