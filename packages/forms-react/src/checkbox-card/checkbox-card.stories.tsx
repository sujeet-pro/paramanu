import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { CheckboxCard } from "./checkbox-card.js"

const meta = {
  title: "Forms/Checkbox Card",
  tags: ["autodocs"],
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

export const Small: Story = {
  args: { size: "sm", children: "Small card" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large card" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled card" },
}

export const ClickToToggle: Story = {
  args: { children: "Click me" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox")
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
  },
}
