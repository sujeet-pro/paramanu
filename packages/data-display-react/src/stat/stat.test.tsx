import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Stat, StatLabel, StatValue, StatHelpText } from "./stat.js"

afterEach(cleanup)

describe("Stat", () => {
  it("renders with children", () => {
    render(<Stat data-testid="stat">Content</Stat>)
    expect(screen.getByTestId("stat")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Stat data-testid="stat">Content</Stat>)
    const stat = screen.getByTestId("stat")
    expect(stat.className).toContain("pm-stat")
    expect(stat.className).toContain("pm-stat--md")
    expect(stat.className).toContain("pm-stat--align-start")
  })

  it("applies size class", () => {
    render(
      <Stat size="lg" data-testid="stat">
        Content
      </Stat>,
    )
    expect(screen.getByTestId("stat").className).toContain("pm-stat--lg")
  })

  it("applies align class", () => {
    render(
      <Stat align="center" data-testid="stat">
        Content
      </Stat>,
    )
    expect(screen.getByTestId("stat").className).toContain("pm-stat--align-center")
  })

  it("forwards ref", () => {
    let statRef: HTMLDivElement | null = null
    render(<Stat ref={(el) => (statRef = el)}>Content</Stat>)
    expect(statRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Stat className="custom" data-testid="stat">
        Content
      </Stat>,
    )
    const stat = screen.getByTestId("stat")
    expect(stat.className).toContain("pm-stat")
    expect(stat.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<Stat data-testid="my-stat">Content</Stat>)
    expect(screen.getByTestId("my-stat")).toBeInTheDocument()
  })
})

describe("StatLabel", () => {
  it("renders with label class", () => {
    render(<StatLabel data-testid="label">Label</StatLabel>)
    expect(screen.getByTestId("label").className).toContain("pm-stat__label")
  })

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null
    render(<StatLabel ref={(el) => (ref = el)}>Label</StatLabel>)
    expect(ref).toBeInstanceOf(HTMLDivElement)
  })
})

describe("StatValue", () => {
  it("renders with value class", () => {
    render(<StatValue data-testid="value">100</StatValue>)
    expect(screen.getByTestId("value").className).toContain("pm-stat__value")
  })
})

describe("StatHelpText", () => {
  it("renders with help-text class", () => {
    render(<StatHelpText data-testid="help">+5%</StatHelpText>)
    expect(screen.getByTestId("help").className).toContain("pm-stat__help-text")
  })

  it("applies trend modifier", () => {
    render(
      <StatHelpText trend="up" data-testid="help">
        +5%
      </StatHelpText>,
    )
    expect(screen.getByTestId("help").className).toContain("pm-stat__help-text--up")
  })
})
