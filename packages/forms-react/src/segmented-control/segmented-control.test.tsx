import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { SegCtrl } from "./segmented-control.js"

afterEach(cleanup)

describe("SegCtrl", () => {
  it("renders with role=radiogroup", () => {
    render(
      <SegCtrl>
        <button type="button">Day</button>
        <button type="button">Week</button>
      </SegCtrl>,
    )
    expect(screen.getByRole("radiogroup")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<SegCtrl>Content</SegCtrl>)
    const control = screen.getByRole("radiogroup")
    expect(control.className).toContain("pm-seg-ctrl")
    expect(control.className).toContain("pm-seg-ctrl--md")
  })

  it("applies size class", () => {
    render(<SegCtrl size="lg">Content</SegCtrl>)
    const control = screen.getByRole("radiogroup")
    expect(control.className).toContain("pm-seg-ctrl--lg")
  })

  it("applies full-width class", () => {
    render(<SegCtrl fullWidth>Content</SegCtrl>)
    const control = screen.getByRole("radiogroup")
    expect(control.className).toContain("pm-seg-ctrl--full-width")
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(<SegCtrl ref={(el) => (divRef = el)}>Content</SegCtrl>)
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<SegCtrl className="custom-class">Content</SegCtrl>)
    const control = screen.getByRole("radiogroup")
    expect(control.className).toContain("pm-seg-ctrl")
    expect(control.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <SegCtrl data-testid="my-control" aria-label="View options">
        Content
      </SegCtrl>,
    )
    expect(screen.getByTestId("my-control")).toBeInTheDocument()
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-label", "View options")
  })

  it("renders children", () => {
    render(
      <SegCtrl>
        <button type="button">A</button>
        <button type="button">B</button>
        <button type="button">C</button>
      </SegCtrl>,
    )
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
    expect(screen.getByText("C")).toBeInTheDocument()
  })
})
