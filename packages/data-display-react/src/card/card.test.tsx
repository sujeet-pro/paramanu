import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Card, CardHeader, CardBody, CardFooter, CardMedia } from "./card.js"

afterEach(cleanup)

describe("Card", () => {
  it("renders with children", () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId("card")).toBeInTheDocument()
    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId("card")
    expect(card.className).toContain("pm-card")
    expect(card.className).toContain("pm-card--elevated")
    expect(card.className).toContain("pm-card--md")
  })

  it("applies variant class", () => {
    render(<Card variant="outline" data-testid="card">Content</Card>)
    expect(screen.getByTestId("card").className).toContain("pm-card--outline")
  })

  it("applies size class", () => {
    render(<Card size="lg" data-testid="card">Content</Card>)
    expect(screen.getByTestId("card").className).toContain("pm-card--lg")
  })

  it("applies interactive modifier", () => {
    render(<Card interactive data-testid="card">Content</Card>)
    expect(screen.getByTestId("card").className).toContain("pm-card--interactive")
  })

  it("applies fullWidth modifier", () => {
    render(<Card fullWidth data-testid="card">Content</Card>)
    expect(screen.getByTestId("card").className).toContain("pm-card--full-width")
  })

  it("applies horizontal modifier", () => {
    render(<Card horizontal data-testid="card">Content</Card>)
    expect(screen.getByTestId("card").className).toContain("pm-card--horizontal")
  })

  it("forwards ref", () => {
    let cardRef: HTMLDivElement | null = null
    render(<Card ref={(el) => (cardRef = el)}>Content</Card>)
    expect(cardRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Card className="custom" data-testid="card">Content</Card>)
    const card = screen.getByTestId("card")
    expect(card.className).toContain("pm-card")
    expect(card.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<Card data-testid="my-card">Content</Card>)
    expect(screen.getByTestId("my-card")).toBeInTheDocument()
  })
})

describe("CardHeader", () => {
  it("renders with header class", () => {
    render(<CardHeader data-testid="header">Header</CardHeader>)
    const header = screen.getByTestId("header")
    expect(header.className).toContain("pm-card__header")
  })

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null
    render(<CardHeader ref={(el) => (ref = el)}>Header</CardHeader>)
    expect(ref).toBeInstanceOf(HTMLDivElement)
  })
})

describe("CardBody", () => {
  it("renders with body class", () => {
    render(<CardBody data-testid="body">Body</CardBody>)
    expect(screen.getByTestId("body").className).toContain("pm-card__body")
  })
})

describe("CardFooter", () => {
  it("renders with footer class", () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    expect(screen.getByTestId("footer").className).toContain("pm-card__footer")
  })
})

describe("CardMedia", () => {
  it("renders with media class", () => {
    render(<CardMedia data-testid="media">Media</CardMedia>)
    expect(screen.getByTestId("media").className).toContain("pm-card__media")
  })

  it("applies position modifier", () => {
    render(<CardMedia position="bottom" data-testid="media">Media</CardMedia>)
    expect(screen.getByTestId("media").className).toContain("pm-card__media--bottom")
  })
})
