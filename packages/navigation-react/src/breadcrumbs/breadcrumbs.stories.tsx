import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink } from "./breadcrumbs.js"

const meta = {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs", "stable"],
  argTypes: {
    separator: {
      control: "select",
      options: ["slash", "chevron", "dot", "arrow"],
    },
  },
  args: {
    separator: "slash",
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Products</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem active>Details</BreadcrumbsItem>
    </Breadcrumbs>
  ),
}

export const Slash: Story = {
  args: { separator: "slash" },
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem active>Page</BreadcrumbsItem>
    </Breadcrumbs>
  ),
}

export const Chevron: Story = {
  args: { separator: "chevron" },
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem active>Page</BreadcrumbsItem>
    </Breadcrumbs>
  ),
}

export const Dot: Story = {
  args: { separator: "dot" },
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem active>Page</BreadcrumbsItem>
    </Breadcrumbs>
  ),
}

export const Arrow: Story = {
  args: { separator: "arrow" },
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem active>Page</BreadcrumbsItem>
    </Breadcrumbs>
  ),
}

export const LongPath: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Category</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Subcategory</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Product</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem active>Details</BreadcrumbsItem>
    </Breadcrumbs>
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
      <Breadcrumbs>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#" onClick={onClick}>
            Home
          </BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsItem active>Current</BreadcrumbsItem>
      </Breadcrumbs>
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
    <Breadcrumbs>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem active>Page</BreadcrumbsItem>
    </Breadcrumbs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument()
  },
}

export const Hover: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem active>Page</BreadcrumbsItem>
    </Breadcrumbs>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem active>Page</BreadcrumbsItem>
    </Breadcrumbs>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
