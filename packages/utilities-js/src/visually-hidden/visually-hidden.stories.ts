import type { Meta, StoryObj } from "@storybook/html"
import { visuallyHiddenClasses } from "./visually-hidden.classes.js"
import type { VisuallyHiddenClassesOptions } from "./visually-hidden.types.js"

function createVisuallyHidden(args: VisuallyHiddenClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")

  const label = document.createElement("p")
  label.textContent = "The hidden text below is only visible to screen readers:"
  wrapper.appendChild(label)

  const hidden = document.createElement("span")
  hidden.className = visuallyHiddenClasses(args)
  hidden.textContent = "This text is visually hidden"
  wrapper.appendChild(hidden)

  return wrapper
}

const meta = {
  title: "Utilities/VisuallyHidden",
  tags: ["autodocs"],
  render: (args) => createVisuallyHidden(args as VisuallyHiddenClassesOptions),
  argTypes: {
    focusable: { control: "boolean" },
  },
  args: {},
} satisfies Meta<VisuallyHiddenClassesOptions>

export default meta
type Story = StoryObj<VisuallyHiddenClassesOptions>

export const Playground: Story = {}
export const Focusable: Story = { args: { focusable: true } }
