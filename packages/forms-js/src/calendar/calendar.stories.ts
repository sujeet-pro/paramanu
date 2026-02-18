import type { Meta, StoryObj } from "@storybook/html"
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
  tags: ["autodocs"],
  render: (args) => createCalendar(args as CalendarArgs),
  argTypes: { size: { control: "select", options: ["xs", "sm", "md", "lg"] } },
  args: { size: "md" },
} satisfies Meta<CalendarArgs>

export default meta
type Story = StoryObj<CalendarArgs>

export const Playground: Story = {}
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
