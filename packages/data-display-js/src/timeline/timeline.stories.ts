import type { Meta, StoryObj } from "@storybook/html-vite"
import { timelineClasses } from "./timeline.classes.js"
import type { TimelineClassesOptions } from "./timeline.types.js"

function createTimeline(args: TimelineClassesOptions): HTMLElement {
  const cls = timelineClasses(args)
  const ol = document.createElement("ol")
  ol.className = cls.root

  for (const text of ["First event", "Second event", "Third event"]) {
    const li = document.createElement("li")
    li.className = cls.item
    const dot = document.createElement("span")
    dot.className = cls.dot
    const connector = document.createElement("span")
    connector.className = cls.connector
    const content = document.createElement("div")
    content.className = cls.content
    content.textContent = text
    li.appendChild(dot)
    li.appendChild(connector)
    li.appendChild(content)
    ol.appendChild(li)
  }

  return ol
}

const meta = {
  title: "Data Display/Timeline",
  tags: ["autodocs", "beta"],
  render: (args) => createTimeline(args as TimelineClassesOptions),
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    align: { control: "select", options: ["start", "center", "alternate"] },
  },
  args: { orientation: "vertical", align: "start" },
} satisfies Meta<TimelineClassesOptions>

export default meta
type Story = StoryObj<TimelineClassesOptions>

export const Playground: Story = {}
export const Centered: Story = { args: { align: "center" } }
export const Alternate: Story = { args: { align: "alternate" } }
export const Horizontal: Story = { args: { orientation: "horizontal" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
