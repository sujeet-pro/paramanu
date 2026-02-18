import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Calendar } from "./calendar.js"

afterEach(cleanup)

describe("Calendar", () => {
  it("renders a grid", () => {
    render(<Calendar aria-label="February 2026" />)
    expect(screen.getByRole("grid")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    const { container } = render(<Calendar aria-label="February 2026" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-calendar")
    expect(wrapper?.className).toContain("pm-calendar--md")
  })

  it("applies size class", () => {
    const { container } = render(<Calendar size="sm" aria-label="February 2026" />)
    expect(container.firstElementChild?.className).toContain("pm-calendar--sm")
  })

  it("applies lg size class", () => {
    const { container } = render(<Calendar size="lg" aria-label="February 2026" />)
    expect(container.firstElementChild?.className).toContain("pm-calendar--lg")
  })

  it("has role grid", () => {
    render(<Calendar aria-label="February 2026" />)
    expect(screen.getByRole("grid")).toHaveAttribute("aria-label", "February 2026")
  })

  it("renders children", () => {
    render(
      <Calendar aria-label="February 2026">
        <div data-testid="child">Content</div>
      </Calendar>,
    )
    expect(screen.getByTestId("child")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(<Calendar ref={(el) => (divRef = el)} aria-label="February 2026" />)
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<Calendar className="custom" aria-label="February 2026" />)
    expect(container.firstElementChild?.className).toContain("pm-calendar")
    expect(container.firstElementChild?.className).toContain("custom")
  })
})
