import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { InlineDialog, InlineDialogBody } from "./inline-dialog.js"

const meta = {
  title: "Overlays/InlineDialog",
  component: InlineDialog,
  tags: ["autodocs", "stable"],
  argTypes: {
    visible: { control: "boolean" },
  },
  args: {
    visible: true,
    children: <InlineDialogBody>Inline dialog content displayed near the trigger.</InlineDialogBody>,
  },
} satisfies Meta<typeof InlineDialog>

export default meta
type Story = StoryObj<typeof InlineDialog>

export const Playground: Story = {}

export const Hidden: Story = {
  args: { visible: false },
}

export const ToggleVisibility: Story = {
  render: () => {
    const onClick = fn()
    return (
      <div style={{ padding: 40 }}>
        <button type="button" onClick={onClick}>
          Toggle
        </button>
        <InlineDialog visible>
          <InlineDialogBody>Content</InlineDialogBody>
        </InlineDialog>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Toggle" })
    await userEvent.click(trigger)
  },
}

export const Accessibility: Story = {
  render: () => (
    <InlineDialog visible>
      <InlineDialogBody>Accessible content</InlineDialogBody>
    </InlineDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("dialog")).toBeInTheDocument()
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
