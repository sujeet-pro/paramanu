import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Pagination, PaginationItem } from "./pagination.js"

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs", "stable"],
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

export const ClickPage: Story = {
  render: () => {
    const onClick = fn()
    return (
      <Pagination>
        <PaginationItem active>1</PaginationItem>
        <PaginationItem onClick={onClick}>2</PaginationItem>
        <PaginationItem>3</PaginationItem>
      </Pagination>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page2 = canvas.getByRole("button", { name: "2" })
    await userEvent.click(page2)
  },
}

export const ClickNext: Story = {
  render: () => {
    const onClick = fn()
    return (
      <Pagination>
        <PaginationItem active>1</PaginationItem>
        <PaginationItem>2</PaginationItem>
        <PaginationItem type="next" onClick={onClick}>
          Next
        </PaginationItem>
      </Pagination>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const next = canvas.getByRole("button", { name: "Next" })
    await userEvent.click(next)
  },
}

export const Accessibility: Story = {
  render: () => (
    <Pagination>
      <PaginationItem active>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
    </Pagination>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument()
  },
}

export const Hover: Story = {
  render: (args) => (
    <Pagination {...args}>
      <PaginationItem active>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
    </Pagination>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: (args) => (
    <Pagination {...args}>
      <PaginationItem active>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
    </Pagination>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
