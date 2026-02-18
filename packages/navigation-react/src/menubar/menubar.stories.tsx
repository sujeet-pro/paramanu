import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Menubar, MenubarItem } from "./menubar.js"

const meta = {
  title: "Navigation/Menubar",
  component: Menubar,
  tags: ["autodocs"],
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
