import type { Meta, StoryObj } from "@storybook/html-vite"
import { skeletonClasses } from "./skeleton.classes.js"
import type { SkeletonClassesOptions, SkeletonVariant, SkeletonSize } from "./skeleton.types.js"

interface SkeletonArgs extends SkeletonClassesOptions {
  width?: string
  height?: string
}

function createSkeleton(args: SkeletonArgs): HTMLDivElement {
  const el = document.createElement("div")
  el.className = skeletonClasses({ variant: args.variant, size: args.size })
  el.setAttribute("aria-hidden", "true")
  if (args.width) el.style.width = args.width
  if (args.height) el.style.height = args.height
  return el
}

const meta = {
  title: "Feedback/Skeleton",
  tags: ["autodocs", "beta"],
  render: (args) => createSkeleton(args as SkeletonArgs),
  argTypes: {
    variant: { control: "select", options: ["text", "circular", "rectangular"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    width: { control: "text" },
    height: { control: "text" },
  },
  args: { variant: "text" },
} satisfies Meta<SkeletonArgs>

export default meta
type Story = StoryObj<SkeletonArgs>

export const Playground: Story = {}
export const Text: Story = { args: { variant: "text", width: "60%" } }
export const Circular: Story = { args: { variant: "circular", size: "md" } }
export const Rectangular: Story = { args: { variant: "rectangular", width: "200px", height: "100px" } }

export const AllVariants: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "16px"
    container.appendChild(createSkeleton({ variant: "text", width: "60%" }))
    container.appendChild(createSkeleton({ variant: "circular", size: "md" }))
    container.appendChild(createSkeleton({ variant: "rectangular", width: "200px", height: "100px" }))
    return container
  },
}

export const TextLines: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "8px"
    container.appendChild(createSkeleton({ variant: "text", width: "100%" }))
    container.appendChild(createSkeleton({ variant: "text", width: "80%" }))
    container.appendChild(createSkeleton({ variant: "text", width: "60%" }))
    return container
  },
}

export const AllSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.gap = "16px"
    container.style.alignItems = "center"
    const sizes = ["sm", "md", "lg"] as const
    for (const size of sizes) {
      container.appendChild(createSkeleton({ variant: "circular", size }))
    }
    return container
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
