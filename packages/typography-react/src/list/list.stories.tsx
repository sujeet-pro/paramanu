import type { Meta, StoryObj } from "@storybook/react"
import { List } from "./list.js"

const meta = {
  title: "Typography/List",
  tags: ["autodocs"],
  component: List,
  argTypes: {
    type: { control: "select", options: ["ordered", "unordered"] },
    styleType: {
      control: "select",
      options: ["disc", "circle", "square", "decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"],
    },
    spacing: { control: "select", options: ["sm", "md", "lg"] },
    unstyled: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

const items = (
  <>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
    <li>Fourth item</li>
  </>
)

export const Playground: Story = {
  render: (args) => <List {...args}>{items}</List>,
}

export const Ordered: Story = {
  args: { type: "ordered" },
  render: (args) => <List {...args}>{items}</List>,
}

export const Square: Story = {
  args: { styleType: "square" },
  render: (args) => <List {...args}>{items}</List>,
}

export const LargeSpacing: Story = {
  args: { spacing: "lg" },
  render: (args) => <List {...args}>{items}</List>,
}

export const Unstyled: Story = {
  args: { unstyled: true },
  render: (args) => <List {...args}>{items}</List>,
}

export const LowerRoman: Story = {
  args: { type: "ordered", styleType: "lower-roman" },
  render: (args) => <List {...args}>{items}</List>,
}
