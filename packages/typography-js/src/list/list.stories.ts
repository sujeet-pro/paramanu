import type { Meta, StoryObj } from "@storybook/html"
import { listClasses } from "./list.classes.js"
import type { ListClassesOptions } from "./list.types.js"

function createList(args: ListClassesOptions): HTMLElement {
  const tag = args.type === "ordered" ? "ol" : "ul"
  const el = document.createElement(tag)
  el.className = listClasses(args)
  ;["First item", "Second item", "Third item", "Fourth item"].forEach((text) => {
    const li = document.createElement("li")
    li.textContent = text
    el.appendChild(li)
  })
  return el
}

const meta = {
  title: "Typography/List",
  tags: ["autodocs"],
  render: (args) => createList(args as ListClassesOptions),
  argTypes: {
    type: { control: "select", options: ["ordered", "unordered"] },
    styleType: {
      control: "select",
      options: ["disc", "circle", "square", "decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"],
    },
    spacing: { control: "select", options: ["sm", "md", "lg"] },
    unstyled: { control: "boolean" },
  },
  args: {},
} satisfies Meta<ListClassesOptions>

export default meta
type Story = StoryObj<ListClassesOptions>

export const Playground: Story = {}
export const Ordered: Story = { args: { type: "ordered" } }
export const Square: Story = { args: { styleType: "square" } }
export const LargeSpacing: Story = { args: { spacing: "lg" } }
export const Unstyled: Story = { args: { unstyled: true } }
