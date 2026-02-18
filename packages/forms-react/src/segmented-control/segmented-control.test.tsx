import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { SegmentedControl } from "./segmented-control.js"

afterEach(cleanup)

describe("SegmentedControl", () => {
  it("renders with role=radiogroup", () => {
    render(
      <SegmentedControl>
        <button type="button">Day</button>
        <button type="button">Week</button>
      </SegmentedControl>,
    )
    expect(screen.getByRole("radiogroup")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<SegmentedControl>Content</SegmentedControl>)
    const control = screen.getByRole("radiogroup")
    expect(control.className).toContain("pm-segmented-control")
    expect(control.className).toContain("pm-segmented-control--md")
  })

  it("applies size class", () => {
    render(<SegmentedControl size="lg">Content</SegmentedControl>)
    const control = screen.getByRole("radiogroup")
    expect(control.className).toContain("pm-segmented-control--lg")
  })

  it("applies full-width class", () => {
    render(<SegmentedControl fullWidth>Content</SegmentedControl>)
    const control = screen.getByRole("radiogroup")
    expect(control.className).toContain("pm-segmented-control--full-width")
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(<SegmentedControl ref={(el) => (divRef = el)}>Content</SegmentedControl>)
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<SegmentedControl className="custom-class">Content</SegmentedControl>)
    const control = screen.getByRole("radiogroup")
    expect(control.className).toContain("pm-segmented-control")
    expect(control.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <SegmentedControl data-testid="my-control" aria-label="View options">
        Content
      </SegmentedControl>,
    )
    expect(screen.getByTestId("my-control")).toBeInTheDocument()
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-label", "View options")
  })

  it("renders children", () => {
    render(
      <SegmentedControl>
        <button type="button">A</button>
        <button type="button">B</button>
        <button type="button">C</button>
      </SegmentedControl>,
    )
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
    expect(screen.getByText("C")).toBeInTheDocument()
  })
})
