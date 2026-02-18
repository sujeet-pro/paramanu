import type { Meta, StoryObj } from "@storybook/react"
import { Heading } from "./heading.js"

const meta = {
  title: "Typography/Heading",
  tags: ["autodocs"],
  component: Heading,
  argTypes: {
    level: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] },
    weight: { control: "select", options: ["normal", "medium", "semibold", "bold"] },
    align: { control: "select", options: ["left", "center", "right"] },
    lineHeight: { control: "select", options: ["tight", "normal", "relaxed"] },
    color: {
      control: "select",
      options: ["default", "muted", "dimmed", "primary", "danger", "success", "warning", "info"],
    },
    truncate: { control: "boolean" },
  },
  args: { level: 2 },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <Heading {...args}>Section Heading</Heading>,
}

export const Levels: Story = {
  render: () => (
    <div>
      {([1, 2, 3, 4, 5, 6] as const).map((lvl) => (
        <Heading key={lvl} level={lvl}>
          Heading Level {lvl}
        </Heading>
      ))}
    </div>
  ),
}

export const CustomSize: Story = {
  render: () => (
    <Heading level={3} size="3xl">
      H3 with 3xl size
    </Heading>
  ),
}

export const Centered: Story = {
  args: { align: "center" },
  render: (args) => <Heading {...args}>Centered Heading</Heading>,
}

export const Primary: Story = {
  args: { color: "primary" },
  render: (args) => <Heading {...args}>Primary Heading</Heading>,
}

export const TruncatedHeading: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <Heading level={3} truncate>
        This heading is very long and should be truncated
      </Heading>
    </div>
  ),
}
