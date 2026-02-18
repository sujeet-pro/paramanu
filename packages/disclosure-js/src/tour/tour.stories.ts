import type { Meta, StoryObj } from "@storybook/html-vite"
import { tourClasses, tourStepClasses, tourOverlayClasses } from "./tour.classes.js"
import type { TourClassesOptions } from "./tour.types.js"

interface TourArgs extends TourClassesOptions {}

function createTour(args: TourArgs): HTMLElement {
  const root = document.createElement("div")
  root.className = tourClasses(args)

  if (args.open) {
    const overlay = document.createElement("div")
    overlay.className = tourOverlayClasses({ visible: true })
    overlay.setAttribute("aria-hidden", "true")
    root.appendChild(overlay)
  }

  const step = document.createElement("div")
  step.className = tourStepClasses({ placement: "bottom", active: args.open })
  step.setAttribute("role", "dialog")

  const title = document.createElement("h3")
  title.textContent = "Welcome!"

  const desc = document.createElement("p")
  desc.textContent = "This is the first step of the guided tour."

  step.appendChild(title)
  step.appendChild(desc)
  root.appendChild(step)

  return root
}

const meta = {
  title: "Disclosure/Tour",
  tags: ["autodocs", "stable"],
  render: (args) => createTour(args as TourArgs),
  argTypes: {
    open: { control: "boolean" },
  },
  args: {
    open: true,
  },
} satisfies Meta<TourArgs>

export default meta
type Story = StoryObj<TourArgs>

export const Playground: Story = {}

export const Closed: Story = {
  args: { open: false },
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
