import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Sidebar, SidebarSection, SidebarSectionLabel, SidebarItem } from "./sidebar.js"

const meta = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: "select",
      options: ["narrow", "default", "wide"],
    },
    position: {
      control: "select",
      options: ["left", "right"],
    },
    collapsed: { control: "boolean" },
  },
  args: {
    width: "default",
    position: "left",
    collapsed: false,
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Sidebar {...args}>
      <SidebarSection>
        <SidebarSectionLabel>Main</SidebarSectionLabel>
        <SidebarItem href="#" active>Dashboard</SidebarItem>
        <SidebarItem href="#">Settings</SidebarItem>
        <SidebarItem href="#" disabled>Disabled</SidebarItem>
      </SidebarSection>
    </Sidebar>
  ),
}

export const Default: Story = {
  render: () => (
    <Sidebar>
      <SidebarSection>
        <SidebarSectionLabel>Navigation</SidebarSectionLabel>
        <SidebarItem href="#" active>Home</SidebarItem>
        <SidebarItem href="#">About</SidebarItem>
      </SidebarSection>
    </Sidebar>
  ),
}

export const Narrow: Story = {
  args: { width: "narrow" },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarSection>
        <SidebarItem href="#">Item 1</SidebarItem>
        <SidebarItem href="#">Item 2</SidebarItem>
      </SidebarSection>
    </Sidebar>
  ),
}

export const Wide: Story = {
  args: { width: "wide" },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarSection>
        <SidebarItem href="#">Item 1</SidebarItem>
        <SidebarItem href="#">Item 2</SidebarItem>
      </SidebarSection>
    </Sidebar>
  ),
}

export const Collapsed: Story = {
  args: { collapsed: true },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarSection>
        <SidebarItem href="#">Item</SidebarItem>
      </SidebarSection>
    </Sidebar>
  ),
}

export const RightPosition: Story = {
  args: { position: "right" },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarSection>
        <SidebarItem href="#">Item 1</SidebarItem>
      </SidebarSection>
    </Sidebar>
  ),
}

export const WithIndentation: Story = {
  render: () => (
    <Sidebar>
      <SidebarSection>
        <SidebarSectionLabel>Files</SidebarSectionLabel>
        <SidebarItem href="#">Root</SidebarItem>
        <SidebarItem href="#" indent={1}>Level 1</SidebarItem>
        <SidebarItem href="#" indent={2}>Level 2</SidebarItem>
        <SidebarItem href="#" indent={3}>Level 3</SidebarItem>
      </SidebarSection>
    </Sidebar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Root")).toBeInTheDocument()
    await expect(canvas.getByText("Level 3")).toBeInTheDocument()
  },
}
