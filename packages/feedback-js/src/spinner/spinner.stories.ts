import type { Meta, StoryObj } from "@storybook/html"
import { spinnerClasses } from "./spinner.classes.js"
import type { SpinnerClassesOptions, SpinnerSize, SpinnerVariant } from "./spinner.types.js"

function createSpinner(args: SpinnerClassesOptions): HTMLDivElement {
  const el = document.createElement("div")
  el.className = spinnerClasses(args)
  el.setAttribute("role", "status")

  const sr = document.createElement("span")
  sr.style.cssText =
    "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0"
  sr.textContent = "Loading"
  el.appendChild(sr)

  return el
}

const meta = {
  title: "Feedback/Spinner",
  tags: ["autodocs"],
  render: (args) => createSpinner(args as SpinnerClassesOptions),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    variant: { control: "select", options: ["primary", "neutral"] },
  },
  args: { size: "md", variant: "primary" },
} satisfies Meta<SpinnerClassesOptions>

export default meta
type Story = StoryObj<SpinnerClassesOptions>

export const Playground: Story = {}
export const Primary: Story = { args: { variant: "primary" } }
export const Neutral: Story = { args: { variant: "neutral" } }

export const AllSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.gap = "16px"
    container.style.alignItems = "center"
    const sizes: SpinnerSize[] = ["xs", "sm", "md", "lg", "xl"]
    for (const size of sizes) {
      container.appendChild(createSpinner({ size }))
    }
    return container
  },
}

export const AllVariantsAndSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "16px"
    const variants: SpinnerVariant[] = ["primary", "neutral"]
    const sizes: SpinnerSize[] = ["xs", "sm", "md", "lg", "xl"]
    for (const variant of variants) {
      const row = document.createElement("div")
      row.style.display = "flex"
      row.style.gap = "16px"
      row.style.alignItems = "center"
      for (const size of sizes) {
        row.appendChild(createSpinner({ variant, size }))
      }
      container.appendChild(row)
    }
    return container
  },
}
