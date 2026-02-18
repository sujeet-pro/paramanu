import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Transfer } from "./transfer.js"

const meta = {
  title: "Forms/Transfer",
  component: Transfer,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<typeof Transfer>

export default meta
type Story = StoryObj<typeof Transfer>

export const Playground: Story = {
  args: { children: "Transfer content" },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Transfer size="xs">Extra small</Transfer>
      <Transfer size="sm">Small</Transfer>
      <Transfer size="md">Medium</Transfer>
      <Transfer size="lg">Large</Transfer>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled transfer" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("group")
    await expect(el).toHaveAttribute("aria-disabled", "true")
  },
}
