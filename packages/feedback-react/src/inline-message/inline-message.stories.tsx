import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { InlineMsg } from "./inline-message.js"

const meta = {
  title: "Feedback/Inline Message",
  component: InlineMsg,
  tags: ["autodocs", "beta"],
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "danger"] },
    size: { control: "select", options: ["sm", "md"] },
  },
  args: {
    children: "This is an inline message.",
  },
} satisfies Meta<typeof InlineMsg>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Info: Story = { args: { variant: "info", children: "Informational message." } }
export const Success: Story = { args: { variant: "success", children: "Action completed." } }
export const Warning: Story = { args: { variant: "warning", children: "Please review." } }
export const Danger: Story = { args: { variant: "danger", children: "Invalid input." } }

export const Small: Story = { args: { size: "sm", children: "Small message." } }
export const Medium: Story = { args: { size: "md", children: "Medium message." } }

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["info", "success", "warning", "danger"] as const).map((variant) =>
        (["sm", "md"] as const).map((size) => (
          <InlineMsg key={`${variant}-${size}`} variant={variant} size={size}>
            {variant} / {size}
          </InlineMsg>
        )),
      )}
    </div>
  ),
}

export const WithIcon: Story = {
  args: {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    children: "Message with icon.",
  },
}

export const FormFieldHint: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" defaultValue="invalid" style={{ padding: "4px 8px" }} />
      <InlineMsg variant="danger" size="sm">
        Please enter a valid email address.
      </InlineMsg>
    </div>
  ),
}

export const AccessibilityRoles: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <InlineMsg variant="info">Info uses role=status</InlineMsg>
      <InlineMsg variant="danger">Danger uses role=alert</InlineMsg>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("status")).toBeInTheDocument()
    await expect(canvas.getByRole("alert")).toBeInTheDocument()
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const ActiveState: Story = {
  parameters: { pseudo: { active: true } },
}
