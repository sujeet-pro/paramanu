import type { Meta, StoryObj } from "@storybook/html-vite"
import {
  stepsClasses,
  stepClasses,
  stepIndicatorClasses,
  stepConnectorClasses,
  stepContentClasses,
} from "./steps.classes.js"
import type { StepsClassesOptions } from "./steps.types.js"

interface StepsArgs extends StepsClassesOptions {}

function createSteps(args: StepsArgs): HTMLElement {
  const root = document.createElement("div")
  root.className = stepsClasses(args)
  root.setAttribute("role", "list")
  root.setAttribute("aria-label", "Progress")

  const stepsData = [
    { label: "Account", status: "complete" as const },
    { label: "Details", status: "active" as const },
    { label: "Confirm", status: "incomplete" as const },
  ]

  stepsData.forEach((s, i) => {
    const step = document.createElement("div")
    step.className = stepClasses({ status: s.status })
    if (s.status === "active") step.setAttribute("aria-current", "step")

    const indicator = document.createElement("div")
    indicator.className = stepIndicatorClasses({ status: s.status })
    indicator.setAttribute("aria-hidden", "true")
    indicator.textContent = String(i + 1)

    const content = document.createElement("div")
    content.className = stepContentClasses()
    content.textContent = s.label

    step.appendChild(indicator)
    step.appendChild(content)
    root.appendChild(step)

    if (i < stepsData.length - 1) {
      const connector = document.createElement("div")
      connector.className = stepConnectorClasses({ status: s.status })
      connector.setAttribute("role", "presentation")
      root.appendChild(connector)
    }
  })

  return root
}

const meta = {
  title: "Navigation/Steps",
  tags: ["autodocs", "beta"],
  render: (args) => createSteps(args as StepsArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    size: "md",
    orientation: "horizontal",
  },
} satisfies Meta<StepsArgs>

export default meta
type Story = StoryObj<StepsArgs>

export const Playground: Story = {}

export const Vertical: Story = {
  args: { orientation: "vertical" },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
