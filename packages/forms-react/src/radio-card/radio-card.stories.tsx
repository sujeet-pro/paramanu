import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { RadioCard } from "./radio-card.js"

const meta = {
  title: "Forms/Radio Card",
  tags: ["autodocs"],
  component: RadioCard,
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
    name: "demo",
    value: "a",
  },
} satisfies Meta<typeof RadioCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Checked: Story = {
  args: { checked: true, children: "Selected card" },
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

export const CardGroup: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <RadioCard name="plan" value="basic">Basic</RadioCard>
      <RadioCard name="plan" value="pro">Pro</RadioCard>
      <RadioCard name="plan" value="enterprise">Enterprise</RadioCard>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radios = canvas.getAllByRole("radio")
    await userEvent.click(radios[1])
    await expect(radios[1]).toBeChecked()
  },
}
