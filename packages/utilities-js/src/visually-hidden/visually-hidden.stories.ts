import type { Meta, StoryObj } from "@storybook/html-vite"
import { srOnlyClasses } from "./visually-hidden.classes.js"
import type { SrOnlyClassesOptions } from "./visually-hidden.types.js"

function createSrOnly(args: SrOnlyClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")

  const label = document.createElement("p")
  label.textContent = "The hidden text below is only visible to screen readers:"
  wrapper.appendChild(label)

  const hidden = document.createElement("span")
  hidden.className = srOnlyClasses(args)
  hidden.textContent = "This text is visually hidden"
  wrapper.appendChild(hidden)

  return wrapper
}

const meta = {
  title: "Utilities/SrOnly",
  tags: ["autodocs", "beta"],
  render: (args) => createSrOnly(args as SrOnlyClassesOptions),
  argTypes: {
    focusable: { control: "boolean" },
  },
  args: {},
} satisfies Meta<SrOnlyClassesOptions>

export default meta
type Story = StoryObj<SrOnlyClassesOptions>

export const Playground: Story = {}
export const Focusable: Story = { args: { focusable: true } }
