import type { Meta, StoryObj } from "@storybook/html-vite"
import { showHideClasses } from "./show-hide.classes.js"
import type { ShowHideClassesOptions } from "./show-hide.types.js"

function createShowHide(args: ShowHideClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")

  const el = document.createElement("div")
  el.className = showHideClasses(args)
  el.style.padding = "16px"
  el.style.background = "#f0f0ff"
  el.textContent = "Togglable content"
  wrapper.appendChild(el)

  return wrapper
}

const meta = {
  title: "Utilities/ShowHide",
  tags: ["autodocs", "stable"],
  render: (args) => createShowHide(args as ShowHideClassesOptions),
  argTypes: {
    display: { control: "select", options: ["show", "hide"] },
  },
  args: { display: "show" },
} satisfies Meta<ShowHideClassesOptions>

export default meta
type Story = StoryObj<ShowHideClassesOptions>

export const Playground: Story = {}
export const Hidden: Story = { args: { display: "hide" } }
