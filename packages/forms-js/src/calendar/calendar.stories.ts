import type { Meta, StoryObj } from "@storybook/html-vite"
import { calendarClasses } from "./calendar.classes.js"
import type { CalendarClassesOptions } from "./calendar.types.js"

type CalendarArgs = CalendarClassesOptions

function createCalendar(args: CalendarArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = calendarClasses(args)
  wrapper.setAttribute("role", "grid")
  wrapper.setAttribute("aria-label", "Calendar")
  wrapper.textContent = "Calendar content"
  return wrapper
}

const meta = {
  title: "Forms/Calendar",
  tags: ["autodocs", "stable"],
  render: (args) => createCalendar(args as CalendarArgs),
  argTypes: { size: { control: "select", options: ["xs", "sm", "md", "lg"] } },
  args: { size: "md" },
} satisfies Meta<CalendarArgs>

export default meta
type Story = StoryObj<CalendarArgs>

export const Playground: Story = {}
export const ExtraSmall: Story = { args: { size: "xs" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
