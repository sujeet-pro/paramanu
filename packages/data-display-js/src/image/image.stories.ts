import type { Meta, StoryObj } from "@storybook/html-vite"
import { imgClasses } from "./image.classes.js"
import type { ImgClassesOptions } from "./image.types.js"

interface ImgArgs extends ImgClassesOptions {
  src: string
  alt: string
  captionText: string
}

function createImg(args: ImgArgs): HTMLElement {
  const cls = imgClasses({ fit: args.fit, radius: args.radius, fallback: args.fallback, loading: args.loading })
  const figure = document.createElement("figure")
  figure.className = cls.root

  if (args.fallback || args.loading) {
    const fb = document.createElement("div")
    fb.className = cls.fallback
    figure.appendChild(fb)
  } else {
    const img = document.createElement("img")
    img.className = cls.img
    img.src = args.src
    img.alt = args.alt
    figure.appendChild(img)
  }

  if (args.captionText) {
    const cap = document.createElement("figcaption")
    cap.className = cls.caption
    cap.textContent = args.captionText
    figure.appendChild(cap)
  }

  return figure
}

const meta = {
  title: "Data Display/Img",
  tags: ["autodocs", "beta"],
  render: (args) => createImg(args as ImgArgs),
  argTypes: {
    fit: { control: "select", options: ["cover", "contain", "fill", "none", "scale-down"] },
    radius: { control: "select", options: ["none", "sm", "md", "lg", "xl", "full"] },
    fallback: { control: "boolean" },
    loading: { control: "boolean" },
    src: { control: "text" },
    alt: { control: "text" },
    captionText: { control: "text" },
  },
  args: { fit: "cover", radius: "none", src: "https://picsum.photos/400/300", alt: "Sample", captionText: "" },
} satisfies Meta<ImgArgs>

export default meta
type Story = StoryObj<ImgArgs>

export const Playground: Story = {}
export const Rounded: Story = { args: { radius: "lg" } }
export const Circle: Story = { args: { radius: "full" } }
export const SmallRadius: Story = { args: { radius: "sm" } }
export const Contain: Story = { args: { fit: "contain" } }
export const Fill: Story = { args: { fit: "fill" } }
export const Fallback: Story = { args: { fallback: true, src: "" } }
export const Loading: Story = { args: { loading: true, src: "" } }
export const WithCaption: Story = { args: { captionText: "A sample image" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
