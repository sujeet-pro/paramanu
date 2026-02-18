import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { HoverCard, HoverCardArrow } from "./hover-card.js"

afterEach(cleanup)

describe("HoverCard", () => {
  it("renders children when open", () => {
    render(<HoverCard open>Hover card content</HoverCard>)
    expect(screen.getByText("Hover card content")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(<HoverCard>Hover card content</HoverCard>)
    expect(screen.queryByText("Hover card content")).not.toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <HoverCard open data-testid="hover-card">
        Content
      </HoverCard>,
    )
    const el = screen.getByTestId("hover-card")
    expect(el.className).toContain("pm-hover-card")
    expect(el.className).toContain("pm-hover-card--bottom")
  })

  it("applies placement class", () => {
    render(
      <HoverCard open placement="top" data-testid="hover-card">
        Content
      </HoverCard>,
    )
    const el = screen.getByTestId("hover-card")
    expect(el.className).toContain("pm-hover-card--top")
  })

  it("forwards ref", () => {
    let hoverCardRef: HTMLDivElement | null = null
    render(
      <HoverCard open ref={(el) => (hoverCardRef = el)}>
        Content
      </HoverCard>,
    )
    expect(hoverCardRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <HoverCard open className="custom-class" data-testid="hover-card">
        Content
      </HoverCard>,
    )
    const el = screen.getByTestId("hover-card")
    expect(el.className).toContain("pm-hover-card")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <HoverCard open data-testid="my-hover-card">
        Content
      </HoverCard>,
    )
    expect(screen.getByTestId("my-hover-card")).toBeInTheDocument()
  })
})

describe("HoverCardArrow", () => {
  it("renders with default classes", () => {
    render(<HoverCardArrow data-testid="arrow" />)
    const el = screen.getByTestId("arrow")
    expect(el.className).toContain("pm-hover-card__arrow")
  })

  it("forwards ref", () => {
    let arrowRef: HTMLDivElement | null = null
    render(<HoverCardArrow ref={(el) => (arrowRef = el)} />)
    expect(arrowRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<HoverCardArrow className="custom-arrow" data-testid="arrow" />)
    const el = screen.getByTestId("arrow")
    expect(el.className).toContain("pm-hover-card__arrow")
    expect(el.className).toContain("custom-arrow")
  })
})
