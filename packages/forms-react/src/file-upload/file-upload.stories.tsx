import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { FileUpload } from "./file-upload.js"

const meta = {
  title: "Forms/File Upload",
  component: FileUpload,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof FileUpload>

export const Playground: Story = {
  args: { children: "Choose file" },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <FileUpload size="xs">Choose file</FileUpload>
      <FileUpload size="sm">Choose file</FileUpload>
      <FileUpload size="md">Choose file</FileUpload>
      <FileUpload size="lg">Choose file</FileUpload>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, children: "Choose file" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByText("Choose file").closest("div")
    await expect(el).toHaveAttribute("aria-disabled", "true")
  },
}
