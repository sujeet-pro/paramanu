import type { Meta, StoryObj } from "@storybook/react"
import { FormatNumber } from "./format-number.js"

const meta = {
  title: "Utilities/FormatNumber",
  component: FormatNumber,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number" },
    locale: { control: "text" },
    style: {
      control: "select",
      options: ["decimal", "currency", "percent"],
    },
    currency: { control: "text" },
    notation: {
      control: "select",
      options: ["standard", "compact", "scientific"],
    },
  },
  args: {
    value: 1234567.89,
    locale: "en-US",
  },
} satisfies Meta<typeof FormatNumber>

export default meta
type Story = StoryObj<typeof FormatNumber>

export const Playground: Story = {}

export const Currency: Story = {
  args: { value: 1234.56, style: "currency", currency: "EUR", locale: "de-DE" },
}

export const Percent: Story = {
  args: { value: 0.856, style: "percent" },
}

export const Compact: Story = {
  args: { value: 1500000, notation: "compact" },
}
