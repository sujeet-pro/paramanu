import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Truncate } from "./truncate.js"

const meta = {
  title: "Typography/Truncate",
  tags: ["autodocs", "stable"],
  component: Truncate,
  argTypes: {
    lines: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    position: { control: "select", options: ["end", "start", "middle"] },
    as: { control: "select", options: ["div", "span", "p"] },
  },
  args: { lines: 1 },
} satisfies Meta<typeof Truncate>

export default meta
type Story = StoryObj<typeof meta>

const longText =
  "This is a very long text that is meant to demonstrate the truncation behavior of the Truncate component. It should overflow and be cut off with an ellipsis when the container is too narrow to display the full content."

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 300 }}>
      <Truncate {...args}>{longText}</Truncate>
    </div>
  ),
}

export const SingleLine: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Truncate lines={1}>{longText}</Truncate>
    </div>
  ),
}

export const MultiLine: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Truncate lines={3}>{longText}</Truncate>
    </div>
  ),
}

export const StartPosition: Story = {
  args: { position: "start" },
  render: (args) => (
    <div style={{ width: 300 }}>
      <Truncate {...args}>{longText}</Truncate>
    </div>
  ),
}

export const MiddlePosition: Story = {
  args: { position: "middle" },
  render: (args) => (
    <div style={{ width: 300 }}>
      <Truncate {...args}>{longText}</Truncate>
    </div>
  ),
}

export const TwoLines: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Truncate lines={2}>{longText}</Truncate>
    </div>
  ),
}

export const FourLines: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Truncate lines={4}>{longText}</Truncate>
    </div>
  ),
}

export const FiveLines: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Truncate lines={5}>{longText}</Truncate>
    </div>
  ),
}

export const SixLines: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Truncate lines={6}>{longText}</Truncate>
    </div>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Truncate>Test content</Truncate>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}
