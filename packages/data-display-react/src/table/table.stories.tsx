import type { Meta, StoryObj } from "@storybook/react"
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableCaption,
} from "./table.js"

const meta = {
  title: "Data Display/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["simple", "striped"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    layout: {
      control: "select",
      options: ["auto", "fixed"],
    },
    hoverable: { control: "boolean" },
    bordered: { control: "boolean" },
    stickyHeader: { control: "boolean" },
  },
  args: {
    variant: "simple",
    size: "md",
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const sampleRows = [
  { name: "Alice", role: "Engineer", status: "Active" },
  { name: "Bob", role: "Designer", status: "Away" },
  { name: "Charlie", role: "Manager", status: "Active" },
]

export const Playground: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleRows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
}

export const Striped: Story = {
  args: { variant: "striped" },
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Hoverable: Story = {
  args: { hoverable: true },
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>Team Members</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
