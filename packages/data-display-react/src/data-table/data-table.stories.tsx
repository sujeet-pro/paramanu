import type { Meta, StoryObj } from "@storybook/react"
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
  tags: ["autodocs"],
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
            <DataTableHeaderCell sortable sortDirection="asc">Name</DataTableHeaderCell>
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
          <DataTableRow><DataTableCell>Alice</DataTableCell><DataTableCell>Engineer</DataTableCell></DataTableRow>
          <DataTableRow><DataTableCell>Bob</DataTableCell><DataTableCell>Designer</DataTableCell></DataTableRow>
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
          <DataTableRow><DataTableCell>Alice</DataTableCell></DataTableRow>
          <DataTableRow><DataTableCell>Bob</DataTableCell></DataTableRow>
        </tbody>
      </table>
    </DataTable>
  ),
}
