import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import {
  Empty,
  EmptyIcon,
  EmptyHeading,
  EmptyDescription,
  EmptyActions,
} from "./empty-state.js"

const meta = {
  title: "Data Display/Empty State",
  component: Empty,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    bordered: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyIcon>
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
      </EmptyIcon>
      <EmptyHeading>No items found</EmptyHeading>
      <EmptyDescription>Get started by creating your first item.</EmptyDescription>
      <EmptyActions>
        <button type="button">Create Item</button>
      </EmptyActions>
    </Empty>
  ),
}

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <Empty {...args}>
      <EmptyHeading>No results</EmptyHeading>
      <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
    </Empty>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Empty {...args}>
      <EmptyHeading>Empty</EmptyHeading>
      <EmptyDescription>Nothing here yet.</EmptyDescription>
    </Empty>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Empty {...args}>
      <EmptyHeading>No data available</EmptyHeading>
      <EmptyDescription>Check back later for updates.</EmptyDescription>
    </Empty>
  ),
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <Empty {...args}>
      <EmptyHeading>Empty</EmptyHeading>
    </Empty>
  ),
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <Empty {...args}>
      <EmptyHeading>Empty</EmptyHeading>
    </Empty>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <Empty>
      <EmptyHeading>Test</EmptyHeading>
    </Empty>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-empty")
    await expect(el).toBeTruthy()
  },
}
