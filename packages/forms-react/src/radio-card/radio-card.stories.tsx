import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { RadioCard } from "./radio-card.js"

const meta = {
  title: "Forms/Radio Card",
  tags: ["autodocs", "beta"],
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
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
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

export const ExtraSmall: Story = {
  args: { size: "xs", children: "Extra small card" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled card" },
}

export const CardGroup: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <RadioCard name="plan" value="basic">
        Basic
      </RadioCard>
      <RadioCard name="plan" value="pro">
        Pro
      </RadioCard>
      <RadioCard name="plan" value="enterprise">
        Enterprise
      </RadioCard>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radios = canvas.getAllByRole("radio")
    await userEvent.click(radios[1])
    await expect(radios[1]).toBeChecked()
  },
}

export const SelectCard: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <RadioCard name="select-card" value="a">
        Card A
      </RadioCard>
      <RadioCard name="select-card" value="b">
        Card B
      </RadioCard>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radios = canvas.getAllByRole("radio")
    await userEvent.click(radios[0])
    await expect(radios[0]).toBeChecked()
  },
}

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-radio-card")
    await expect(el).toBeTruthy()
    await userEvent.tab()
  },
}

export const Accessibility: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole("radio")
    await expect(radio).toBeTruthy()
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
