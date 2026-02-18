import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Carousel, CarouselSlide, CarouselControl, CarouselIndicator } from "./carousel.js"

const meta = {
  title: "Disclosure/Carousel",
  component: Carousel,
  tags: ["autodocs", "stable"],
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
    onSlideChange: fn(),
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Carousel {...args} aria-label="Example carousel">
      <CarouselControl direction="prev">Prev</CarouselControl>
      <CarouselSlide active index={0} total={3}>Slide 1</CarouselSlide>
      <CarouselSlide index={1} total={3}>Slide 2</CarouselSlide>
      <CarouselSlide index={2} total={3}>Slide 3</CarouselSlide>
      <CarouselControl direction="next">Next</CarouselControl>
      <div>
        <CarouselIndicator active index={0} />
        <CarouselIndicator index={1} />
        <CarouselIndicator index={2} />
      </div>
    </Carousel>
  ),
}

export const Default: Story = {
  render: () => (
    <Carousel aria-label="Demo carousel">
      <CarouselSlide active index={0} total={2}>First Slide</CarouselSlide>
      <CarouselSlide index={1} total={2}>Second Slide</CarouselSlide>
    </Carousel>
  ),
}

export const WithControls: Story = {
  render: () => (
    <Carousel aria-label="Controlled carousel">
      <CarouselControl direction="prev" disabled>Prev</CarouselControl>
      <CarouselSlide active index={0} total={3}>Slide 1</CarouselSlide>
      <CarouselSlide index={1} total={3}>Slide 2</CarouselSlide>
      <CarouselSlide index={2} total={3}>Slide 3</CarouselSlide>
      <CarouselControl direction="next">Next</CarouselControl>
    </Carousel>
  ),
}

export const WithIndicators: Story = {
  render: () => (
    <Carousel aria-label="Indicator carousel">
      <CarouselSlide active index={0} total={3}>Slide 1</CarouselSlide>
      <CarouselSlide index={1} total={3}>Slide 2</CarouselSlide>
      <CarouselSlide index={2} total={3}>Slide 3</CarouselSlide>
      <div role="tablist" aria-label="Slides">
        <CarouselIndicator active index={0} />
        <CarouselIndicator index={1} />
        <CarouselIndicator index={2} />
      </div>
    </Carousel>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Carousel {...args} aria-label="Small carousel">
      <CarouselSlide active>Small slide</CarouselSlide>
    </Carousel>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Carousel {...args} aria-label="Large carousel">
      <CarouselSlide active>Large slide</CarouselSlide>
    </Carousel>
  ),
}

export const NavigationInteraction: Story = {
  render: () => (
    <Carousel aria-label="Nav carousel">
      <CarouselControl direction="prev" disabled>Prev</CarouselControl>
      <CarouselSlide active index={0} total={2}>Slide 1</CarouselSlide>
      <CarouselSlide index={1} total={2}>Slide 2</CarouselSlide>
      <CarouselControl direction="next">Next</CarouselControl>
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nextBtn = canvas.getByRole("button", { name: "Next" })
    await userEvent.click(nextBtn)
    await expect(nextBtn).toHaveFocus()
  },
}

export const Accessibility: Story = {
  render: () => (
    <Carousel aria-label="Accessible carousel">
      <CarouselControl direction="prev">Previous slide</CarouselControl>
      <CarouselSlide active index={0} total={2}>Slide 1</CarouselSlide>
      <CarouselSlide index={1} total={2}>Slide 2</CarouselSlide>
      <CarouselControl direction="next">Next slide</CarouselControl>
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const region = canvas.getByRole("region", { name: "Accessible carousel" })
    await expect(region).toBeInTheDocument()
    const prevBtn = canvas.getByRole("button", { name: "Previous slide" })
    await expect(prevBtn).toBeInTheDocument()
  },
}

export const Hover: Story = {
  render: () => (
    <Carousel aria-label="Hover carousel">
      <CarouselControl direction="prev">Prev</CarouselControl>
      <CarouselSlide active>Slide</CarouselSlide>
      <CarouselControl direction="next">Next</CarouselControl>
    </Carousel>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: () => (
    <Carousel aria-label="Focus carousel">
      <CarouselControl direction="prev">Prev</CarouselControl>
      <CarouselSlide active>Slide</CarouselSlide>
      <CarouselControl direction="next">Next</CarouselControl>
    </Carousel>
  ),
  parameters: { pseudo: { focusVisible: true } },
}

export const ActiveState: Story = {
  render: () => (
    <Carousel aria-label="Active carousel">
      <CarouselControl direction="prev">Prev</CarouselControl>
      <CarouselSlide active>Slide</CarouselSlide>
      <CarouselControl direction="next">Next</CarouselControl>
    </Carousel>
  ),
  parameters: { pseudo: { active: true } },
}
