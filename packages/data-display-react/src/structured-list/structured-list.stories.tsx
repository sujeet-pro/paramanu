import type { Meta, StoryObj } from "@storybook/react"
import { StructuredList, StructuredListHead, StructuredListBody, StructuredListRow, StructuredListCell, StructuredListHeaderCell } from "./structured-list.js"

const meta = {
  title: "Data Display/Structured List",
  component: StructuredList,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    selectable: { control: "boolean" },
    bordered: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<typeof StructuredList>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <StructuredList {...args}>
      <StructuredListHead>
        <StructuredListRow>
          <StructuredListHeaderCell>Name</StructuredListHeaderCell>
          <StructuredListHeaderCell>Value</StructuredListHeaderCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        <StructuredListRow>
          <StructuredListCell>CPU</StructuredListCell>
          <StructuredListCell>85%</StructuredListCell>
        </StructuredListRow>
        <StructuredListRow>
          <StructuredListCell>Memory</StructuredListCell>
          <StructuredListCell>4.2 GB</StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredList>
  ),
}

export const Selectable: Story = {
  args: { selectable: true },
  render: (args) => (
    <StructuredList {...args}>
      <StructuredListHead>
        <StructuredListRow>
          <StructuredListHeaderCell>Option</StructuredListHeaderCell>
          <StructuredListHeaderCell>Description</StructuredListHeaderCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        <StructuredListRow>
          <StructuredListCell>Plan A</StructuredListCell>
          <StructuredListCell>Basic tier</StructuredListCell>
        </StructuredListRow>
        <StructuredListRow>
          <StructuredListCell>Plan B</StructuredListCell>
          <StructuredListCell>Pro tier</StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredList>
  ),
}

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <StructuredList {...args}>
      <StructuredListBody>
        <StructuredListRow>
          <StructuredListCell>Item 1</StructuredListCell>
          <StructuredListCell>Value 1</StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredList>
  ),
}
