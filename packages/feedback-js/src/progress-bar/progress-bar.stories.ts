import type { Meta, StoryObj } from "@storybook/html-vite"
import { progressClasses } from "./progress-bar.classes.js"
import type { ProgressClassesOptions, ProgressVariant, ProgressSize } from "./progress-bar.types.js"

interface ProgressArgs extends ProgressClassesOptions {}

function createProgress(args: ProgressArgs): HTMLDivElement {
  const classes = progressClasses(args)
  const value = args.value ?? 0
  const min = args.min ?? 0
  const max = args.max ?? 100
  const percentage = max > min ? ((value - min) / (max - min)) * 100 : 0

  const el = document.createElement("div")
  el.className = classes.root
  el.setAttribute("role", "progressbar")
  if (!args.indeterminate) {
    el.setAttribute("aria-valuenow", String(value))
  }
  el.setAttribute("aria-valuemin", String(min))
  el.setAttribute("aria-valuemax", String(max))
  el.setAttribute("aria-label", "Progress")

  if (args.showLabel) {
    const label = document.createElement("div")
    label.className = classes.label
    label.textContent = `${Math.round(percentage)}%`
    el.appendChild(label)
  }

  const track = document.createElement("div")
  track.className = classes.track
  const fill = document.createElement("div")
  fill.className = classes.fill
  if (!args.indeterminate) {
    fill.style.width = `${percentage}%`
  }
  track.appendChild(fill)
  el.appendChild(track)

  return el
}

const meta = {
  title: "Feedback/Progress Bar",
  tags: ["autodocs", "beta"],
  render: (args) => createProgress(args as ProgressArgs),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    variant: { control: "select", options: ["primary", "success", "warning", "danger"] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    striped: { control: "boolean" },
    animated: { control: "boolean" },
    indeterminate: { control: "boolean" },
    showLabel: { control: "boolean" },
  },
  args: {
    variant: "primary",
    size: "md",
    value: 60,
  },
} satisfies Meta<ProgressArgs>

export default meta
type Story = StoryObj<ProgressArgs>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "12px"
    const variants: ProgressVariant[] = ["primary", "success", "warning", "danger"]
    for (const variant of variants) {
      container.appendChild(createProgress({ variant, value: 65 }))
    }
    return container
  },
}

export const AllSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "12px"
    const sizes: ProgressSize[] = ["xs", "sm", "md", "lg"]
    for (const size of sizes) {
      container.appendChild(createProgress({ size, value: 50 }))
    }
    return container
  },
}

export const WithLabel: Story = { args: { showLabel: true, value: 65 } }
export const Striped: Story = { args: { striped: true, value: 60 } }
export const Indeterminate: Story = { args: { indeterminate: true } }
export const StripedAnimated: Story = { args: { striped: true, animated: true, value: 60 } }
export const Zero: Story = { args: { value: 0 } }
export const Complete: Story = { args: { value: 100, variant: "success" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
