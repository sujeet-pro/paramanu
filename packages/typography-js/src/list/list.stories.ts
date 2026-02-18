import type { Meta, StoryObj } from "@storybook/html-vite"
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
  tags: ["autodocs", "stable"],
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
export const Disc: Story = { args: { styleType: "disc" } }
export const Circle: Story = { args: { styleType: "circle" } }
export const Square: Story = { args: { styleType: "square" } }
export const Decimal: Story = { args: { type: "ordered", styleType: "decimal" } }
export const LowerAlpha: Story = { args: { type: "ordered", styleType: "lower-alpha" } }
export const UpperAlpha: Story = { args: { type: "ordered", styleType: "upper-alpha" } }
export const LowerRoman: Story = { args: { type: "ordered", styleType: "lower-roman" } }
export const UpperRoman: Story = { args: { type: "ordered", styleType: "upper-roman" } }
export const SmallSpacing: Story = { args: { spacing: "sm" } }
export const LargeSpacing: Story = { args: { spacing: "lg" } }
export const Unstyled: Story = { args: { unstyled: true } }
