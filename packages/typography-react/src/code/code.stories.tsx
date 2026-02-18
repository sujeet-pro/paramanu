import type { Meta, StoryObj } from "@storybook/react"
import { Code } from "./code.js"

const meta = {
  title: "Typography/Code",
  tags: ["autodocs"],
  component: Code,
  argTypes: {
    block: { control: "boolean" },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outline"] },
    color: { control: "select", options: ["neutral", "primary", "danger", "success", "warning", "info"] },
    withLineNumbers: { control: "boolean" },
    withCopyButton: { control: "boolean" },
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
