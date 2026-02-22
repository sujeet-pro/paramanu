import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  TimelineOpposite,
} from "./timeline.js"

afterEach(cleanup)

describe("Timeline", () => {
  it("renders an ol element", () => {
    render(
      <Timeline data-testid="timeline">
        <li>Item</li>
      </Timeline>,
    )
    const tl = screen.getByTestId("timeline")
    expect(tl).toBeInTheDocument()
    expect(tl.tagName).toBe("OL")
  })

  it("applies default classes", () => {
    render(
      <Timeline data-testid="timeline">
        <li>Item</li>
      </Timeline>,
    )
    const tl = screen.getByTestId("timeline")
    expect(tl.className).toContain("pm-timeline")
    expect(tl.className).toContain("pm-timeline--vertical")
    expect(tl.className).toContain("pm-timeline--start")
  })

  it("applies orientation class", () => {
    render(
      <Timeline orientation="horizontal" data-testid="timeline">
        <li>Item</li>
      </Timeline>,
    )
    expect(screen.getByTestId("timeline").className).toContain("pm-timeline--horizontal")
  })

  it("applies align class", () => {
    render(
      <Timeline align="alternate" data-testid="timeline">
        <li>Item</li>
      </Timeline>,
    )
    expect(screen.getByTestId("timeline").className).toContain("pm-timeline--alternate")
  })

  it("forwards ref", () => {
    let tlRef: HTMLOListElement | null = null
    render(
      <Timeline ref={(el) => (tlRef = el)}>
        <li>Item</li>
      </Timeline>,
    )
    expect(tlRef).toBeInstanceOf(HTMLOListElement)
  })

  it("merges custom className", () => {
    render(
      <Timeline className="custom" data-testid="timeline">
        <li>Item</li>
      </Timeline>,
    )
    const tl = screen.getByTestId("timeline")
    expect(tl.className).toContain("pm-timeline")
    expect(tl.className).toContain("custom")
  })
})

describe("TimelineItem", () => {
  it("renders a li with item class", () => {
    render(
      <ul>
        <TimelineItem data-testid="item">Item</TimelineItem>
      </ul>,
    )
    const item = screen.getByTestId("item")
    expect(item.tagName).toBe("LI")
    expect(item.className).toContain("pm-timeline__item")
  })
})

describe("TimelineConnector", () => {
  it("renders with connector class", () => {
    render(<TimelineConnector data-testid="conn" />)
    expect(screen.getByTestId("conn").className).toContain("pm-timeline__connector")
  })
})

describe("TimelineDot", () => {
  it("renders with default dot classes", () => {
    render(<TimelineDot data-testid="dot" />)
    const dot = screen.getByTestId("dot")
    expect(dot.className).toContain("pm-timeline__dot")
    expect(dot.className).toContain("pm-timeline__dot--filled")
    expect(dot.className).toContain("pm-timeline__dot--primary")
  })

  it("applies variant and color", () => {
    render(<TimelineDot variant="outline" color="success" data-testid="dot" />)
    const dot = screen.getByTestId("dot")
    expect(dot.className).toContain("pm-timeline__dot--outline")
    expect(dot.className).toContain("pm-timeline__dot--success")
  })
})

describe("TimelineContent", () => {
  it("renders with content class", () => {
    render(<TimelineContent data-testid="content">Content</TimelineContent>)
    expect(screen.getByTestId("content").className).toContain("pm-timeline__content")
  })
})

describe("TimelineOpposite", () => {
  it("renders with opposite class", () => {
    render(<TimelineOpposite data-testid="opp">Opposite</TimelineOpposite>)
    expect(screen.getByTestId("opp").className).toContain("pm-timeline__opposite")
  })
})
