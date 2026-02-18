import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Pagination, PaginationItem } from "./pagination.js"

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "minimal"],
    },
  },
  args: {
    size: "md",
    variant: "default",
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Pagination {...args}>
      <PaginationItem type="prev" disabled>Prev</PaginationItem>
      <PaginationItem active>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
      <PaginationItem>3</PaginationItem>
      <PaginationItem type="ellipsis">...</PaginationItem>
      <PaginationItem>10</PaginationItem>
      <PaginationItem type="next">Next</PaginationItem>
    </Pagination>
  ),
}

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationItem type="prev">Prev</PaginationItem>
      <PaginationItem>1</PaginationItem>
      <PaginationItem active>2</PaginationItem>
      <PaginationItem>3</PaginationItem>
      <PaginationItem type="next">Next</PaginationItem>
    </Pagination>
  ),
}

export const Minimal: Story = {
  args: { variant: "minimal" },
  render: (args) => (
    <Pagination {...args}>
      <PaginationItem type="prev">Prev</PaginationItem>
      <PaginationItem active>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
      <PaginationItem type="next">Next</PaginationItem>
    </Pagination>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Pagination {...args}>
      <PaginationItem active>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
    </Pagination>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Pagination {...args}>
      <PaginationItem active>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
    </Pagination>
  ),
}

export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationItem type="prev">Prev</PaginationItem>
      <PaginationItem>1</PaginationItem>
      <PaginationItem type="ellipsis">...</PaginationItem>
      <PaginationItem active>5</PaginationItem>
      <PaginationItem type="ellipsis">...</PaginationItem>
      <PaginationItem>20</PaginationItem>
      <PaginationItem type="next">Next</PaginationItem>
    </Pagination>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument()
    const activePage = canvas.getByRole("button", { name: "5" })
    await expect(activePage).toHaveAttribute("aria-current", "page")
  },
}
