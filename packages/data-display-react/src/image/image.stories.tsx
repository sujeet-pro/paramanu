import type { Meta, StoryObj } from "@storybook/react"
import { Image } from "./image.js"

const meta = {
  title: "Data Display/Image",
  component: Image,
  tags: ["autodocs"],
  argTypes: {
    fit: { control: "select", options: ["cover", "contain", "fill", "none", "scale-down"] },
    radius: { control: "select", options: ["none", "sm", "md", "lg", "xl", "full"] },
    fallback: { control: "boolean" },
    loading: { control: "boolean" },
  },
  args: { fit: "cover", radius: "none" },
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { src: "https://picsum.photos/400/300", alt: "Sample image" },
}

export const WithCaption: Story = {
  args: { src: "https://picsum.photos/400/300", alt: "Landscape", caption: "A beautiful landscape" },
}

export const Rounded: Story = {
  args: { src: "https://picsum.photos/400/300", alt: "Rounded", radius: "lg" },
}

export const Circle: Story = {
  args: { src: "https://picsum.photos/200/200", alt: "Circle", radius: "full" },
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
