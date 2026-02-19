import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { AvatarGrp } from "./avatar-group.js"
import { Avatar } from "../avatar/avatar.js"

const meta = {
  title: "Data Display/Avatar Group",
  component: AvatarGrp,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    spacing: { control: "select", options: ["tight", "normal"] },
    max: { control: "number" },
  },
  args: { size: "md", spacing: "normal" },
} satisfies Meta<typeof AvatarGrp>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <AvatarGrp {...args}>
      <Avatar name="Alice Johnson" />
      <Avatar name="Bob Smith" />
      <Avatar name="Carol White" />
    </AvatarGrp>
  ),
}

export const WithMax: Story = {
  args: { max: 2 },
  render: (args) => (
    <AvatarGrp {...args}>
      <Avatar name="Alice Johnson" />
      <Avatar name="Bob Smith" />
      <Avatar name="Carol White" />
      <Avatar name="David Brown" />
    </AvatarGrp>
  ),
}

export const Tight: Story = {
  args: { spacing: "tight" },
  render: (args) => (
    <AvatarGrp {...args}>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Carol" />
    </AvatarGrp>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <AvatarGrp {...args}>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
    </AvatarGrp>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <AvatarGrp {...args}>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Carol" />
    </AvatarGrp>
  ),
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <AvatarGrp {...args}>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
    </AvatarGrp>
  ),
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <AvatarGrp {...args}>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
    </AvatarGrp>
  ),
}

export const RenderTest: Story = {
  render: () => (
    <AvatarGrp>
      <Avatar name="Test" />
    </AvatarGrp>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-avatar-grp")
    await expect(el).toBeTruthy()
  },
}
