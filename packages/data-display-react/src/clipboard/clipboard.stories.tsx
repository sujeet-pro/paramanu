import type { Meta, StoryObj } from "@storybook/react"
import { Clipboard } from "./clipboard.js"

const meta = {
  title: "Data Display/Clipboard",
  component: Clipboard,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: "text" },
    timeout: { control: "number" },
  },
  args: { size: "md", value: "npm install @paramanu/data-display-react" },
} satisfies Meta<typeof Clipboard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Small: Story = {
  args: { size: "sm", value: "small text" },
}

export const Large: Story = {
  args: { size: "lg", value: "large text to copy" },
}

export const CustomTimeout: Story = {
  args: { value: "copied for 5 seconds", timeout: 5000 },
}
