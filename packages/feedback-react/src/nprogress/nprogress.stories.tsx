import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { NProgress } from "./nprogress.js"

const meta = {
  title: "Feedback/NProgress",
  component: NProgress,
  tags: ["autodocs", "beta"],
  argTypes: {
    active: { control: "boolean" },
    value: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
  },
  args: {
    active: true,
    value: 0.3,
  },
} satisfies Meta<typeof NProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Active: Story = {
  args: { active: true, value: 0.4 },
}

export const Inactive: Story = {
  args: { active: false, value: 0 },
}

export const HalfProgress: Story = {
  args: { active: true, value: 0.5 },
}

export const NearComplete: Story = {
  args: { active: true, value: 0.9 },
}

export const Complete: Story = {
  args: { active: false, value: 1 },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p style={{ marginBottom: 4 }}>Active (30%)</p>
        <NProgress active value={0.3} />
      </div>
      <div>
        <p style={{ marginBottom: 4 }}>Active (70%)</p>
        <NProgress active value={0.7} />
      </div>
      <div>
        <p style={{ marginBottom: 4 }}>Complete</p>
        <NProgress active={false} value={1} />
      </div>
    </div>
  ),
}

export const Accessibility: Story = {
  args: { active: true, value: 0.42 },
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
