import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateHeading,
  EmptyStateDescription,
  EmptyStateActions,
} from "./empty-state.js"

const meta = {
  title: "Data Display/Empty State",
  component: EmptyState,
  tags: ["autodocs", "stable"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    bordered: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyStateIcon>
        <svg
          viewBox="0 0 24 24"
          width="48"
          height="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        </svg>
      </EmptyStateIcon>
      <EmptyStateHeading>No items found</EmptyStateHeading>
      <EmptyStateDescription>Get started by creating your first item.</EmptyStateDescription>
      <EmptyStateActions>
        <button type="button">Create Item</button>
      </EmptyStateActions>
    </EmptyState>
  ),
}

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <EmptyState {...args}>
      <EmptyStateHeading>No results</EmptyStateHeading>
      <EmptyStateDescription>Try adjusting your search or filters.</EmptyStateDescription>
    </EmptyState>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <EmptyState {...args}>
      <EmptyStateHeading>Empty</EmptyStateHeading>
      <EmptyStateDescription>Nothing here yet.</EmptyStateDescription>
    </EmptyState>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <EmptyState {...args}>
      <EmptyStateHeading>No data available</EmptyStateHeading>
      <EmptyStateDescription>Check back later for updates.</EmptyStateDescription>
    </EmptyState>
  ),
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <EmptyState {...args}>
      <EmptyStateHeading>Empty</EmptyStateHeading>
    </EmptyState>
  ),
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <EmptyState {...args}>
      <EmptyStateHeading>Empty</EmptyStateHeading>
    </EmptyState>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateHeading>Test</EmptyStateHeading>
    </EmptyState>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-empty-state")
    await expect(el).toBeTruthy()
  },
}
