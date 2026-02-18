import type { Meta, StoryObj } from "@storybook/react"
import { Stat, StatLabel, StatValue, StatHelpText } from "./stat.js"

const meta = {
  title: "Data Display/Stat",
  component: Stat,
  tags: ["autodocs"],
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

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Stat {...args}>
      <StatLabel>Sessions</StatLabel>
      <StatValue>842</StatValue>
    </Stat>
  ),
}
