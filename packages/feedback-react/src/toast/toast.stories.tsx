import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, userEvent, within } from "@storybook/test"
import { Toast, ToastContainer } from "./toast.js"

const meta = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
    dismissible: { control: "boolean" },
    entering: { control: "boolean" },
    exiting: { control: "boolean" },
  },
  args: {
    title: "Toast Title",
    message: "This is a toast message.",
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Info: Story = {
  args: { variant: "info", title: "Info", message: "Informational toast." },
}

export const Success: Story = {
  args: { variant: "success", title: "Success", message: "Action completed." },
}

export const Warning: Story = {
  args: { variant: "warning", title: "Warning", message: "Please review." },
}

export const Danger: Story = {
  args: { variant: "danger", title: "Error", message: "Something went wrong." },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["info", "success", "warning", "danger"] as const).map((variant) => (
        <Toast key={variant} variant={variant} title={variant} message={`${variant} toast message.`} />
      ))}
    </div>
  ),
}

export const Dismissible: Story = {
  args: { dismissible: true, onClose: fn(), title: "Dismissible" },
}

export const Entering: Story = {
  args: { entering: true, title: "Entering" },
}

export const Exiting: Story = {
  args: { exiting: true, title: "Exiting" },
}

export const WithIcon: Story = {
  args: {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    variant: "success",
    title: "Saved",
    message: "Your changes have been saved.",
  },
}

export const TitleOnly: Story = {
  args: { title: "Quick notification", message: undefined },
}

export const InContainer: Story = {
  render: () => (
    <div style={{ position: "relative", height: 300 }}>
      <ToastContainer placement="top-right" style={{ position: "absolute" }}>
        <Toast variant="success" title="Saved" message="Document saved." />
        <Toast variant="info" title="Update" message="New version available." />
      </ToastContainer>
    </div>
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
      <Toast variant="info" title="Status role" />
      <Toast variant="danger" title="Alert role" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("status")).toBeInTheDocument()
    await expect(canvas.getByRole("alert")).toBeInTheDocument()
  },
}
