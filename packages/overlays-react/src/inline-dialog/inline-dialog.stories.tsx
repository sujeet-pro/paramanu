import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { InlineDlg, InlineDlgBody } from "./inline-dialog.js"

const meta = {
  title: "Overlays/InlineDlg",
  component: InlineDlg,
  tags: ["autodocs", "beta"],
  argTypes: {
    visible: { control: "boolean" },
  },
  args: {
    visible: true,
    children: <InlineDlgBody>Inline dialog content displayed near the trigger.</InlineDlgBody>,
  },
} satisfies Meta<typeof InlineDlg>

export default meta
type Story = StoryObj<typeof InlineDlg>

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
        <InlineDlg visible>
          <InlineDlgBody>Content</InlineDlgBody>
        </InlineDlg>
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
    <InlineDlg visible>
      <InlineDlgBody>Accessible content</InlineDlgBody>
    </InlineDlg>
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
