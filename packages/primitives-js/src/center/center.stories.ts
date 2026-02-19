import type { Meta, StoryObj } from "@storybook/html-vite"
import { centerClasses } from "./center.classes.js"
import type { CenterClassesOptions } from "./center.types.js"

function createCenter(args: CenterClassesOptions): HTMLElement {
  const el = document.createElement("div")
  el.className = centerClasses(args)
  el.style.height = "200px"
  el.style.border = "1px dashed #ccc"
  const child = document.createElement("div")
  child.style.background = "#e2e8f0"
  child.style.padding = "16px"
  child.textContent = "Centered content"
  el.appendChild(child)
  return el
}

const meta = {
  title: "Primitives/Center",
  tags: ["autodocs", "beta"],
  render: (args) => createCenter(args as CenterClassesOptions),
  argTypes: {
    inline: { control: "boolean" },
    textCenter: { control: "boolean" },
  },
  args: {},
} satisfies Meta<CenterClassesOptions>

export default meta
type Story = StoryObj<CenterClassesOptions>

export const Playground: Story = {}
export const Inline: Story = { args: { inline: true } }
export const WithTextCenter: Story = { args: { textCenter: true } }
export const InlineWithTextCenter: Story = { args: { inline: true, textCenter: true } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
