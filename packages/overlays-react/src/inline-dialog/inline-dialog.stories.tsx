import type { Meta, StoryObj } from "@storybook/react"
import { InlineDialog, InlineDialogBody } from "./inline-dialog.js"

const meta = {
  title: "Overlays/InlineDialog",
  component: InlineDialog,
  tags: ["autodocs"],
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
