import type { Meta, StoryObj } from "@storybook/html"
import { statClasses } from "./stat.classes.js"
import type { StatClassesOptions } from "./stat.types.js"

interface StatArgs extends StatClassesOptions {
  label: string
  value: string
  helpText: string
}

function createStat(args: StatArgs): HTMLElement {
  const cls = statClasses({ size: args.size, align: args.align })
  const root = document.createElement("div")
  root.className = cls.root

  const label = document.createElement("div")
  label.className = cls.label
  label.textContent = args.label
  root.appendChild(label)

  const value = document.createElement("div")
  value.className = cls.value
  value.textContent = args.value
  root.appendChild(value)

  if (args.helpText) {
    const helpText = document.createElement("div")
    helpText.className = cls.helpText
    helpText.textContent = args.helpText
    root.appendChild(helpText)
  }

  return root
}

const meta = {
  title: "Data Display/Stat",
  tags: ["autodocs"],
  render: (args) => createStat(args as StatArgs),
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    align: { control: "select", options: ["start", "center", "end"] },
    label: { control: "text" },
    value: { control: "text" },
    helpText: { control: "text" },
  },
  args: {
    size: "md",
    align: "start",
    label: "Total Revenue",
    value: "$45,231",
    helpText: "+12.5% from last month",
  },
} satisfies Meta<StatArgs>

export default meta
type Story = StoryObj<StatArgs>

export const Playground: Story = {}
export const Centered: Story = { args: { align: "center" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
