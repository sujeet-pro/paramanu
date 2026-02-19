import type { Meta, StoryObj } from "@storybook/html-vite"
import { codeClasses } from "./code.classes.js"
import type { CodeClassesOptions } from "./code.types.js"

function createCode(args: CodeClassesOptions): HTMLElement {
  if (args.block) {
    const pre = document.createElement("pre")
    pre.className = codeClasses(args)
    const code = document.createElement("code")
    code.textContent = 'function greet(name) {\n  return "Hello, " + name\n}'
    pre.appendChild(code)
    return pre
  }
  const el = document.createElement("code")
  el.className = codeClasses(args)
  el.textContent = "const x = 42"
  return el
}

const meta = {
  title: "Typography/Code",
  tags: ["autodocs", "beta"],
  render: (args) => createCode(args as CodeClassesOptions),
  argTypes: {
    block: { control: "boolean" },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outline"] },
    color: { control: "select", options: ["neutral", "primary", "danger", "success", "warning", "info"] },
    withLineNumbers: { control: "boolean" },
    withCopyBtn: { control: "boolean" },
  },
  args: {},
} satisfies Meta<CodeClassesOptions>

export default meta
type Story = StoryObj<CodeClassesOptions>

export const Playground: Story = {}
export const Block: Story = { args: { block: true } }
export const BlockWithLineNumbers: Story = { args: { block: true, withLineNumbers: true } }
export const BlockWithCopyBtn: Story = { args: { block: true, withCopyBtn: true } }
export const Outline: Story = { args: { variant: "outline" } }
export const SizeXs: Story = { args: { size: "xs" } }
export const SizeSm: Story = { args: { size: "sm" } }
export const SizeLg: Story = { args: { size: "lg" } }
export const ColorPrimary: Story = { args: { color: "primary" } }
export const Danger: Story = { args: { color: "danger" } }
export const ColorSuccess: Story = { args: { color: "success" } }
export const ColorWarning: Story = { args: { color: "warning" } }
export const ColorInfo: Story = { args: { color: "info" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
