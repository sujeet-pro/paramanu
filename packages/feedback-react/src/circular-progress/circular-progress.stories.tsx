import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { CircularProgress } from "./circular-progress.js"

const meta = {
  title: "Feedback/Circular Progress",
  component: CircularProgress,
  tags: ["autodocs", "stable"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    variant: { control: "select", options: ["primary", "success", "warning", "danger"] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    indeterminate: { control: "boolean" },
    thickness: { control: { type: "number", min: 1, max: 10 } },
  },
  args: {
    value: 60,
  },
} satisfies Meta<typeof CircularProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Primary: Story = { args: { variant: "primary", value: 50 } }
export const Success: Story = { args: { variant: "success", value: 75 } }
export const Warning: Story = { args: { variant: "warning", value: 40 } }
export const Danger: Story = { args: { variant: "danger", value: 90 } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      {(["primary", "success", "warning", "danger"] as const).map((variant) => (
        <CircularProgress key={variant} variant={variant} value={65} aria-label={`${variant} progress`} />
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <CircularProgress key={size} size={size} value={50} aria-label={`${size} progress`} />
      ))}
    </div>
  ),
}

export const Indeterminate: Story = {
  args: { indeterminate: true },
}

export const ThickStroke: Story = {
  args: { thickness: 8, value: 70 },
}

export const Zero: Story = {
  args: { value: 0 },
}

export const Complete: Story = {
  args: { value: 100, variant: "success" },
}

export const Accessibility: Story = {
  args: { value: 42, "aria-label": "Upload progress" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const bar = canvas.getByRole("progressbar")
    await expect(bar).toHaveAttribute("aria-valuenow", "42")
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
