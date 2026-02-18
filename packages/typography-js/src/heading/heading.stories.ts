import type { Meta, StoryObj } from "@storybook/html"
import { headingClasses } from "./heading.classes.js"
import type { HeadingClassesOptions } from "./heading.types.js"

function createHeading(args: HeadingClassesOptions): HTMLElement {
  const level = args.level ?? 2
  const el = document.createElement(`h${level}`)
  el.className = headingClasses(args)
  el.textContent = "Section Heading"
  return el
}

const meta = {
  title: "Typography/Heading",
  tags: ["autodocs"],
  render: (args) => createHeading(args as HeadingClassesOptions),
  argTypes: {
    level: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] },
    weight: { control: "select", options: ["normal", "medium", "semibold", "bold"] },
    align: { control: "select", options: ["left", "center", "right"] },
    color: {
      control: "select",
      options: ["default", "muted", "dimmed", "primary", "danger", "success", "warning", "info"],
    },
    truncate: { control: "boolean" },
  },
  args: { level: 2 },
} satisfies Meta<HeadingClassesOptions>

export default meta
type Story = StoryObj<HeadingClassesOptions>

export const Playground: Story = {}
export const H1: Story = { args: { level: 1 } }
export const H3: Story = { args: { level: 3 } }
export const Centered: Story = { args: { align: "center" } }
export const Primary: Story = { args: { color: "primary" } }
