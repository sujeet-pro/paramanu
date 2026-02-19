import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { Form } from "./form.js"

const meta = {
  title: "Forms/Form",
  component: Form,
  tags: ["autodocs", "beta"],
  argTypes: {
    layout: { control: "select", options: ["vertical", "horizontal", "inline"] },
    gap: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    layout: "vertical",
    gap: "md",
    onSubmit: fn(),
  },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

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

export const Horizontal: Story = {
  args: { layout: "horizontal", children: "Horizontal form" },
}

export const Inline: Story = {
  args: { layout: "inline", children: "Inline form" },
}

export const SmallGap: Story = {
  args: { gap: "sm", children: "Small gap form" },
}

export const LargeGap: Story = {
  args: { gap: "lg", children: "Large gap form" },
}

export const VerticalForm: Story = {
  args: { layout: "vertical", children: "Vertical form content" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const form = canvas.getByText("Vertical form content").closest("form")
    await expect(form).toHaveClass("pm-form--vertical")
  },
}

export const Accessibility: Story = {
  args: { "aria-label": "Registration form", children: "Form fields here" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("form", { name: "Registration form" })
    await expect(el).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { children: "Form content" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { children: "Form content" },
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  args: { children: "Form content" },
  parameters: { pseudo: { active: true } },
}
