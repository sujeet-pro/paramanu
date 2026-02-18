import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Tour, TourStep, TourOverlay } from "./tour.js"

afterEach(cleanup)

describe("Tour", () => {
  it("renders children", () => {
    render(<Tour>Tour content</Tour>)
    expect(screen.getByText("Tour content")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Tour data-testid="tour">content</Tour>)
    expect(screen.getByTestId("tour").className).toContain("pm-tour")
  })

  it("applies open class", () => {
    render(
      <Tour open data-testid="tour">
        content
      </Tour>,
    )
    expect(screen.getByTestId("tour").className).toContain("pm-tour--open")
  })

  it("forwards ref", () => {
    let tourRef: HTMLDivElement | null = null
    render(<Tour ref={(el) => (tourRef = el)}>content</Tour>)
    expect(tourRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Tour className="custom-class" data-testid="tour">
        content
      </Tour>,
    )
    const el = screen.getByTestId("tour")
    expect(el.className).toContain("pm-tour")
    expect(el.className).toContain("custom-class")
  })
})

describe("TourStep", () => {
  it("renders with role=dialog", () => {
    render(<TourStep aria-label="Welcome">Step content</TourStep>)
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("applies placement class", () => {
    render(
      <TourStep placement="top" aria-label="Step">
        content
      </TourStep>,
    )
    expect(screen.getByRole("dialog").className).toContain("pm-tour__step--top")
  })

  it("applies active class", () => {
    render(
      <TourStep active aria-label="Step">
        content
      </TourStep>,
    )
    expect(screen.getByRole("dialog").className).toContain("pm-tour__step--active")
  })

  it("forwards ref", () => {
    let stepRef: HTMLDivElement | null = null
    render(
      <TourStep aria-label="Step" ref={(el) => (stepRef = el)}>
        content
      </TourStep>,
    )
    expect(stepRef).toBeInstanceOf(HTMLDivElement)
  })
})

describe("TourOverlay", () => {
  it("renders with aria-hidden", () => {
    render(<TourOverlay data-testid="overlay" />)
    expect(screen.getByTestId("overlay")).toHaveAttribute("aria-hidden", "true")
  })

  it("applies visible class", () => {
    render(<TourOverlay visible data-testid="overlay" />)
    expect(screen.getByTestId("overlay").className).toContain("pm-tour__overlay--visible")
  })

  it("applies default classes", () => {
    render(<TourOverlay data-testid="overlay" />)
    expect(screen.getByTestId("overlay").className).toContain("pm-tour__overlay")
  })

  it("forwards ref", () => {
    let overlayRef: HTMLDivElement | null = null
    render(<TourOverlay ref={(el) => (overlayRef = el)} />)
    expect(overlayRef).toBeInstanceOf(HTMLDivElement)
  })
})
