import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Group } from "./group.js"

const meta = {
  title: "Primitives/Group",
  tags: ["autodocs", "beta"],
  component: Group,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    attached: { control: "boolean" },
    wrap: { control: "boolean" },
    grow: { control: "boolean" },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
  },
  args: {},
} satisfies Meta<typeof Group>

export default meta
type Story = StoryObj<typeof meta>

const buttons = (
  <>
    <button type="button" style={{ padding: "8px 16px" }}>
      Action 1
    </button>
    <button type="button" style={{ padding: "8px 16px" }}>
      Action 2
    </button>
    <button type="button" style={{ padding: "8px 16px" }}>
      Action 3
    </button>
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

/** Attached buttons in vertical orientation. */
export const AttachedVertical: Story = {
  args: { attached: true, orientation: "vertical" },
  render: (args) => <Group {...args}>{buttons}</Group>,
}

/** Group with wrapping. */
export const WithWrap: Story = {
  args: { gap: "3", wrap: true },
  render: (args) => <Group {...args}>{buttons}</Group>,
}

/** Align items center. */
export const AlignCenter: Story = {
  args: { gap: "3", align: "center" },
  render: (args) => <Group {...args}>{buttons}</Group>,
}

/** Align items end. */
export const AlignEnd: Story = {
  args: { gap: "3", align: "end" },
  render: (args) => <Group {...args}>{buttons}</Group>,
}

/** Justify space between. */
export const JustifyBetween: Story = {
  args: { gap: "3", justify: "between" },
  render: (args) => <Group {...args}>{buttons}</Group>,
}

/** Justify center. */
export const JustifyCenter: Story = {
  args: { gap: "3", justify: "center" },
  render: (args) => <Group {...args}>{buttons}</Group>,
}

export const Hover: Story = {
  args: { gap: "3" },
  render: (args) => <Group {...args}>{buttons}</Group>,
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { gap: "3" },
  render: (args) => <Group {...args}>{buttons}</Group>,
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  args: { gap: "3" },
  render: (args) => <Group {...args}>{buttons}</Group>,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-group")
    await expect(el).toBeTruthy()
  },
}

export const Accessibility: Story = {
  args: { gap: "3" },
  render: (args) => (
    <Group {...args} role="group" aria-label="Actions">
      {buttons}
    </Group>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector("[role='group']")
    await expect(el).toBeTruthy()
  },
}
