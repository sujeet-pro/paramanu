import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { RingProgress } from "./circular-progress.js"

afterEach(cleanup)

describe("RingProgress", () => {
  it("renders with role=progressbar", () => {
    render(<RingProgress />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<RingProgress />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-ring-progress")
    expect(progress.className).toContain("pm-ring-progress--md")
    expect(progress.className).toContain("pm-ring-progress--primary")
  })

  it("applies size class", () => {
    render(<RingProgress size="lg" />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-ring-progress--lg")
  })

  it("applies variant class", () => {
    render(<RingProgress variant="success" />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-ring-progress--success")
  })

  it("contains an SVG element", () => {
    const { container } = render(<RingProgress />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("sets aria-valuenow, aria-valuemin, aria-valuemax", () => {
    render(<RingProgress value={60} min={0} max={100} />)
    const progress = screen.getByRole("progressbar")
    expect(progress).toHaveAttribute("aria-valuenow", "60")
    expect(progress).toHaveAttribute("aria-valuemin", "0")
    expect(progress).toHaveAttribute("aria-valuemax", "100")
  })

  it("omits aria-valuenow when indeterminate", () => {
    render(<RingProgress indeterminate />)
    const progress = screen.getByRole("progressbar")
    expect(progress).not.toHaveAttribute("aria-valuenow")
  })

  it("applies indeterminate class", () => {
    render(<RingProgress indeterminate />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-ring-progress--indeterminate")
  })

  it("forwards ref", () => {
    let progressRef: HTMLDivElement | null = null
    render(<RingProgress ref={(el) => (progressRef = el)} />)
    expect(progressRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<RingProgress className="custom-class" />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-ring-progress")
    expect(progress.className).toContain("custom-class")
  })

  it("renders track and fill circles", () => {
    const { container } = render(<RingProgress />)
    const circles = container.querySelectorAll("circle")
    expect(circles).toHaveLength(2)
  })
})
