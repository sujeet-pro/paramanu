import type { Meta, StoryObj } from "@storybook/html"
import { carouselClasses, carouselSlideClasses, carouselControlClasses, carouselIndicatorClasses } from "./carousel.classes.js"
import type { CarouselClassesOptions } from "./carousel.types.js"

interface CarouselArgs extends CarouselClassesOptions {}

function createCarousel(args: CarouselArgs): HTMLElement {
  const root = document.createElement("div")
  root.className = carouselClasses(args)
  root.setAttribute("role", "region")
  root.setAttribute("aria-roledescription", "carousel")
  root.setAttribute("aria-label", "Example carousel")

  const prev = document.createElement("button")
  prev.className = carouselControlClasses({ direction: "prev", disabled: true })
  prev.type = "button"
  prev.disabled = true
  prev.setAttribute("aria-label", "Previous slide")
  prev.textContent = "\u2039"
  root.appendChild(prev)

  for (let i = 0; i < 3; i++) {
    const slide = document.createElement("div")
    slide.className = carouselSlideClasses({ active: i === 0 })
    slide.setAttribute("role", "group")
    slide.setAttribute("aria-roledescription", "slide")
    slide.setAttribute("aria-label", `Slide ${i + 1} of 3`)
    slide.textContent = `Slide ${i + 1}`
    root.appendChild(slide)
  }

  const next = document.createElement("button")
  next.className = carouselControlClasses({ direction: "next" })
  next.type = "button"
  next.setAttribute("aria-label", "Next slide")
  next.textContent = "\u203a"
  root.appendChild(next)

  const indicators = document.createElement("div")
  indicators.setAttribute("role", "tablist")
  indicators.setAttribute("aria-label", "Slides")
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("button")
    dot.className = carouselIndicatorClasses({ active: i === 0 })
    dot.type = "button"
    dot.setAttribute("role", "tab")
    dot.setAttribute("aria-selected", String(i === 0))
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`)
    indicators.appendChild(dot)
  }
  root.appendChild(indicators)

  return root
}

const meta = {
  title: "Disclosure/Carousel",
  tags: ["autodocs"],
  render: (args) => createCarousel(args as CarouselArgs),
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    orientation: "horizontal",
    size: "md",
  },
} satisfies Meta<CarouselArgs>

export default meta
type Story = StoryObj<CarouselArgs>

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
