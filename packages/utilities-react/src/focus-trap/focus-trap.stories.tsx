import type { Meta, StoryObj } from "@storybook/react"
import { FocusTrap } from "./focus-trap.js"

const meta = {
  title: "Utilities/FocusTrap",
  component: FocusTrap,
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean" },
  },
  args: {
    active: true,
    children: (
      <div style={{ padding: "24px", border: "2px solid #ccc" }}>
        <p>Focus is trapped within this area. Try pressing Tab.</p>
        <button type="button">First button</button>
        <button type="button">Second button</button>
        <button type="button">Third button</button>
      </div>
    ),
  },
} satisfies Meta<typeof FocusTrap>

export default meta
type Story = StoryObj<typeof FocusTrap>

export const Playground: Story = {}

export const Inactive: Story = {
  args: { active: false },
}
