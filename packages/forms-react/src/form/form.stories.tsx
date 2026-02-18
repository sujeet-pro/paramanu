import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Form } from "./form.js"

const meta = {
  title: "Forms/Form",
  component: Form,
  tags: ["autodocs"],
  argTypes: {
    layout: { control: "select", options: ["vertical", "horizontal", "inline"] },
    gap: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { layout: "vertical", gap: "md" },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof Form>

export const Playground: Story = {
  args: { children: "Form content" },
}

export const Layouts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Form layout="vertical">Vertical layout</Form>
      <Form layout="horizontal">Horizontal layout</Form>
      <Form layout="inline">Inline layout</Form>
    </div>
  ),
}

export const Gaps: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Form gap="sm">Small gap</Form>
      <Form gap="md">Medium gap</Form>
      <Form gap="lg">Large gap</Form>
    </div>
  ),
}

export const VerticalForm: Story = {
  args: { layout: "vertical", children: "Vertical form content" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const form = canvas.getByText("Vertical form content").closest("form")
    await expect(form).toHaveClass("pm-form--vertical")
  },
}
