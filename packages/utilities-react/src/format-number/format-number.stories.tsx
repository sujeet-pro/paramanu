import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { FormatNumber } from "./format-number.js"

const meta = {
  title: "Utilities/FormatNumber",
  component: FormatNumber,
  tags: ["autodocs", "stable"],
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

export const Scientific: Story = {
  args: { value: 123456, notation: "scientific" },
}

export const CurrencyUSD: Story = {
  args: { value: 99.99, style: "currency", currency: "USD", locale: "en-US" },
}

export const JapaneseLocale: Story = {
  args: { value: 1234567, locale: "ja-JP" },
}

export const FractionDigits: Story = {
  args: { value: 42, minimumFractionDigits: 2, maximumFractionDigits: 4 },
}

export const ZeroValue: Story = {
  args: { value: 0 },
}

export const NegativeValue: Story = {
  args: { value: -1234.56 },
}

export const RenderTest: Story = {
  args: { value: 42 },
  play: async ({ canvasElement }) => {
    const text = canvasElement.textContent
    await expect(text).toBeTruthy()
  },
}
