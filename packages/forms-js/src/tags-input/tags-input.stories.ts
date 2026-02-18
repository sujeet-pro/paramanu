import type { Meta, StoryObj } from "@storybook/html"
import { tagsInputClasses } from "./tags-input.classes.js"
import type { TagsInputClassesOptions } from "./tags-input.types.js"

interface TagsInputArgs extends TagsInputClassesOptions {
  tags: string[]
}

function createTagsInput(args: TagsInputArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = tagsInputClasses({
    variant: args.variant,
    size: args.size,
    disabled: args.disabled,
    invalid: args.invalid,
  })
  wrapper.setAttribute("role", "group")
  if (args.disabled) wrapper.setAttribute("aria-disabled", "true")
  if (args.invalid) wrapper.setAttribute("aria-invalid", "true")

  const tags = args.tags || ["React", "Vue"]
  tags.forEach((tag) => {
    const span = document.createElement("span")
    span.className = "pm-tag"
    span.textContent = tag
    wrapper.appendChild(span)
  })

  const input = document.createElement("input")
  input.className = `pm-input pm-input--${args.variant || "outline"} pm-input--${args.size || "md"}`
  input.placeholder = "Add tag..."
  if (args.disabled) input.disabled = true
  wrapper.appendChild(input)

  return wrapper
}

const meta = {
  title: "Forms/Tags Input",
  tags: ["autodocs"],
  render: (args) => createTagsInput(args as TagsInputArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "unstyled"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
  args: {
    variant: "outline",
    size: "md",
    tags: ["React", "Vue"],
  },
} satisfies Meta<TagsInputArgs>

export default meta
type Story = StoryObj<TagsInputArgs>

export const Playground: Story = {}

export const Outline: Story = {
  args: { variant: "outline", tags: ["Tag 1"] },
}

export const Filled: Story = {
  args: { variant: "filled", tags: ["Tag 1"] },
}

export const Small: Story = {
  args: { size: "sm", tags: ["Small"] },
}

export const Disabled: Story = {
  args: { disabled: true, tags: ["Disabled"] },
}

export const Invalid: Story = {
  args: { invalid: true, tags: ["Invalid"] },
}
