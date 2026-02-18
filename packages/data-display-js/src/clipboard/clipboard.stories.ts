import type { Meta, StoryObj } from "@storybook/html"
import { clipboardClasses } from "./clipboard.classes.js"
import type { ClipboardClassesOptions } from "./clipboard.types.js"

interface ClipboardArgs extends ClipboardClassesOptions {
  value: string
}

function createClipboard(args: ClipboardArgs): HTMLElement {
  const cls = clipboardClasses({ size: args.size, copied: args.copied })
  const btn = document.createElement("button")
  btn.type = "button"
  btn.className = cls
  btn.textContent = args.copied ? "Copied!" : "Copy"
  btn.setAttribute("aria-label", args.copied ? "Copied" : "Copy to clipboard")
  btn.addEventListener("click", () => {
    if (args.value) navigator.clipboard?.writeText(args.value)
  })
  return btn
}

const meta = {
  title: "Data Display/Clipboard",
  tags: ["autodocs"],
  render: (args) => createClipboard(args as ClipboardArgs),
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    copied: { control: "boolean" },
    value: { control: "text" },
  },
  args: { size: "md", value: "npm install @paramanu/data-display-js", copied: false },
} satisfies Meta<ClipboardArgs>

export default meta
type Story = StoryObj<ClipboardArgs>

export const Playground: Story = {}
export const CopiedState: Story = { args: { copied: true } }
export const Small: Story = { args: { size: "sm" } }
