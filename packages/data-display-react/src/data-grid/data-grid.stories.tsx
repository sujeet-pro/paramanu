import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { DataGrid, DataGridRow, DataGridCell, DataGridColumnHeader } from "./data-grid.js"

const meta = {
  title: "Data Display/Data Grid",
  component: DataGrid,
  tags: ["autodocs", "stable"],
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

export const Hoverable: Story = {
  args: { hoverable: true },
  render: (args) => (
    <DataGrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DataGridRow>
        <DataGridColumnHeader>Name</DataGridColumnHeader>
        <DataGridColumnHeader>Value</DataGridColumnHeader>
      </DataGridRow>
      <DataGridRow>
        <DataGridCell>Row 1</DataGridCell>
        <DataGridCell>Data</DataGridCell>
      </DataGridRow>
    </DataGrid>
  ),
}

export const Resizable: Story = {
  args: { resizable: true },
  render: (args) => (
    <DataGrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DataGridRow>
        <DataGridColumnHeader>Name</DataGridColumnHeader>
        <DataGridColumnHeader>Value</DataGridColumnHeader>
      </DataGridRow>
      <DataGridRow>
        <DataGridCell>Resizable</DataGridCell>
        <DataGridCell>Columns</DataGridCell>
      </DataGridRow>
    </DataGrid>
  ),
}

export const StickyHeader: Story = {
  args: { stickyHeader: true },
  render: (args) => (
    <DataGrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DataGridRow>
        <DataGridColumnHeader>Name</DataGridColumnHeader>
        <DataGridColumnHeader>Value</DataGridColumnHeader>
      </DataGridRow>
      <DataGridRow>
        <DataGridCell>Sticky</DataGridCell>
        <DataGridCell>Header</DataGridCell>
      </DataGridRow>
    </DataGrid>
  ),
}

export const Hover: Story = {
  args: { hoverable: true },
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <DataGrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DataGridRow>
        <DataGridColumnHeader>Name</DataGridColumnHeader>
        <DataGridColumnHeader>Value</DataGridColumnHeader>
      </DataGridRow>
      <DataGridRow>
        <DataGridCell>Hover</DataGridCell>
        <DataGridCell>Row</DataGridCell>
      </DataGridRow>
    </DataGrid>
  ),
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <DataGrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DataGridRow>
        <DataGridColumnHeader>Name</DataGridColumnHeader>
        <DataGridColumnHeader>Value</DataGridColumnHeader>
      </DataGridRow>
      <DataGridRow>
        <DataGridCell>Focus</DataGridCell>
        <DataGridCell>Row</DataGridCell>
      </DataGridRow>
    </DataGrid>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <DataGrid style={{ gridTemplateColumns: "1fr" }}>
      <DataGridRow>
        <DataGridCell>Test</DataGridCell>
      </DataGridRow>
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-data-grid")
    await expect(el).toBeTruthy()
  },
}
