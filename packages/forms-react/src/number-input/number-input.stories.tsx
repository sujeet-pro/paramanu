import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { NumberInput } from "./number-input.js"

const meta = {
  title: "Forms/Number Input",
  tags: ["autodocs"],
  component: NumberInput,
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "unstyled"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
  args: {
    placeholder: "0",
  },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Outline: Story = {
  args: { variant: "outline" },
}

export const Filled: Story = {
  args: { variant: "filled" },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const WithMinMax: Story = {
  args: { min: 0, max: 100, step: 5 },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Invalid: Story = {
  args: { invalid: true },
}

export const IncrementDecrement: Story = {
  args: { min: 0, max: 10 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const increment = canvas.getByRole("button", { name: "Increment" })
    await userEvent.click(increment)
    await userEvent.click(increment)
    const decrement = canvas.getByRole("button", { name: "Decrement" })
    await userEvent.click(decrement)
  },
}
