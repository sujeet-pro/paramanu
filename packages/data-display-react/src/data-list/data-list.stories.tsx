import type { Meta, StoryObj } from "@storybook/react"
import { DataList, DataListItem, DataListTerm, DataListDetail } from "./data-list.js"

const meta = {
  title: "Data Display/Data List",
  component: DataList,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    dividers: { control: "boolean" },
  },
  args: { orientation: "vertical", size: "md" },
} satisfies Meta<typeof DataList>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <DataList {...args}>
      <DataListItem>
        <DataListTerm>Name</DataListTerm>
        <DataListDetail>John Doe</DataListDetail>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Email</DataListTerm>
        <DataListDetail>john@example.com</DataListDetail>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Role</DataListTerm>
        <DataListDetail>Engineer</DataListDetail>
      </DataListItem>
    </DataList>
  ),
}

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <DataList {...args}>
      <DataListItem>
        <DataListTerm>Name</DataListTerm>
        <DataListDetail>John Doe</DataListDetail>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Email</DataListTerm>
        <DataListDetail>john@example.com</DataListDetail>
      </DataListItem>
    </DataList>
  ),
}

export const WithDividers: Story = {
  args: { dividers: true },
  render: (args) => (
    <DataList {...args}>
      <DataListItem>
        <DataListTerm>Status</DataListTerm>
        <DataListDetail>Active</DataListDetail>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Plan</DataListTerm>
        <DataListDetail>Pro</DataListDetail>
      </DataListItem>
    </DataList>
  ),
}
