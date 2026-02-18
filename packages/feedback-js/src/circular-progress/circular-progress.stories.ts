import type { Meta, StoryObj } from "@storybook/html-vite"
import { circularProgressClasses } from "./circular-progress.classes.js"
import type { CircularProgressClassesOptions, CircularProgressVariant, CircularProgressSize } from "./circular-progress.types.js"

const SIZE_MAP: Record<string, number> = { sm: 32, md: 48, lg: 64, xl: 80 }
const RADIUS = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface CircularProgressArgs extends CircularProgressClassesOptions {
  thickness: number
}

function createCircularProgress(args: CircularProgressArgs): HTMLDivElement {
  const classes = circularProgressClasses(args)
  const value = args.value ?? 0
  const min = args.min ?? 0
  const max = args.max ?? 100
  const percentage = max > min ? ((value - min) / (max - min)) * 100 : 0
  const strokeDashoffset = args.indeterminate ? 0 : CIRCUMFERENCE * (1 - percentage / 100)
  const size = args.size ?? "md"
  const svgSize = SIZE_MAP[size] ?? SIZE_MAP.md
  const thickness = args.thickness ?? 4

  const el = document.createElement("div")
  el.className = classes.root
  el.setAttribute("role", "progressbar")
  if (!args.indeterminate) {
    el.setAttribute("aria-valuenow", String(value))
  }
  el.setAttribute("aria-valuemin", String(min))
  el.setAttribute("aria-valuemax", String(max))

  el.innerHTML = `<svg class="${classes.svg}" viewBox="0 0 44 44" width="${svgSize}" height="${svgSize}"><circle class="${classes.track}" cx="22" cy="22" r="${RADIUS}" fill="none" stroke-width="${thickness}"/><circle class="${classes.fill}" cx="22" cy="22" r="${RADIUS}" fill="none" stroke-width="${thickness}" stroke-dasharray="${CIRCUMFERENCE}" stroke-dashoffset="${strokeDashoffset}"/></svg>`

  return el
}

const meta = {
  title: "Feedback/Circular Progress",
  tags: ["autodocs", "stable"],
  render: (args) => createCircularProgress(args as CircularProgressArgs),
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    variant: { control: "select", options: ["primary", "success", "warning", "danger"] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    indeterminate: { control: "boolean" },
    thickness: { control: { type: "number", min: 1, max: 10 } },
  },
  args: { variant: "primary", size: "md", value: 60, thickness: 4 },
} satisfies Meta<CircularProgressArgs>

export default meta
type Story = StoryObj<CircularProgressArgs>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.gap = "16px"
    const variants: CircularProgressVariant[] = ["primary", "success", "warning", "danger"]
    for (const variant of variants) {
      container.appendChild(createCircularProgress({ variant, value: 65, thickness: 4 }))
    }
    return container
  },
}

export const AllSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.gap = "16px"
    container.style.alignItems = "center"
    const sizes: CircularProgressSize[] = ["sm", "md", "lg", "xl"]
    for (const size of sizes) {
      container.appendChild(createCircularProgress({ size, value: 50, thickness: 4 }))
    }
    return container
  },
}

export const Indeterminate: Story = { args: { indeterminate: true } }

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
