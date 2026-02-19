import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import {
  StructList,
  StructListHead,
  StructListBody,
  StructListRow,
  StructListCell,
  StructListHeaderCell,
} from "./structured-list.js"

const meta = {
  title: "Data Display/Structured List",
  component: StructList,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    selectable: { control: "boolean" },
    bordered: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<typeof StructList>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <StructList {...args}>
      <StructListHead>
        <StructListRow>
          <StructListHeaderCell>Name</StructListHeaderCell>
          <StructListHeaderCell>Value</StructListHeaderCell>
        </StructListRow>
      </StructListHead>
      <StructListBody>
        <StructListRow>
          <StructListCell>CPU</StructListCell>
          <StructListCell>85%</StructListCell>
        </StructListRow>
        <StructListRow>
          <StructListCell>Memory</StructListCell>
          <StructListCell>4.2 GB</StructListCell>
        </StructListRow>
      </StructListBody>
    </StructList>
  ),
}

export const Selectable: Story = {
  args: { selectable: true },
  render: (args) => (
    <StructList {...args}>
      <StructListHead>
        <StructListRow>
          <StructListHeaderCell>Option</StructListHeaderCell>
          <StructListHeaderCell>Description</StructListHeaderCell>
        </StructListRow>
      </StructListHead>
      <StructListBody>
        <StructListRow>
          <StructListCell>Plan A</StructListCell>
          <StructListCell>Basic tier</StructListCell>
        </StructListRow>
        <StructListRow>
          <StructListCell>Plan B</StructListCell>
          <StructListCell>Pro tier</StructListCell>
        </StructListRow>
      </StructListBody>
    </StructList>
  ),
}

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <StructList {...args}>
      <StructListBody>
        <StructListRow>
          <StructListCell>Item 1</StructListCell>
          <StructListCell>Value 1</StructListCell>
        </StructListRow>
      </StructListBody>
    </StructList>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <StructList {...args}>
      <StructListBody>
        <StructListRow>
          <StructListCell>Compact</StructListCell>
          <StructListCell>Row</StructListCell>
        </StructListRow>
      </StructListBody>
    </StructList>
  ),
}

export const Hover: Story = {
  args: { selectable: true },
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <StructList {...args}>
      <StructListBody>
        <StructListRow>
          <StructListCell>Hover</StructListCell>
          <StructListCell>Row</StructListCell>
        </StructListRow>
      </StructListBody>
    </StructList>
  ),
}

export const FocusVisible: Story = {
  args: { selectable: true },
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <StructList {...args}>
      <StructListBody>
        <StructListRow>
          <StructListCell>Focus</StructListCell>
          <StructListCell>Row</StructListCell>
        </StructListRow>
      </StructListBody>
    </StructList>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <StructList>
      <StructListBody>
        <StructListRow>
          <StructListCell>Test</StructListCell>
        </StructListRow>
      </StructListBody>
    </StructList>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-struct-list")
    await expect(el).toBeTruthy()
  },
}
