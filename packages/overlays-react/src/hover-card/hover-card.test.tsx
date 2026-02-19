import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Hovercard, HovercardArrow } from "./hover-card.js"

afterEach(cleanup)

describe("Hovercard", () => {
  it("renders children when open", () => {
    render(<Hovercard open>Hover card content</Hovercard>)
    expect(screen.getByText("Hover card content")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(<Hovercard>Hover card content</Hovercard>)
    expect(screen.queryByText("Hover card content")).not.toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <Hovercard open data-testid="hover-card">
        Content
      </Hovercard>,
    )
    const el = screen.getByTestId("hover-card")
    expect(el.className).toContain("pm-hovercard")
    expect(el.className).toContain("pm-hovercard--bottom")
  })

  it("applies placement class", () => {
    render(
      <Hovercard open placement="top" data-testid="hover-card">
        Content
      </Hovercard>,
    )
    const el = screen.getByTestId("hover-card")
    expect(el.className).toContain("pm-hovercard--top")
  })

  it("forwards ref", () => {
    let hoverCardRef: HTMLDivElement | null = null
    render(
      <Hovercard open ref={(el) => (hoverCardRef = el)}>
        Content
      </Hovercard>,
    )
    expect(hoverCardRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Hovercard open className="custom-class" data-testid="hover-card">
        Content
      </Hovercard>,
    )
    const el = screen.getByTestId("hover-card")
    expect(el.className).toContain("pm-hovercard")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Hovercard open data-testid="my-hover-card">
        Content
      </Hovercard>,
    )
    expect(screen.getByTestId("my-hover-card")).toBeInTheDocument()
  })
})

describe("HovercardArrow", () => {
  it("renders with default classes", () => {
    render(<HovercardArrow data-testid="arrow" />)
    const el = screen.getByTestId("arrow")
    expect(el.className).toContain("pm-hovercard__arrow")
  })

  it("forwards ref", () => {
    let arrowRef: HTMLDivElement | null = null
    render(<HovercardArrow ref={(el) => (arrowRef = el)} />)
    expect(arrowRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<HovercardArrow className="custom-arrow" data-testid="arrow" />)
    const el = screen.getByTestId("arrow")
    expect(el.className).toContain("pm-hovercard__arrow")
    expect(el.className).toContain("custom-arrow")
  })
})
