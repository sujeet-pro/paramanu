import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Menubar, MenubarItem } from "./menubar.js"

const meta = {
  title: "Navigation/Menubar",
  component: Menubar,
  tags: ["autodocs", "stable"],
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => (
    <Menubar>
      <MenubarItem>File</MenubarItem>
      <MenubarItem>Edit</MenubarItem>
      <MenubarItem>View</MenubarItem>
      <MenubarItem>Help</MenubarItem>
    </Menubar>
  ),
}

export const WithActiveItem: Story = {
  render: () => (
    <Menubar>
      <MenubarItem active>File</MenubarItem>
      <MenubarItem>Edit</MenubarItem>
      <MenubarItem>View</MenubarItem>
    </Menubar>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <Menubar>
      <MenubarItem>File</MenubarItem>
      <MenubarItem disabled>Edit</MenubarItem>
      <MenubarItem>View</MenubarItem>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const disabledBtn = canvas.getByRole("menuitem", { name: "Edit" })
    await expect(disabledBtn).toBeDisabled()
  },
}

export const ClickItem: Story = {
  render: () => {
    const onClick = fn()
    return (
      <Menubar>
        <MenubarItem onClick={onClick}>File</MenubarItem>
        <MenubarItem>Edit</MenubarItem>
      </Menubar>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const item = canvas.getByRole("menuitem", { name: "File" })
    await userEvent.click(item)
  },
}

export const KeyboardNavigation: Story = {
  render: () => (
    <Menubar>
      <MenubarItem>File</MenubarItem>
      <MenubarItem>Edit</MenubarItem>
      <MenubarItem>View</MenubarItem>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const first = canvas.getByRole("menuitem", { name: "File" })
    first.focus()
    await expect(first).toHaveFocus()
  },
}

export const Accessibility: Story = {
  render: () => (
    <Menubar>
      <MenubarItem>File</MenubarItem>
      <MenubarItem>Edit</MenubarItem>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("menubar")).toBeInTheDocument()
  },
}

export const Hover: Story = {
  render: () => (
    <Menubar>
      <MenubarItem>File</MenubarItem>
      <MenubarItem>Edit</MenubarItem>
    </Menubar>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: () => (
    <Menubar>
      <MenubarItem>File</MenubarItem>
      <MenubarItem>Edit</MenubarItem>
    </Menubar>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
