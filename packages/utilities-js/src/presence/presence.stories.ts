import type { Meta, StoryObj } from "@storybook/html-vite"
import { presenceClasses } from "./presence.classes.js"
import type { PresenceClassesOptions } from "./presence.types.js"

function createPresence(args: PresenceClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")

  const description = document.createElement("p")
  description.textContent = "Presence manages mount/unmount animation lifecycle."
  wrapper.appendChild(description)

  const el = document.createElement("div")
  el.className = presenceClasses(args)
  el.setAttribute("data-pm-presence", args.state ?? "entered")
  el.style.padding = "16px"
  el.style.background = "#e0ffe0"
  el.textContent = `State: ${args.state ?? "entered"}`
  wrapper.appendChild(el)

  return wrapper
}

const meta = {
  title: "Utilities/Presence",
  tags: ["autodocs", "beta"],
  render: (args) => createPresence(args as PresenceClassesOptions),
  argTypes: {
    state: {
      control: "select",
      options: ["entering", "entered", "exiting", "exited"],
    },
  },
  args: { state: "entered" },
} satisfies Meta<PresenceClassesOptions>

export default meta
type Story = StoryObj<PresenceClassesOptions>

export const Playground: Story = {}
export const Entering: Story = { args: { state: "entering" } }
export const Entered: Story = { args: { state: "entered" } }
export const Exiting: Story = { args: { state: "exiting" } }
export const Exited: Story = { args: { state: "exited" } }
