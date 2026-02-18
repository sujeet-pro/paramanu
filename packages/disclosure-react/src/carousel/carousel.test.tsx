import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Carousel, CarouselSlide, CarouselControl, CarouselIndicator } from "./carousel.js"

afterEach(cleanup)

describe("Carousel", () => {
  it("renders with role=region and aria-roledescription", () => {
    render(<Carousel aria-label="Images">Slides</Carousel>)
    const carousel = screen.getByRole("region")
    expect(carousel).toHaveAttribute("aria-roledescription", "carousel")
  })

  it("applies default classes", () => {
    render(<Carousel aria-label="Images">Slides</Carousel>)
    const carousel = screen.getByRole("region")
    expect(carousel.className).toContain("pm-carousel")
    expect(carousel.className).toContain("pm-carousel--horizontal")
    expect(carousel.className).toContain("pm-carousel--md")
  })

  it("applies orientation class", () => {
    render(
      <Carousel aria-label="Images" orientation="vertical">
        Slides
      </Carousel>,
    )
    expect(screen.getByRole("region").className).toContain("pm-carousel--vertical")
  })

  it("forwards ref", () => {
    let carouselRef: HTMLDivElement | null = null
    render(
      <Carousel aria-label="Images" ref={(el) => (carouselRef = el)}>
        Slides
      </Carousel>,
    )
    expect(carouselRef).toBeInstanceOf(HTMLDivElement)
  })
})

describe("CarouselSlide", () => {
  it("renders with role=group and aria-roledescription", () => {
    render(<CarouselSlide>Slide content</CarouselSlide>)
    const slide = screen.getByRole("group")
    expect(slide).toHaveAttribute("aria-roledescription", "slide")
  })

  it("applies active class", () => {
    render(<CarouselSlide active>Active slide</CarouselSlide>)
    expect(screen.getByRole("group").className).toContain("pm-carousel__slide--active")
  })

  it("has aria-label with position", () => {
    render(
      <CarouselSlide index={0} total={3}>
        Slide
      </CarouselSlide>,
    )
    expect(screen.getByRole("group")).toHaveAttribute("aria-label", "Slide 1 of 3")
  })
})

describe("CarouselControl", () => {
  it("renders prev button with aria-label", () => {
    render(<CarouselControl direction="prev" />)
    expect(screen.getByRole("button", { name: "Previous slide" })).toBeInTheDocument()
  })

  it("renders next button with aria-label", () => {
    render(<CarouselControl direction="next" />)
    expect(screen.getByRole("button", { name: "Next slide" })).toBeInTheDocument()
  })

  it("sets disabled and aria-disabled", () => {
    render(<CarouselControl direction="prev" disabled />)
    const button = screen.getByRole("button", { name: "Previous slide" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
  })
})

describe("CarouselIndicator", () => {
  it("renders with role=tab", () => {
    render(<CarouselIndicator index={0} />)
    expect(screen.getByRole("tab")).toBeInTheDocument()
  })

  it("has aria-selected when active", () => {
    render(<CarouselIndicator active index={0} />)
    expect(screen.getByRole("tab")).toHaveAttribute("aria-selected", "true")
  })

  it("has aria-label with position", () => {
    render(<CarouselIndicator index={2} />)
    expect(screen.getByRole("tab")).toHaveAttribute("aria-label", "Go to slide 3")
  })
})
