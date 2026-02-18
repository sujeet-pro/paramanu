import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Transfer } from "./transfer.js"

const meta = {
  title: "Forms/Transfer",
  component: Transfer,
  tags: ["autodocs", "stable"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
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

export const Small: Story = {
  args: { size: "sm", children: "Small transfer" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large transfer" },
}

export const ExtraSmall: Story = {
  args: { size: "xs", children: "Extra small transfer" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled transfer" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("group")
    await expect(el).toHaveAttribute("aria-disabled", "true")
  },
}

export const TransferInteraction: Story = {
  args: { children: "Transfer items" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole("group")
    await expect(group).toBeTruthy()
  },
}

export const KeyboardNavigation: Story = {
  args: { children: "Transfer content" },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-transfer")
    await expect(el).toBeTruthy()
    await userEvent.tab()
  },
}

export const Accessibility: Story = {
  args: { children: "Transfer content" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole("group")
    await expect(group).toHaveAttribute("aria-label", "Transfer")
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
