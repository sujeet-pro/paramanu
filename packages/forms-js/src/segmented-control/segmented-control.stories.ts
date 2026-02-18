import type { Meta, StoryObj } from "@storybook/html-vite"
import { segmentedControlClasses } from "./segmented-control.classes.js"
import type { SegmentedControlClassesOptions } from "./segmented-control.types.js"

type SegmentedControlArgs = SegmentedControlClassesOptions & {
  items: string[]
}

function createSegmentedControl(args: SegmentedControlArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = segmentedControlClasses({
    size: args.size,
    fullWidth: args.fullWidth,
  })
  wrapper.setAttribute("role", "radiogroup")

  const items = args.items || ["Day", "Week", "Month"]
  items.forEach((item, i) => {
    const button = document.createElement("button")
    button.type = "button"
    button.className = "pm-segmented-control__item"
    button.textContent = item
    if (i === 0) button.setAttribute("aria-pressed", "true")
    wrapper.appendChild(button)
  })

  return wrapper
}

const meta = {
  title: "Forms/Segmented Control",
  tags: ["autodocs", "stable"],
  render: (args) => createSegmentedControl(args as SegmentedControlArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    fullWidth: { control: "boolean" },
  },
  args: {
    size: "md",
    items: ["Day", "Week", "Month"],
  },
} satisfies Meta<SegmentedControlArgs>

export default meta
type Story = StoryObj<SegmentedControlArgs>

export const Playground: Story = {}

export const Small: Story = {
  args: { size: "sm", items: ["List", "Grid"] },
}

export const Large: Story = {
  args: { size: "lg", items: ["All", "Active", "Completed"] },
}

export const ExtraSmall: Story = {
  args: { size: "xs", items: ["A", "B"] },
}

export const FullWidth: Story = {
  args: { fullWidth: true, items: ["Tab 1", "Tab 2", "Tab 3"] },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
