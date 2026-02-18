import type { Meta, StoryObj } from "@storybook/react"
import { Blockquote } from "./blockquote.js"

const meta = {
  title: "Typography/Blockquote",
  tags: ["autodocs"],
  component: Blockquote,
  argTypes: {
    variant: { control: "select", options: ["default", "accent", "filled"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "select", options: ["primary", "neutral", "danger", "success", "warning", "info"] },
    withCite: { control: "boolean" },
    withIcon: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof Blockquote>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Blockquote {...args}>Life is what happens when you are busy making other plans.</Blockquote>
  ),
}

export const WithCitation: Story = {
  render: () => (
    <Blockquote cite="John Lennon" citeUrl="https://example.com">
      Life is what happens when you are busy making other plans.
    </Blockquote>
  ),
}

export const Accent: Story = {
  args: { variant: "accent", color: "primary" },
  render: (args) => <Blockquote {...args}>An accent-styled blockquote.</Blockquote>,
}

export const Filled: Story = {
  args: { variant: "filled", color: "info" },
  render: (args) => <Blockquote {...args}>A filled blockquote with info color.</Blockquote>,
}

export const WithIcon: Story = {
  args: { withIcon: true },
  render: (args) => <Blockquote {...args}>A blockquote with a decorative quote icon.</Blockquote>,
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => <Blockquote {...args}>A small blockquote.</Blockquote>,
}
