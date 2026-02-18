import type { Meta, StoryObj } from "@storybook/react"
import { AvatarGroup } from "./avatar-group.js"
import { Avatar } from "../avatar/avatar.js"

const meta = {
  title: "Data Display/Avatar Group",
  component: AvatarGroup,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    spacing: { control: "select", options: ["tight", "normal"] },
    max: { control: "number" },
  },
  args: { size: "md", spacing: "normal" },
} satisfies Meta<typeof AvatarGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar name="Alice Johnson" />
      <Avatar name="Bob Smith" />
      <Avatar name="Carol White" />
    </AvatarGroup>
  ),
}

export const WithMax: Story = {
  args: { max: 2 },
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar name="Alice Johnson" />
      <Avatar name="Bob Smith" />
      <Avatar name="Carol White" />
      <Avatar name="David Brown" />
    </AvatarGroup>
  ),
}

export const Tight: Story = {
  args: { spacing: "tight" },
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Carol" />
    </AvatarGroup>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
    </AvatarGroup>
  ),
}
