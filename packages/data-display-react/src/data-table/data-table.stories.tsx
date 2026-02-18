import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import {
  DataTable,
  DataTableToolbar,
  DataTableHeaderCell,
  DataTableRow,
  DataTableCell,
  DataTablePagination,
} from "./data-table.js"

const meta = {
  title: "Data Display/Data Table",
  component: DataTable,
  tags: ["autodocs", "stable"],
  argTypes: {
    variant: { control: "select", options: ["simple", "striped"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    hoverable: { control: "boolean" },
    bordered: { control: "boolean" },
    stickyHeader: { control: "boolean" },
    selectable: { control: "boolean" },
  },
  args: { variant: "simple", size: "md" },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <DataTable {...args}>
      <DataTableToolbar>Search / Filters</DataTableToolbar>
      <table>
        <thead>
          <DataTableRow>
            <DataTableHeaderCell sortable sortDirection="asc">
              Name
            </DataTableHeaderCell>
            <DataTableHeaderCell>Email</DataTableHeaderCell>
            <DataTableHeaderCell align="end">Actions</DataTableHeaderCell>
          </DataTableRow>
        </thead>
        <tbody>
          <DataTableRow>
            <DataTableCell>Alice</DataTableCell>
            <DataTableCell>alice@example.com</DataTableCell>
            <DataTableCell>Edit</DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>Bob</DataTableCell>
            <DataTableCell>bob@example.com</DataTableCell>
            <DataTableCell>Edit</DataTableCell>
          </DataTableRow>
        </tbody>
      </table>
      <DataTablePagination>1 of 5</DataTablePagination>
    </DataTable>
  ),
}

export const Striped: Story = {
  args: { variant: "striped" },
  render: (args) => (
    <DataTable {...args}>
      <table>
        <thead>
          <DataTableRow>
            <DataTableHeaderCell>Name</DataTableHeaderCell>
            <DataTableHeaderCell>Role</DataTableHeaderCell>
          </DataTableRow>
        </thead>
        <tbody>
          <DataTableRow>
            <DataTableCell>Alice</DataTableCell>
            <DataTableCell>Engineer</DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>Bob</DataTableCell>
            <DataTableCell>Designer</DataTableCell>
          </DataTableRow>
        </tbody>
      </table>
    </DataTable>
  ),
}

export const Selectable: Story = {
  args: { selectable: true, hoverable: true },
  render: (args) => (
    <DataTable {...args}>
      <table>
        <thead>
          <DataTableRow>
            <DataTableHeaderCell>Name</DataTableHeaderCell>
          </DataTableRow>
        </thead>
        <tbody>
          <DataTableRow>
            <DataTableCell>Alice</DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>Bob</DataTableCell>
          </DataTableRow>
        </tbody>
      </table>
    </DataTable>
  ),
}

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <DataTable {...args}>
      <table>
        <thead>
          <DataTableRow>
            <DataTableHeaderCell>Name</DataTableHeaderCell>
            <DataTableHeaderCell>Role</DataTableHeaderCell>
          </DataTableRow>
        </thead>
        <tbody>
          <DataTableRow>
            <DataTableCell>Alice</DataTableCell>
            <DataTableCell>Engineer</DataTableCell>
          </DataTableRow>
        </tbody>
      </table>
    </DataTable>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <DataTable {...args}>
      <table>
        <thead>
          <DataTableRow>
            <DataTableHeaderCell>Name</DataTableHeaderCell>
          </DataTableRow>
        </thead>
        <tbody>
          <DataTableRow>
            <DataTableCell>Alice</DataTableCell>
          </DataTableRow>
        </tbody>
      </table>
    </DataTable>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <DataTable {...args}>
      <table>
        <thead>
          <DataTableRow>
            <DataTableHeaderCell>Name</DataTableHeaderCell>
          </DataTableRow>
        </thead>
        <tbody>
          <DataTableRow>
            <DataTableCell>Alice</DataTableCell>
          </DataTableRow>
        </tbody>
      </table>
    </DataTable>
  ),
}

export const StickyHeader: Story = {
  args: { stickyHeader: true },
  render: (args) => (
    <DataTable {...args}>
      <table>
        <thead>
          <DataTableRow>
            <DataTableHeaderCell>Name</DataTableHeaderCell>
          </DataTableRow>
        </thead>
        <tbody>
          <DataTableRow>
            <DataTableCell>Alice</DataTableCell>
          </DataTableRow>
        </tbody>
      </table>
    </DataTable>
  ),
}

export const Hover: Story = {
  args: { hoverable: true },
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <DataTable {...args}>
      <table>
        <thead>
          <DataTableRow>
            <DataTableHeaderCell>Name</DataTableHeaderCell>
          </DataTableRow>
        </thead>
        <tbody>
          <DataTableRow>
            <DataTableCell>Hover</DataTableCell>
          </DataTableRow>
        </tbody>
      </table>
    </DataTable>
  ),
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <DataTable {...args}>
      <table>
        <thead>
          <DataTableRow>
            <DataTableHeaderCell>Name</DataTableHeaderCell>
          </DataTableRow>
        </thead>
        <tbody>
          <DataTableRow>
            <DataTableCell>Focus</DataTableCell>
          </DataTableRow>
        </tbody>
      </table>
    </DataTable>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <DataTable>
      <table>
        <tbody>
          <DataTableRow>
            <DataTableCell>Test</DataTableCell>
          </DataTableRow>
        </tbody>
      </table>
    </DataTable>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-data-table")
    await expect(el).toBeTruthy()
  },
}
