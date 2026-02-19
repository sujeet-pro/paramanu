import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Clipboard } from "./clipboard.js"

const meta = {
  title: "Data Display/Clipboard",
  component: Clipboard,
  tags: ["autodocs", "beta"],
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

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const CopyInteraction: Story = {
  args: { value: "Copy this text" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const copyBtn = canvas.getByRole("button")
    await userEvent.click(copyBtn)
  },
}

export const RenderTest: Story = {
  args: { value: "test" },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-clipboard")
    await expect(el).toBeTruthy()
  },
}
