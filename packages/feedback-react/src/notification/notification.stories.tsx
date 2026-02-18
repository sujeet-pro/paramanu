import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, userEvent, within } from "@storybook/test"
import { Notification } from "./notification.js"

const meta = {
  title: "Feedback/Notification",
  component: Notification,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger", "neutral"],
    },
    unread: { control: "boolean" },
    dismissible: { control: "boolean" },
  },
  args: {
    title: "New message",
    message: "You have received a new message from John.",
    timestamp: "2 min ago",
  },
} satisfies Meta<typeof Notification>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Info: Story = { args: { variant: "info", title: "Info notification" } }
export const Success: Story = { args: { variant: "success", title: "Success notification" } }
export const Warning: Story = { args: { variant: "warning", title: "Warning notification" } }
export const Danger: Story = { args: { variant: "danger", title: "Danger notification" } }
export const Neutral: Story = { args: { variant: "neutral", title: "Neutral notification" } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["info", "success", "warning", "danger", "neutral"] as const).map((variant) => (
        <Notification key={variant} variant={variant} title={variant} message={`${variant} notification.`} />
      ))}
    </div>
  ),
}

export const Unread: Story = {
  args: { unread: true, title: "Unread notification" },
}

export const Dismissible: Story = {
  args: { dismissible: true, onClose: fn(), title: "Dismissible" },
}

export const WithIcon: Story = {
  args: {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
}

export const WithActions: Story = {
  args: {
    title: "Invitation",
    message: "Alice invited you to join the project.",
    actions: (
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button">Accept</button>
        <button type="button">Decline</button>
      </div>
    ),
  },
}

export const WithTimestamp: Story = {
  args: { title: "Update", message: "System updated.", timestamp: "5 min ago" },
}

export const DismissClick: Story = {
  args: {
    dismissible: true,
    onClose: fn(),
    title: "Dismiss me",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const closeButton = canvas.getByRole("button", { name: "Dismiss notification" })
    await userEvent.click(closeButton)
    await expect(args.onClose).toHaveBeenCalledTimes(1)
  },
}

export const Accessibility: Story = {
  args: { title: "Accessible notification" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("article")).toBeInTheDocument()
  },
}
