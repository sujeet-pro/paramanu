import type { Meta, StoryObj } from "@storybook/html"
import { mentionsClasses } from "./mentions.classes.js"
import type { MentionsClassesOptions } from "./mentions.types.js"

type MentionsArgs = MentionsClassesOptions

function createMentions(args: MentionsArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = mentionsClasses({
    variant: args.variant,
    size: args.size,
    invalid: args.invalid,
    disabled: args.disabled,
  })
  if (args.disabled) wrapper.setAttribute("aria-disabled", "true")

  const textarea = document.createElement("textarea")
  textarea.className = `pm-input pm-input--${args.variant || "outline"} pm-input--${args.size || "md"}`
  textarea.placeholder = "Type @ to mention someone..."
  textarea.rows = 3
  if (args.disabled) {
    textarea.disabled = true
    textarea.setAttribute("aria-disabled", "true")
  }
  if (args.invalid) textarea.setAttribute("aria-invalid", "true")

  wrapper.appendChild(textarea)
  return wrapper
}

const meta = {
  title: "Forms/Mentions",
  tags: ["autodocs"],
  render: (args) => createMentions(args as MentionsArgs),
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
  },
} satisfies Meta<MentionsArgs>

export default meta
type Story = StoryObj<MentionsArgs>

export const Playground: Story = {}

export const Outline: Story = {
  args: { variant: "outline" },
}

export const Filled: Story = {
  args: { variant: "filled" },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Invalid: Story = {
  args: { invalid: true },
}
