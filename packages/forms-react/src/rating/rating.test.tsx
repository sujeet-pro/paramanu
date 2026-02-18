import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Rating } from "./rating.js"

afterEach(cleanup)

describe("Rating", () => {
  it("renders a radiogroup element", () => {
    render(<Rating aria-label="Rating" />)
    expect(screen.getByRole("radiogroup", { name: "Rating" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Rating aria-label="Rating" />)
    const rating = screen.getByRole("radiogroup", { name: "Rating" })
    expect(rating.className).toContain("pm-rating")
    expect(rating.className).toContain("pm-rating--md")
  })

  it("applies size class", () => {
    render(<Rating size="lg" aria-label="Rating" />)
    const rating = screen.getByRole("radiogroup", { name: "Rating" })
    expect(rating.className).toContain("pm-rating--lg")
  })

  it("sets aria-disabled when disabled", () => {
    render(<Rating disabled aria-label="Rating" />)
    const rating = screen.getByRole("radiogroup", { name: "Rating" })
    expect(rating).toHaveAttribute("aria-disabled", "true")
    expect(rating.className).toContain("pm-rating--disabled")
  })

  it("applies read-only modifier", () => {
    render(<Rating readOnly aria-label="Rating" />)
    const rating = screen.getByRole("radiogroup", { name: "Rating" })
    expect(rating.className).toContain("pm-rating--read-only")
  })

  it("forwards ref", () => {
    let ratingRef: HTMLDivElement | null = null
    render(<Rating ref={(el) => (ratingRef = el)} aria-label="Rating" />)
    expect(ratingRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Rating className="custom-class" aria-label="Rating" />)
    const rating = screen.getByRole("radiogroup", { name: "Rating" })
    expect(rating.className).toContain("pm-rating")
    expect(rating.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Rating data-testid="my-rating" aria-label="Rating" />)
    expect(screen.getByTestId("my-rating")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <Rating aria-label="Rating">
        <span>Star content</span>
      </Rating>,
    )
    expect(screen.getByText("Star content")).toBeInTheDocument()
  })
})
