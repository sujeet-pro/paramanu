import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Navbar, NavbarInner, NavbarSection, NavbarBrand, NavbarToggle } from "./navbar.js"

const meta = {
  title: "Navigation/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "floating", "bordered"],
    },
    position: {
      control: "select",
      options: ["static", "sticky", "fixed"],
    },
  },
  args: {
    variant: "default",
    position: "static",
  },
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Navbar {...args}>
      <NavbarInner>
        <NavbarSection align="start">
          <NavbarBrand>Logo</NavbarBrand>
        </NavbarSection>
        <NavbarSection align="center">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </NavbarSection>
        <NavbarSection align="end">
          <NavbarToggle aria-label="Toggle menu">Menu</NavbarToggle>
        </NavbarSection>
      </NavbarInner>
    </Navbar>
  ),
}

export const Default: Story = {
  render: () => (
    <Navbar>
      <NavbarInner>
        <NavbarSection align="start">
          <NavbarBrand>Brand</NavbarBrand>
        </NavbarSection>
        <NavbarSection align="end">
          <a href="#">Link</a>
        </NavbarSection>
      </NavbarInner>
    </Navbar>
  ),
}

export const Floating: Story = {
  args: { variant: "floating" },
  render: (args) => (
    <Navbar {...args}>
      <NavbarInner>
        <NavbarSection align="start">
          <NavbarBrand>Brand</NavbarBrand>
        </NavbarSection>
        <NavbarSection align="end">
          <a href="#">Link</a>
        </NavbarSection>
      </NavbarInner>
    </Navbar>
  ),
}

export const Bordered: Story = {
  args: { variant: "bordered" },
  render: (args) => (
    <Navbar {...args}>
      <NavbarInner>
        <NavbarSection align="start">
          <NavbarBrand>Brand</NavbarBrand>
        </NavbarSection>
        <NavbarSection align="end">
          <a href="#">Link</a>
        </NavbarSection>
      </NavbarInner>
    </Navbar>
  ),
}

export const Sticky: Story = {
  args: { position: "sticky" },
  render: (args) => (
    <Navbar {...args}>
      <NavbarInner>
        <NavbarSection align="start">
          <NavbarBrand>Sticky Nav</NavbarBrand>
        </NavbarSection>
      </NavbarInner>
    </Navbar>
  ),
}

export const WithToggle: Story = {
  render: () => (
    <Navbar>
      <NavbarInner>
        <NavbarSection align="start">
          <NavbarBrand>Brand</NavbarBrand>
        </NavbarSection>
        <NavbarSection align="end">
          <NavbarToggle aria-label="Toggle navigation">Toggle</NavbarToggle>
        </NavbarSection>
      </NavbarInner>
    </Navbar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("button", { name: "Toggle navigation" })
    await expect(toggle).toBeInTheDocument()
  },
}
