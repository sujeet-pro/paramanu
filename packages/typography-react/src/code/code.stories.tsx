import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Code } from "./code.js"

const meta = {
  title: "Typography/Code",
  tags: ["autodocs", "beta"],
  component: Code,
  argTypes: {
    block: { control: "boolean" },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outline"] },
    color: { control: "select", options: ["neutral", "primary", "danger", "success", "warning", "info"] },
    withLineNumbers: { control: "boolean" },
    withCopyBtn: { control: "boolean" },
    language: { control: "text" },
  },
  args: {},
} satisfies Meta<typeof Code>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <Code {...args}>const x = 42</Code>,
}

export const InlineCode: Story = {
  render: () => (
    <p>
      Use <Code>npm install</Code> to install dependencies.
    </p>
  ),
}

export const CodeBlock: Story = {
  render: () => (
    <Code block language="js">
      {`function greet(name) {\n  return "Hello, " + name\n}`}
    </Code>
  ),
}

export const WithLineNumbers: Story = {
  render: () => (
    <Code block withLineNumbers language="ts">
      {`const x: number = 42\nconst y: string = "hello"\nconsole.log(x, y)`}
    </Code>
  ),
}

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => <Code {...args}>variant: outline</Code>,
}

export const DangerColor: Story = {
  args: { color: "danger" },
  render: (args) => <Code {...args}>error: something went wrong</Code>,
}

export const ColorPrimary: Story = {
  args: { color: "primary" },
  render: (args) => <Code {...args}>primary color code</Code>,
}

export const ColorSuccess: Story = {
  args: { color: "success" },
  render: (args) => <Code {...args}>success: operation complete</Code>,
}

export const ColorWarning: Story = {
  args: { color: "warning" },
  render: (args) => <Code {...args}>warning: check input</Code>,
}

export const ColorInfo: Story = {
  args: { color: "info" },
  render: (args) => <Code {...args}>info: processing request</Code>,
}

export const SizeXs: Story = {
  args: { size: "xs" },
  render: (args) => <Code {...args}>extra small code</Code>,
}

export const SizeSm: Story = {
  args: { size: "sm" },
  render: (args) => <Code {...args}>small code</Code>,
}

export const SizeLg: Story = {
  args: { size: "lg" },
  render: (args) => <Code {...args}>large code</Code>,
}

export const BlockWithCopyBtn: Story = {
  render: () => (
    <Code block withCopyBtn>
      {`const greeting = "Hello, World!"`}
    </Code>
  ),
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => <Code {...args}>hover state</Code>,
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => <Code {...args}>focus visible state</Code>,
}

export const RenderTest: Story = {
  args: { children: "Test content" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}

export const SemanticHTML: Story = {
  render: () => <Code>semantic code element</Code>,
  play: async ({ canvasElement }) => {
    const code = canvasElement.querySelector("code")
    await expect(code).toBeTruthy()
  },
}
