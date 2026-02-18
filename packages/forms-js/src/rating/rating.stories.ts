import type { Meta, StoryObj } from "@storybook/html"
import { ratingClasses } from "./rating.classes.js"
import type { RatingClassesOptions } from "./rating.types.js"

type RatingArgs = RatingClassesOptions

function createRating(args: RatingArgs): HTMLElement {
  const el = document.createElement("div")
  el.className = ratingClasses(args)
  el.role = "radiogroup"
  el.setAttribute("aria-label", "Rating")
  if (args.disabled) el.setAttribute("aria-disabled", "true")
  return el
}

const meta = {
  title: "Forms/Rating",
  tags: ["autodocs"],
  render: (args) => createRating(args as RatingArgs),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<RatingArgs>

export default meta
type Story = StoryObj<RatingArgs>

export const Playground: Story = {}
export const ReadOnly: Story = { args: { readOnly: true } }
export const Disabled: Story = { args: { disabled: true } }
