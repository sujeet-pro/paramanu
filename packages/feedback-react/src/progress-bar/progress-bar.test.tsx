import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { ProgressBar } from "./progress-bar.js"

afterEach(cleanup)

describe("ProgressBar", () => {
  it("renders with role=progressbar", () => {
    render(<ProgressBar />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<ProgressBar />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("pm-progress-bar")
    expect(bar.className).toContain("pm-progress-bar--md")
    expect(bar.className).toContain("pm-progress-bar--primary")
  })

  it("applies size class", () => {
    render(<ProgressBar size="lg" />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("pm-progress-bar--lg")
  })

  it("applies variant class", () => {
    render(<ProgressBar variant="success" />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("pm-progress-bar--success")
  })

  it("sets aria-valuenow, aria-valuemin, aria-valuemax", () => {
    render(<ProgressBar value={50} min={0} max={100} />)
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveAttribute("aria-valuenow", "50")
    expect(bar).toHaveAttribute("aria-valuemin", "0")
    expect(bar).toHaveAttribute("aria-valuemax", "100")
  })

  it("calculates fill width percentage", () => {
    const { container } = render(<ProgressBar value={75} min={0} max={100} />)
    const fill = container.querySelector(".pm-progress-bar__fill") as HTMLElement
    expect(fill.style.width).toBe("75%")
  })

  it("omits aria-valuenow when indeterminate", () => {
    render(<ProgressBar indeterminate />)
    const bar = screen.getByRole("progressbar")
    expect(bar).not.toHaveAttribute("aria-valuenow")
  })

  it("does not set fill width when indeterminate", () => {
    const { container } = render(<ProgressBar indeterminate />)
    const fill = container.querySelector(".pm-progress-bar__fill") as HTMLElement
    expect(fill.style.width).toBe("")
  })

  it("applies striped class", () => {
    render(<ProgressBar striped />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("pm-progress-bar--striped")
  })

  it("applies animated class", () => {
    render(<ProgressBar animated />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("pm-progress-bar--animated")
  })

  it("forwards ref", () => {
    let barRef: HTMLDivElement | null = null
    render(<ProgressBar ref={(el) => (barRef = el)} />)
    expect(barRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<ProgressBar className="custom-class" />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("pm-progress-bar")
    expect(bar.className).toContain("custom-class")
  })
})
