import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { AlertDialog, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "./alert-dialog.js"

const meta = {
  title: "Overlays/Alert Dialog",
  component: AlertDialog,
  tags: ["autodocs", "stable"],
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

export const ClickCancel: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogHeader>Confirm</AlertDialogHeader>
      <AlertDialogBody>Proceed?</AlertDialogBody>
      <AlertDialogFooter>
        <button type="button" onClick={args.onClose}>Cancel</button>
        <button type="button">OK</button>
      </AlertDialogFooter>
    </AlertDialog>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const cancelBtn = canvas.getByRole("button", { name: "Cancel" })
    await userEvent.click(cancelBtn)
    await expect(args.onClose).toHaveBeenCalledTimes(1)
  },
}

export const Accessibility: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogHeader>Alert</AlertDialogHeader>
      <AlertDialogBody>Content</AlertDialogBody>
      <AlertDialogFooter>
        <button type="button">OK</button>
      </AlertDialogFooter>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("alertdialog")).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogHeader>Alert</AlertDialogHeader>
      <AlertDialogBody>Content</AlertDialogBody>
      <AlertDialogFooter>
        <button type="button">OK</button>
      </AlertDialogFooter>
    </AlertDialog>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogHeader>Alert</AlertDialogHeader>
      <AlertDialogBody>Content</AlertDialogBody>
      <AlertDialogFooter>
        <button type="button">OK</button>
      </AlertDialogFooter>
    </AlertDialog>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
