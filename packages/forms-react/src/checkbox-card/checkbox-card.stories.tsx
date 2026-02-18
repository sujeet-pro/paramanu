import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { CheckboxCard } from "./checkbox-card.js"

const meta = {
  title: "Forms/Checkbox Card",
  tags: ["autodocs", "stable"],
  component: CheckboxCard,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
  args: {
    children: "Option A",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof CheckboxCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Checked: Story = {
  args: { checked: true, children: "Checked card" },
}

export const ExtraSmall: Story = {
  args: { size: "xs", children: "Extra small card" },
}

export const Small: Story = {
  args: { size: "sm", children: "Small card" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large card" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled card" },
}

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, children: "Disabled checked card" },
}

export const ToggleInteraction: Story = {
  args: { children: "Click me", onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox")
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
  },
}

export const KeyboardInteraction: Story = {
  args: { children: "Tab to me", onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox")
    await userEvent.tab()
    await expect(checkbox).toHaveFocus()
  },
}

export const Accessibility: Story = {
  args: { "aria-label": "Select option A", children: "Option A" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("checkbox", { name: "Select option A" })
    await expect(el).toBeInTheDocument()
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
