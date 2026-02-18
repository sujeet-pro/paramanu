import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, userEvent, within } from "@storybook/test"
import { Alert } from "./alert.js"

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
    alertStyle: {
      control: "select",
      options: ["subtle", "solid", "outline"],
    },
    dismissible: { control: "boolean" },
  },
  args: {
    title: "Alert title",
    description: "This is a description of the alert message.",
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Info: Story = {
  args: { variant: "info", title: "Information", description: "This is an informational alert." },
}

export const Success: Story = {
  args: { variant: "success", title: "Success", description: "Action completed successfully." },
}

export const Warning: Story = {
  args: { variant: "warning", title: "Warning", description: "Please review before proceeding." },
}

export const Danger: Story = {
  args: { variant: "danger", title: "Error", description: "Something went wrong." },
}

export const Subtle: Story = {
  args: { alertStyle: "subtle", title: "Subtle Alert" },
}

export const Solid: Story = {
  args: { alertStyle: "solid", title: "Solid Alert", description: "Fully colored background." },
}

export const Outline: Story = {
  args: { alertStyle: "outline", title: "Outline Alert", description: "Transparent background with border." },
}

export const AllVariantsAndStyles: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {(["info", "success", "warning", "danger"] as const).map((variant) =>
        (["subtle", "solid", "outline"] as const).map((alertStyle) => (
          <Alert
            key={`${variant}-${alertStyle}`}
            variant={variant}
            alertStyle={alertStyle}
            title={`${variant} / ${alertStyle}`}
            description="Alert description text."
          />
        )),
      )}
    </div>
  ),
}

export const Dismissible: Story = {
  args: {
    dismissible: true,
    onClose: fn(),
    title: "Dismissible Alert",
    description: "Click the close button to dismiss.",
  },
}

export const WithIcon: Story = {
  args: {
    variant: "info",
    title: "With Icon",
    description: "This alert has a custom icon.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
}

export const TitleOnly: Story = {
  args: { title: "Title only alert", description: undefined },
}

export const DescriptionOnly: Story = {
  args: { title: undefined, description: "Description only alert without a title." },
}

export const WithChildren: Story = {
  render: () => (
    <Alert variant="info" title="Custom Content">
      <p>This alert has custom children content.</p>
    </Alert>
  ),
}

export const DismissClick: Story = {
  args: {
    dismissible: true,
    onClose: fn(),
    title: "Dismiss me",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const closeButton = canvas.getByRole("button", { name: "Close" })
    await userEvent.click(closeButton)
    await expect(args.onClose).toHaveBeenCalledTimes(1)
  },
}

export const AccessibilityRoles: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Alert variant="info" title="Info uses role=status" />
      <Alert variant="danger" title="Danger uses role=alert" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("status")).toBeInTheDocument()
    await expect(canvas.getByRole("alert")).toBeInTheDocument()
  },
}
