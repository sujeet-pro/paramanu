import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Datagrid, DatagridRow, DatagridCell, DatagridColumnHeader } from "./data-grid.js"

const meta = {
  title: "Data Display/Data Grid",
  component: Datagrid,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    bordered: { control: "boolean" },
    hoverable: { control: "boolean" },
    stickyHeader: { control: "boolean" },
    resizable: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<typeof Datagrid>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Datagrid {...args} style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
      <DatagridRow>
        <DatagridColumnHeader>Name</DatagridColumnHeader>
        <DatagridColumnHeader>Role</DatagridColumnHeader>
        <DatagridColumnHeader>Status</DatagridColumnHeader>
      </DatagridRow>
      <DatagridRow>
        <DatagridCell>Alice</DatagridCell>
        <DatagridCell>Engineer</DatagridCell>
        <DatagridCell>Active</DatagridCell>
      </DatagridRow>
      <DatagridRow>
        <DatagridCell>Bob</DatagridCell>
        <DatagridCell>Designer</DatagridCell>
        <DatagridCell>Away</DatagridCell>
      </DatagridRow>
    </Datagrid>
  ),
}

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <Datagrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DatagridRow>
        <DatagridColumnHeader>Name</DatagridColumnHeader>
        <DatagridColumnHeader>Role</DatagridColumnHeader>
      </DatagridRow>
      <DatagridRow>
        <DatagridCell>Alice</DatagridCell>
        <DatagridCell>Engineer</DatagridCell>
      </DatagridRow>
    </Datagrid>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Datagrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DatagridRow>
        <DatagridColumnHeader>Key</DatagridColumnHeader>
        <DatagridColumnHeader>Value</DatagridColumnHeader>
      </DatagridRow>
      <DatagridRow>
        <DatagridCell>Status</DatagridCell>
        <DatagridCell>Active</DatagridCell>
      </DatagridRow>
    </Datagrid>
  ),
}

export const Hoverable: Story = {
  args: { hoverable: true },
  render: (args) => (
    <Datagrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DatagridRow>
        <DatagridColumnHeader>Name</DatagridColumnHeader>
        <DatagridColumnHeader>Value</DatagridColumnHeader>
      </DatagridRow>
      <DatagridRow>
        <DatagridCell>Row 1</DatagridCell>
        <DatagridCell>Data</DatagridCell>
      </DatagridRow>
    </Datagrid>
  ),
}

export const Resizable: Story = {
  args: { resizable: true },
  render: (args) => (
    <Datagrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DatagridRow>
        <DatagridColumnHeader>Name</DatagridColumnHeader>
        <DatagridColumnHeader>Value</DatagridColumnHeader>
      </DatagridRow>
      <DatagridRow>
        <DatagridCell>Resizable</DatagridCell>
        <DatagridCell>Columns</DatagridCell>
      </DatagridRow>
    </Datagrid>
  ),
}

export const StickyHeader: Story = {
  args: { stickyHeader: true },
  render: (args) => (
    <Datagrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DatagridRow>
        <DatagridColumnHeader>Name</DatagridColumnHeader>
        <DatagridColumnHeader>Value</DatagridColumnHeader>
      </DatagridRow>
      <DatagridRow>
        <DatagridCell>Sticky</DatagridCell>
        <DatagridCell>Header</DatagridCell>
      </DatagridRow>
    </Datagrid>
  ),
}

export const Hover: Story = {
  args: { hoverable: true },
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <Datagrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DatagridRow>
        <DatagridColumnHeader>Name</DatagridColumnHeader>
        <DatagridColumnHeader>Value</DatagridColumnHeader>
      </DatagridRow>
      <DatagridRow>
        <DatagridCell>Hover</DatagridCell>
        <DatagridCell>Row</DatagridCell>
      </DatagridRow>
    </Datagrid>
  ),
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <Datagrid {...args} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <DatagridRow>
        <DatagridColumnHeader>Name</DatagridColumnHeader>
        <DatagridColumnHeader>Value</DatagridColumnHeader>
      </DatagridRow>
      <DatagridRow>
        <DatagridCell>Focus</DatagridCell>
        <DatagridCell>Row</DatagridCell>
      </DatagridRow>
    </Datagrid>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <Datagrid style={{ gridTemplateColumns: "1fr" }}>
      <DatagridRow>
        <DatagridCell>Test</DatagridCell>
      </DatagridRow>
    </Datagrid>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-datagrid")
    await expect(el).toBeTruthy()
  },
}
