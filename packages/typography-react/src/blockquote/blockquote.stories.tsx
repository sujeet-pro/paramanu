import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Blockquote } from "./blockquote.js"

const meta = {
  title: "Typography/Blockquote",
  tags: ["autodocs", "beta"],
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

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => <Blockquote {...args}>A large blockquote.</Blockquote>,
}

export const ColorNeutral: Story = {
  args: { color: "neutral" },
  render: (args) => <Blockquote {...args}>A neutral-colored blockquote.</Blockquote>,
}

export const ColorDanger: Story = {
  args: { color: "danger" },
  render: (args) => <Blockquote {...args}>A danger-colored blockquote.</Blockquote>,
}

export const ColorSuccess: Story = {
  args: { color: "success" },
  render: (args) => <Blockquote {...args}>A success-colored blockquote.</Blockquote>,
}

export const ColorWarning: Story = {
  args: { color: "warning" },
  render: (args) => <Blockquote {...args}>A warning-colored blockquote.</Blockquote>,
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => <Blockquote {...args}>Hover state blockquote.</Blockquote>,
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => <Blockquote {...args}>Focus visible blockquote.</Blockquote>,
}

export const RenderTest: Story = {
  args: { children: "Test content" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}

export const SemanticHTML: Story = {
  render: () => <Blockquote>Semantic blockquote element.</Blockquote>,
  play: async ({ canvasElement }) => {
    const blockquote = canvasElement.querySelector("blockquote")
    await expect(blockquote).toBeTruthy()
  },
}
