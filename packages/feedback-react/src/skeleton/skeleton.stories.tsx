import type { Meta, StoryObj } from "@storybook/react-vite"
import { Skeleton } from "./skeleton.js"

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs", "beta"],
  argTypes: {
    variant: { control: "select", options: ["text", "circular", "rectangular"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    width: { control: "text" },
    height: { control: "text" },
  },
  args: {},
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Text: Story = {
  args: { variant: "text" },
}

export const Circular: Story = {
  args: { variant: "circular", size: "md" },
}

export const Rectangular: Story = {
  args: { variant: "rectangular", width: 200, height: 100 },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="circular" size="md" />
      <Skeleton variant="rectangular" width={200} height={100} />
    </div>
  ),
}

export const CircularSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Skeleton key={size} variant="circular" size={size} />
      ))}
    </div>
  ),
}

export const TextLines: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  ),
}

export const CardPlaceholder: Story = {
  render: () => (
    <div
      style={{ display: "flex", gap: 12, padding: 16, border: "1px solid #eee", borderRadius: 8 }}
    >
      <Skeleton variant="circular" size="lg" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="70%" />
      </div>
    </div>
  ),
}

export const CustomDimensions: Story = {
  args: { variant: "rectangular", width: 300, height: 200 },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const ActiveState: Story = {
  parameters: { pseudo: { active: true } },
}
