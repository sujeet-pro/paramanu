import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { ProgressBar } from "./progress-bar.js"

const meta = {
  title: "Feedback/Progress Bar",
  component: ProgressBar,
  tags: ["autodocs", "stable"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    variant: { control: "select", options: ["primary", "success", "warning", "danger"] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    striped: { control: "boolean" },
    animated: { control: "boolean" },
    indeterminate: { control: "boolean" },
    showLabel: { control: "boolean" },
  },
  args: {
    value: 60,
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Primary: Story = { args: { variant: "primary", value: 50 } }
export const Success: Story = { args: { variant: "success", value: 75 } }
export const Warning: Story = { args: { variant: "warning", value: 40 } }
export const Danger: Story = { args: { variant: "danger", value: 90 } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {(["primary", "success", "warning", "danger"] as const).map((variant) => (
        <ProgressBar key={variant} variant={variant} value={65} aria-label={`${variant} progress`} />
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <ProgressBar key={size} size={size} value={50} aria-label={`${size} progress`} />
      ))}
    </div>
  ),
}

export const WithLabel: Story = {
  args: { showLabel: true, value: 65 },
}

export const Striped: Story = {
  args: { striped: true, value: 60 },
}

export const StripedAnimated: Story = {
  args: { striped: true, animated: true, value: 60 },
}

export const Indeterminate: Story = {
  args: { indeterminate: true },
}

export const Zero: Story = {
  args: { value: 0 },
}

export const Complete: Story = {
  args: { value: 100, variant: "success", showLabel: true },
}

export const CustomRange: Story = {
  args: { value: 50, min: 0, max: 200, showLabel: true },
}

export const Accessibility: Story = {
  args: { value: 42, "aria-label": "Upload progress" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const bar = canvas.getByRole("progressbar")
    await expect(bar).toHaveAttribute("aria-valuenow", "42")
    await expect(bar).toHaveAttribute("aria-valuemin", "0")
    await expect(bar).toHaveAttribute("aria-valuemax", "100")
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
