import type { Meta, StoryObj } from "@storybook/html-vite"
import { proseClasses } from "./prose.classes.js"
import type { ProseClassesOptions } from "./prose.types.js"

function createProse(args: ProseClassesOptions): HTMLElement {
  const el = document.createElement("div")
  el.className = proseClasses(args)
  el.innerHTML = `
    <h2>Article Title</h2>
    <p>This is a prose container that applies typographic styles to child HTML elements.</p>
    <ul><li>First item</li><li>Second item</li><li>Third item</li></ul>
    <p>Another paragraph with more content.</p>
  `
  return el
}

const meta = {
  title: "Typography/Prose",
  tags: ["autodocs", "stable"],
  render: (args) => createProse(args as ProseClassesOptions),
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "select", options: ["default", "muted"] },
    trimMargins: { control: "boolean" },
  },
  args: {},
} satisfies Meta<ProseClassesOptions>

export default meta
type Story = StoryObj<ProseClassesOptions>

export const Playground: Story = {}
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const Muted: Story = { args: { color: "muted" } }
export const TrimmedMargins: Story = { args: { trimMargins: true } }
