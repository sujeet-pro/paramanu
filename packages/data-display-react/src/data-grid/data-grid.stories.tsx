import type { Meta, StoryObj } from "@storybook/react"
import { DataGrid, DataGridRow, DataGridCell, DataGridColumnHeader } from "./data-grid.js"

const meta = {
  title: "Data Display/Data Grid",
  component: DataGrid,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    bordered: { control: "boolean" },
    hoverable: { control: "boolean" },
    stickyHeader: { control: "boolean" },
    resizable: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<typeof DataGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <DataGrid {...args} style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
      <DataGridRow>
        <DataGridColumnHeader>Name</DataGridColumnHeader>
        <DataGridColumnHeader>Role</DataGridColumnHeader>
        <DataGridColumnHeader>Status</DataGridColumnHeader>
      </DataGridRow>
      <DataGridRow>
        <DataGridCell>Alice</DataGridCell>
        <DataGridCell>Engineer</DataGridCell>
        <DataGridCell>Active</DataGridCell>
      </DataGridRow>
      <DataGridRow>
        <DataGridCell>Bob</DataGridCell>
        <DataGridCell>Designer</DataGridCell>
        <DataGridCell>Away</DataGridCell>
      </DataGridRow>
    </DataGrid>
  ),
}

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <DataGrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DataGridRow>
        <DataGridColumnHeader>Name</DataGridColumnHeader>
        <DataGridColumnHeader>Role</DataGridColumnHeader>
      </DataGridRow>
      <DataGridRow>
        <DataGridCell>Alice</DataGridCell>
        <DataGridCell>Engineer</DataGridCell>
      </DataGridRow>
    </DataGrid>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <DataGrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DataGridRow>
        <DataGridColumnHeader>Key</DataGridColumnHeader>
        <DataGridColumnHeader>Value</DataGridColumnHeader>
      </DataGridRow>
      <DataGridRow>
        <DataGridCell>Status</DataGridCell>
        <DataGridCell>Active</DataGridCell>
      </DataGridRow>
    </DataGrid>
  ),
}
