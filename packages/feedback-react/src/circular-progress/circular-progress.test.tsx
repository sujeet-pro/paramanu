import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { CircularProgress } from "./circular-progress.js"

afterEach(cleanup)

describe("CircularProgress", () => {
  it("renders with role=progressbar", () => {
    render(<CircularProgress />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<CircularProgress />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-circular-progress")
    expect(progress.className).toContain("pm-circular-progress--md")
    expect(progress.className).toContain("pm-circular-progress--primary")
  })

  it("applies size class", () => {
    render(<CircularProgress size="lg" />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-circular-progress--lg")
  })

  it("applies variant class", () => {
    render(<CircularProgress variant="success" />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-circular-progress--success")
  })

  it("contains an SVG element", () => {
    const { container } = render(<CircularProgress />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("sets aria-valuenow, aria-valuemin, aria-valuemax", () => {
    render(<CircularProgress value={60} min={0} max={100} />)
    const progress = screen.getByRole("progressbar")
    expect(progress).toHaveAttribute("aria-valuenow", "60")
    expect(progress).toHaveAttribute("aria-valuemin", "0")
    expect(progress).toHaveAttribute("aria-valuemax", "100")
  })

  it("omits aria-valuenow when indeterminate", () => {
    render(<CircularProgress indeterminate />)
    const progress = screen.getByRole("progressbar")
    expect(progress).not.toHaveAttribute("aria-valuenow")
  })

  it("applies indeterminate class", () => {
    render(<CircularProgress indeterminate />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-circular-progress--indeterminate")
  })

  it("forwards ref", () => {
    let progressRef: HTMLDivElement | null = null
    render(<CircularProgress ref={(el) => (progressRef = el)} />)
    expect(progressRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<CircularProgress className="custom-class" />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-circular-progress")
    expect(progress.className).toContain("custom-class")
  })

  it("renders track and fill circles", () => {
    const { container } = render(<CircularProgress />)
    const circles = container.querySelectorAll("circle")
    expect(circles).toHaveLength(2)
  })
})
