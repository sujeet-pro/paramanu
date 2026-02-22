import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import {
  Alertdialog,
  AlertdialogHeader,
  AlertdialogBody,
  AlertdialogFooter,
} from "./alert-dialog.js"

const meta = {
  title: "Overlays/Alert Dialog",
  component: Alertdialog,
  tags: ["autodocs", "beta"],
  argTypes: {
    variant: { control: "select", options: ["info", "danger", "warning"] },
    open: { control: "boolean" },
  },
  args: { open: true, variant: "info" },
} satisfies Meta<typeof Alertdialog>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Alertdialog {...args}>
      <AlertdialogHeader>Confirm Action</AlertdialogHeader>
      <AlertdialogBody>Are you sure you want to proceed?</AlertdialogBody>
      <AlertdialogFooter>
        <button type="button" onClick={args.onClose}>
          Cancel
        </button>
        <button type="button">Confirm</button>
      </AlertdialogFooter>
    </Alertdialog>
  ),
}

export const Danger: Story = {
  args: { variant: "danger", onClose: fn() },
  render: (args) => (
    <Alertdialog {...args}>
      <AlertdialogHeader>Delete Item?</AlertdialogHeader>
      <AlertdialogBody>This action cannot be undone.</AlertdialogBody>
      <AlertdialogFooter>
        <button type="button" onClick={args.onClose}>
          Cancel
        </button>
        <button type="button">Delete</button>
      </AlertdialogFooter>
    </Alertdialog>
  ),
}

export const Warning: Story = {
  args: { variant: "warning", onClose: fn() },
  render: (args) => (
    <Alertdialog {...args}>
      <AlertdialogHeader>Unsaved Changes</AlertdialogHeader>
      <AlertdialogBody>You have unsaved changes. Discard them?</AlertdialogBody>
      <AlertdialogFooter>
        <button type="button" onClick={args.onClose}>
          Keep Editing
        </button>
        <button type="button">Discard</button>
      </AlertdialogFooter>
    </Alertdialog>
  ),
}

export const ClickCancel: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Alertdialog {...args}>
      <AlertdialogHeader>Confirm</AlertdialogHeader>
      <AlertdialogBody>Proceed?</AlertdialogBody>
      <AlertdialogFooter>
        <button type="button" onClick={args.onClose}>
          Cancel
        </button>
        <button type="button">OK</button>
      </AlertdialogFooter>
    </Alertdialog>
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
    <Alertdialog {...args}>
      <AlertdialogHeader>Alert</AlertdialogHeader>
      <AlertdialogBody>Content</AlertdialogBody>
      <AlertdialogFooter>
        <button type="button">OK</button>
      </AlertdialogFooter>
    </Alertdialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("alertdialog")).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Alertdialog {...args}>
      <AlertdialogHeader>Alert</AlertdialogHeader>
      <AlertdialogBody>Content</AlertdialogBody>
      <AlertdialogFooter>
        <button type="button">OK</button>
      </AlertdialogFooter>
    </Alertdialog>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { onClose: fn() },
  render: (args) => (
    <Alertdialog {...args}>
      <AlertdialogHeader>Alert</AlertdialogHeader>
      <AlertdialogBody>Content</AlertdialogBody>
      <AlertdialogFooter>
        <button type="button">OK</button>
      </AlertdialogFooter>
    </Alertdialog>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
