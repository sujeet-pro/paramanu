import type { Meta, StoryObj } from "@storybook/react"
import { Timeline, TimelineItem, TimelineDot, TimelineConnector, TimelineContent, TimelineOpposite } from "./timeline.js"

const meta = {
  title: "Data Display/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    align: { control: "select", options: ["start", "center", "alternate"] },
  },
  args: { orientation: "vertical", align: "start" },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Timeline {...args}>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>First event</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot color="success" />
        <TimelineConnector />
        <TimelineContent>Second event</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot color="danger" />
        <TimelineContent>Third event</TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
}

export const Centered: Story = {
  args: { align: "center" },
  render: (args) => (
    <Timeline {...args}>
      <TimelineItem>
        <TimelineOpposite>Jan 2024</TimelineOpposite>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>Project started</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOpposite>Mar 2024</TimelineOpposite>
        <TimelineDot color="success" />
        <TimelineContent>Beta released</TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
}

export const Alternate: Story = {
  args: { align: "alternate" },
  render: (args) => (
    <Timeline {...args}>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>Left event</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>Right event</TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
}

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <Timeline {...args}>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>Step 1</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>Step 2</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>Step 3</TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
}
