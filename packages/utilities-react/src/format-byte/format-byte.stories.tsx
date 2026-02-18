import type { Meta, StoryObj } from "@storybook/react"
import { FormatByte } from "./format-byte.js"

const meta = {
  title: "Utilities/FormatByte",
  component: FormatByte,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number" },
    locale: { control: "text" },
    decimals: { control: "number" },
    unit: {
      control: "select",
      options: ["byte", "bit"],
    },
  },
  args: {
    value: 1500000,
    locale: "en-US",
  },
} satisfies Meta<typeof FormatByte>

export default meta
type Story = StoryObj<typeof FormatByte>

export const Playground: Story = {}

export const Bits: Story = {
  args: { value: 1000, unit: "bit" },
}

export const LargeFile: Story = {
  args: { value: 1500000000 },
}

export const GermanLocale: Story = {
  args: { value: 1500, locale: "de-DE" },
}
