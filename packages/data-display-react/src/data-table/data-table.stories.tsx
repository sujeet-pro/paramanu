import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import {
  Datatable,
  DatatableToolbar,
  DatatableHeaderCell,
  DatatableRow,
  DatatableCell,
  DatatablePagination,
} from "./data-table.js"

const meta = {
  title: "Data Display/Data Table",
  component: Datatable,
  tags: ["autodocs", "beta"],
  argTypes: {
    variant: { control: "select", options: ["simple", "striped"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    hoverable: { control: "boolean" },
    bordered: { control: "boolean" },
    stickyHeader: { control: "boolean" },
    selectable: { control: "boolean" },
  },
  args: { variant: "simple", size: "md" },
} satisfies Meta<typeof Datatable>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Datatable {...args}>
      <DatatableToolbar>Search / Filters</DatatableToolbar>
      <table>
        <thead>
          <DatatableRow>
            <DatatableHeaderCell sortable sortDirection="asc">
              Name
            </DatatableHeaderCell>
            <DatatableHeaderCell>Email</DatatableHeaderCell>
            <DatatableHeaderCell align="end">Actions</DatatableHeaderCell>
          </DatatableRow>
        </thead>
        <tbody>
          <DatatableRow>
            <DatatableCell>Alice</DatatableCell>
            <DatatableCell>alice@example.com</DatatableCell>
            <DatatableCell>Edit</DatatableCell>
          </DatatableRow>
          <DatatableRow>
            <DatatableCell>Bob</DatatableCell>
            <DatatableCell>bob@example.com</DatatableCell>
            <DatatableCell>Edit</DatatableCell>
          </DatatableRow>
        </tbody>
      </table>
      <DatatablePagination>1 of 5</DatatablePagination>
    </Datatable>
  ),
}

export const Striped: Story = {
  args: { variant: "striped" },
  render: (args) => (
    <Datatable {...args}>
      <table>
        <thead>
          <DatatableRow>
            <DatatableHeaderCell>Name</DatatableHeaderCell>
            <DatatableHeaderCell>Role</DatatableHeaderCell>
          </DatatableRow>
        </thead>
        <tbody>
          <DatatableRow>
            <DatatableCell>Alice</DatatableCell>
            <DatatableCell>Engineer</DatatableCell>
          </DatatableRow>
          <DatatableRow>
            <DatatableCell>Bob</DatatableCell>
            <DatatableCell>Designer</DatatableCell>
          </DatatableRow>
        </tbody>
      </table>
    </Datatable>
  ),
}

export const Selectable: Story = {
  args: { selectable: true, hoverable: true },
  render: (args) => (
    <Datatable {...args}>
      <table>
        <thead>
          <DatatableRow>
            <DatatableHeaderCell>Name</DatatableHeaderCell>
          </DatatableRow>
        </thead>
        <tbody>
          <DatatableRow>
            <DatatableCell>Alice</DatatableCell>
          </DatatableRow>
          <DatatableRow>
            <DatatableCell>Bob</DatatableCell>
          </DatatableRow>
        </tbody>
      </table>
    </Datatable>
  ),
}

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <Datatable {...args}>
      <table>
        <thead>
          <DatatableRow>
            <DatatableHeaderCell>Name</DatatableHeaderCell>
            <DatatableHeaderCell>Role</DatatableHeaderCell>
          </DatatableRow>
        </thead>
        <tbody>
          <DatatableRow>
            <DatatableCell>Alice</DatatableCell>
            <DatatableCell>Engineer</DatatableCell>
          </DatatableRow>
        </tbody>
      </table>
    </Datatable>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Datatable {...args}>
      <table>
        <thead>
          <DatatableRow>
            <DatatableHeaderCell>Name</DatatableHeaderCell>
          </DatatableRow>
        </thead>
        <tbody>
          <DatatableRow>
            <DatatableCell>Alice</DatatableCell>
          </DatatableRow>
        </tbody>
      </table>
    </Datatable>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Datatable {...args}>
      <table>
        <thead>
          <DatatableRow>
            <DatatableHeaderCell>Name</DatatableHeaderCell>
          </DatatableRow>
        </thead>
        <tbody>
          <DatatableRow>
            <DatatableCell>Alice</DatatableCell>
          </DatatableRow>
        </tbody>
      </table>
    </Datatable>
  ),
}

export const StickyHeader: Story = {
  args: { stickyHeader: true },
  render: (args) => (
    <Datatable {...args}>
      <table>
        <thead>
          <DatatableRow>
            <DatatableHeaderCell>Name</DatatableHeaderCell>
          </DatatableRow>
        </thead>
        <tbody>
          <DatatableRow>
            <DatatableCell>Alice</DatatableCell>
          </DatatableRow>
        </tbody>
      </table>
    </Datatable>
  ),
}

export const Hover: Story = {
  args: { hoverable: true },
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <Datatable {...args}>
      <table>
        <thead>
          <DatatableRow>
            <DatatableHeaderCell>Name</DatatableHeaderCell>
          </DatatableRow>
        </thead>
        <tbody>
          <DatatableRow>
            <DatatableCell>Hover</DatatableCell>
          </DatatableRow>
        </tbody>
      </table>
    </Datatable>
  ),
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <Datatable {...args}>
      <table>
        <thead>
          <DatatableRow>
            <DatatableHeaderCell>Name</DatatableHeaderCell>
          </DatatableRow>
        </thead>
        <tbody>
          <DatatableRow>
            <DatatableCell>Focus</DatatableCell>
          </DatatableRow>
        </tbody>
      </table>
    </Datatable>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <Datatable>
      <table>
        <tbody>
          <DatatableRow>
            <DatatableCell>Test</DatatableCell>
          </DatatableRow>
        </tbody>
      </table>
    </Datatable>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-datatable")
    await expect(el).toBeTruthy()
  },
}
