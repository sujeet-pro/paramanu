import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Datalist, DatalistItem, DatalistTerm, DatalistDetail } from "./data-list.js"

const meta = {
  title: "Data Display/Data List",
  component: Datalist,
  tags: ["autodocs", "beta"],
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    dividers: { control: "boolean" },
  },
  args: { orientation: "vertical", size: "md" },
} satisfies Meta<typeof Datalist>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Datalist {...args}>
      <DatalistItem>
        <DatalistTerm>Name</DatalistTerm>
        <DatalistDetail>John Doe</DatalistDetail>
      </DatalistItem>
      <DatalistItem>
        <DatalistTerm>Email</DatalistTerm>
        <DatalistDetail>john@example.com</DatalistDetail>
      </DatalistItem>
      <DatalistItem>
        <DatalistTerm>Role</DatalistTerm>
        <DatalistDetail>Engineer</DatalistDetail>
      </DatalistItem>
    </Datalist>
  ),
}

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <Datalist {...args}>
      <DatalistItem>
        <DatalistTerm>Name</DatalistTerm>
        <DatalistDetail>John Doe</DatalistDetail>
      </DatalistItem>
      <DatalistItem>
        <DatalistTerm>Email</DatalistTerm>
        <DatalistDetail>john@example.com</DatalistDetail>
      </DatalistItem>
    </Datalist>
  ),
}

export const WithDividers: Story = {
  args: { dividers: true },
  render: (args) => (
    <Datalist {...args}>
      <DatalistItem>
        <DatalistTerm>Status</DatalistTerm>
        <DatalistDetail>Active</DatalistDetail>
      </DatalistItem>
      <DatalistItem>
        <DatalistTerm>Plan</DatalistTerm>
        <DatalistDetail>Pro</DatalistDetail>
      </DatalistItem>
    </Datalist>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Datalist {...args}>
      <DatalistItem>
        <DatalistTerm>Key</DatalistTerm>
        <DatalistDetail>Value</DatalistDetail>
      </DatalistItem>
    </Datalist>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Datalist {...args}>
      <DatalistItem>
        <DatalistTerm>Key</DatalistTerm>
        <DatalistDetail>Value</DatalistDetail>
      </DatalistItem>
    </Datalist>
  ),
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <Datalist {...args}>
      <DatalistItem>
        <DatalistTerm>Hover</DatalistTerm>
        <DatalistDetail>State</DatalistDetail>
      </DatalistItem>
    </Datalist>
  ),
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <Datalist {...args}>
      <DatalistItem>
        <DatalistTerm>Focus</DatalistTerm>
        <DatalistDetail>State</DatalistDetail>
      </DatalistItem>
    </Datalist>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <Datalist>
      <DatalistItem>
        <DatalistTerm>Test</DatalistTerm>
        <DatalistDetail>Value</DatalistDetail>
      </DatalistItem>
    </Datalist>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-datalist")
    await expect(el).toBeTruthy()
  },
}
