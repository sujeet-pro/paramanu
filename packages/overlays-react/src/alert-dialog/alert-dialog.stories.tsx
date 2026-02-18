import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { AlertDialog, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "./alert-dialog.js"

const meta = {
  title: "Overlays/Alert Dialog",
  component: AlertDialog,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["info", "danger", "warning"] },
    open: { control: "boolean" },
  },
  args: { open: true, variant: "info" },
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogHeader>Confirm Action</AlertDialogHeader>
      <AlertDialogBody>Are you sure you want to proceed?</AlertDialogBody>
      <AlertDialogFooter>
        <button type="button" onClick={args.onClose}>Cancel</button>
        <button type="button">Confirm</button>
      </AlertDialogFooter>
    </AlertDialog>
  ),
}

export const Danger: Story = {
  args: { variant: "danger", onClose: fn() },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogHeader>Delete Item?</AlertDialogHeader>
      <AlertDialogBody>This action cannot be undone.</AlertDialogBody>
      <AlertDialogFooter>
        <button type="button" onClick={args.onClose}>Cancel</button>
        <button type="button">Delete</button>
      </AlertDialogFooter>
    </AlertDialog>
  ),
}

export const Warning: Story = {
  args: { variant: "warning", onClose: fn() },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogHeader>Unsaved Changes</AlertDialogHeader>
      <AlertDialogBody>You have unsaved changes. Discard them?</AlertDialogBody>
      <AlertDialogFooter>
        <button type="button" onClick={args.onClose}>Keep Editing</button>
        <button type="button">Discard</button>
      </AlertDialogFooter>
    </AlertDialog>
  ),
}
