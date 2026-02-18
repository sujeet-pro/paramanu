import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { List } from "./list.js"

const meta = {
  title: "Typography/List",
  tags: ["autodocs", "stable"],
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

export const UpperRoman: Story = {
  args: { type: "ordered", styleType: "upper-roman" },
  render: (args) => <List {...args}>{items}</List>,
}

export const LowerAlpha: Story = {
  args: { type: "ordered", styleType: "lower-alpha" },
  render: (args) => <List {...args}>{items}</List>,
}

export const UpperAlpha: Story = {
  args: { type: "ordered", styleType: "upper-alpha" },
  render: (args) => <List {...args}>{items}</List>,
}

export const SmallSpacing: Story = {
  args: { spacing: "sm" },
  render: (args) => <List {...args}>{items}</List>,
}

export const RenderTest: Story = {
  render: () => (
    <List>
      <li>Test content</li>
    </List>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}

export const SemanticHTML: Story = {
  render: () => (
    <List>
      <li>Item</li>
    </List>
  ),
  play: async ({ canvasElement }) => {
    const ul = canvasElement.querySelector("ul")
    await expect(ul).toBeTruthy()
  },
}

export const SemanticOrderedHTML: Story = {
  render: () => (
    <List type="ordered">
      <li>Item</li>
    </List>
  ),
  play: async ({ canvasElement }) => {
    const ol = canvasElement.querySelector("ol")
    await expect(ol).toBeTruthy()
  },
}
