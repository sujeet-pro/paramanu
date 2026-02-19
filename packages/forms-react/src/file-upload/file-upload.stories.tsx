import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { Upload } from "./file-upload.js"

const meta = {
  title: "Forms/File Upload",
  component: Upload,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof Upload>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { children: "Choose file" },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Upload size="xs">Choose file</Upload>
      <Upload size="sm">Choose file</Upload>
      <Upload size="md">Choose file</Upload>
      <Upload size="lg">Choose file</Upload>
    </div>
  ),
}

export const Small: Story = {
  args: { size: "sm", children: "Choose file" },
}

export const Large: Story = {
  args: { size: "lg", children: "Choose file" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Choose file" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByText("Choose file").closest("div")
    await expect(el).toHaveAttribute("aria-disabled", "true")
  },
}

export const Accessibility: Story = {
  args: { "aria-label": "Upload documents", children: "Choose file" },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector("[aria-label='Upload documents']")
    await expect(el).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { children: "Choose file" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { children: "Choose file" },
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  args: { children: "Choose file" },
  parameters: { pseudo: { active: true } },
}
