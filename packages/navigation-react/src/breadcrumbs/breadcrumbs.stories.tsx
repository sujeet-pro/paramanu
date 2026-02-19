import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "./breadcrumbs.js"

const meta = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs", "beta"],
  argTypes: {
    separator: {
      control: "select",
      options: ["slash", "chevron", "dot", "arrow"],
    },
  },
  args: {
    separator: "slash",
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem active>Details</BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const Slash: Story = {
  args: { separator: "slash" },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem active>Page</BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const Chevron: Story = {
  args: { separator: "chevron" },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem active>Page</BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const Dot: Story = {
  args: { separator: "dot" },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem active>Page</BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const Arrow: Story = {
  args: { separator: "arrow" },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem active>Page</BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const LongPath: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Category</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Subcategory</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Product</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem active>Details</BreadcrumbItem>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument()
    const current = canvas.getByText("Details")
    await expect(current.closest("[aria-current]")).toBeTruthy()
  },
}

export const ClickCrumb: Story = {
  render: () => {
    const onClick = fn()
    return (
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={onClick}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem active>Current</BreadcrumbItem>
      </Breadcrumb>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole("link", { name: "Home" })
    await userEvent.click(link)
  },
}

export const Accessibility: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem active>Page</BreadcrumbItem>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument()
  },
}

export const Hover: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem active>Page</BreadcrumbItem>
    </Breadcrumb>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem active>Page</BreadcrumbItem>
    </Breadcrumb>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
