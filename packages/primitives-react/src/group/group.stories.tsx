import type { Meta, StoryObj } from "@storybook/react"
import { Group } from "./group.js"

const meta = {
  title: "Primitives/Group",
  tags: ["autodocs"],
  component: Group,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    attached: { control: "boolean" },
    wrap: { control: "boolean" },
    grow: { control: "boolean" },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around", "evenly"] },
  },
  args: {},
} satisfies Meta<typeof Group>

export default meta
type Story = StoryObj<typeof meta>

const buttons = (
  <>
    <button type="button" style={{ padding: "8px 16px" }}>Action 1</button>
    <button type="button" style={{ padding: "8px 16px" }}>Action 2</button>
    <button type="button" style={{ padding: "8px 16px" }}>Action 3</button>
  </>
)

/** The default playground story. */
export const Playground: Story = {
  args: { gap: "3" },
  render: (args) => <Group {...args}>{buttons}</Group>,
}

/** Vertical group. */
export const Vertical: Story = {
  args: { orientation: "vertical", gap: "3" },
  render: (args) => <Group {...args}>{buttons}</Group>,
}

/** Attached buttons (no gap, shared borders). */
export const Attached: Story = {
  args: { attached: true },
  render: (args) => <Group {...args}>{buttons}</Group>,
}

/** Group with grow enabled. */
export const Grow: Story = {
  args: { gap: "3", grow: true },
  render: (args) => <Group {...args}>{buttons}</Group>,
}
