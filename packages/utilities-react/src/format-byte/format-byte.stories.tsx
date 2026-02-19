import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { FormatByte } from "./format-byte.js"

const meta = {
  title: "Utilities/FormatByte",
  component: FormatByte,
  tags: ["autodocs", "beta"],
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

export const SmallFile: Story = {
  args: { value: 500 },
}

export const ZeroBytes: Story = {
  args: { value: 0 },
}

export const TerabyteFile: Story = {
  args: { value: 1500000000000 },
}

export const CustomDecimals: Story = {
  args: { value: 1536, decimals: 3 },
}

export const RenderTest: Story = {
  args: { value: 1024 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const text = canvasElement.textContent
    await expect(text).toBeTruthy()
  },
}
