import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { DataList, DataListItem, DataListTerm, DataListDetail } from "./data-list.js"

const meta = {
  title: "Data Display/Data List",
  component: DataList,
  tags: ["autodocs", "stable"],
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

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <DataList {...args}>
      <DataListItem>
        <DataListTerm>Key</DataListTerm>
        <DataListDetail>Value</DataListDetail>
      </DataListItem>
    </DataList>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <DataList {...args}>
      <DataListItem>
        <DataListTerm>Key</DataListTerm>
        <DataListDetail>Value</DataListDetail>
      </DataListItem>
    </DataList>
  ),
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <DataList {...args}>
      <DataListItem>
        <DataListTerm>Hover</DataListTerm>
        <DataListDetail>State</DataListDetail>
      </DataListItem>
    </DataList>
  ),
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <DataList {...args}>
      <DataListItem>
        <DataListTerm>Focus</DataListTerm>
        <DataListDetail>State</DataListDetail>
      </DataListItem>
    </DataList>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <DataList>
      <DataListItem>
        <DataListTerm>Test</DataListTerm>
        <DataListDetail>Value</DataListDetail>
      </DataListItem>
    </DataList>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-data-list")
    await expect(el).toBeTruthy()
  },
}
