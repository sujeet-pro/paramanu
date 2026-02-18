import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Stat, StatLabel, StatValue, StatHelpText } from "./stat.js"

const meta = {
  title: "Data Display/Stat",
  component: Stat,
  tags: ["autodocs", "stable"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    align: { control: "select", options: ["start", "center", "end"] },
  },
  args: { size: "md", align: "start" },
} satisfies Meta<typeof Stat>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Stat {...args}>
      <StatLabel>Total Revenue</StatLabel>
      <StatValue>$45,231</StatValue>
      <StatHelpText trend="up">+12.5% from last month</StatHelpText>
    </Stat>
  ),
}

export const TrendUp: Story = {
  render: () => (
    <Stat>
      <StatLabel>Users</StatLabel>
      <StatValue>2,340</StatValue>
      <StatHelpText trend="up">+15%</StatHelpText>
    </Stat>
  ),
}

export const TrendDown: Story = {
  render: () => (
    <Stat>
      <StatLabel>Bounce Rate</StatLabel>
      <StatValue>42.3%</StatValue>
      <StatHelpText trend="down">-3.1%</StatHelpText>
    </Stat>
  ),
}

export const Centered: Story = {
  args: { align: "center" },
  render: (args) => (
    <Stat {...args}>
      <StatLabel>Downloads</StatLabel>
      <StatValue>1.2M</StatValue>
    </Stat>
  ),
}

export const EndAligned: Story = {
  args: { align: "end" },
  render: (args) => (
    <Stat {...args}>
      <StatLabel>Revenue</StatLabel>
      <StatValue>$12,345</StatValue>
    </Stat>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Stat {...args}>
      <StatLabel>Sessions</StatLabel>
      <StatValue>842</StatValue>
    </Stat>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Stat {...args}>
      <StatLabel>Total Sales</StatLabel>
      <StatValue>$98,765</StatValue>
    </Stat>
  ),
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <Stat {...args}>
      <StatLabel>Metric</StatLabel>
      <StatValue>100</StatValue>
    </Stat>
  ),
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <Stat {...args}>
      <StatLabel>Metric</StatLabel>
      <StatValue>100</StatValue>
    </Stat>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <Stat>
      <StatLabel>Test</StatLabel>
      <StatValue>42</StatValue>
    </Stat>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-stat")
    await expect(el).toBeTruthy()
  },
}
