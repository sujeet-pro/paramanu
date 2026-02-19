import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Progress } from "./progress-bar.js"

afterEach(cleanup)

describe("Progress", () => {
  it("renders with role=progressbar", () => {
    render(<Progress />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Progress />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("pm-progress")
    expect(bar.className).toContain("pm-progress--md")
    expect(bar.className).toContain("pm-progress--primary")
  })

  it("applies size class", () => {
    render(<Progress size="lg" />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("pm-progress--lg")
  })

  it("applies variant class", () => {
    render(<Progress variant="success" />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("pm-progress--success")
  })

  it("sets aria-valuenow, aria-valuemin, aria-valuemax", () => {
    render(<Progress value={50} min={0} max={100} />)
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveAttribute("aria-valuenow", "50")
    expect(bar).toHaveAttribute("aria-valuemin", "0")
    expect(bar).toHaveAttribute("aria-valuemax", "100")
  })

  it("calculates fill width percentage", () => {
    const { container } = render(<Progress value={75} min={0} max={100} />)
    const fill = container.querySelector(".pm-progress__fill") as HTMLElement
    expect(fill.style.width).toBe("75%")
  })

  it("omits aria-valuenow when indeterminate", () => {
    render(<Progress indeterminate />)
    const bar = screen.getByRole("progressbar")
    expect(bar).not.toHaveAttribute("aria-valuenow")
  })

  it("does not set fill width when indeterminate", () => {
    const { container } = render(<Progress indeterminate />)
    const fill = container.querySelector(".pm-progress__fill") as HTMLElement
    expect(fill.style.width).toBe("")
  })

  it("applies striped class", () => {
    render(<Progress striped />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("pm-progress--striped")
  })

  it("applies animated class", () => {
    render(<Progress animated />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("pm-progress--animated")
  })

  it("forwards ref", () => {
    let barRef: HTMLDivElement | null = null
    render(<Progress ref={(el) => (barRef = el)} />)
    expect(barRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Progress className="custom-class" />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toContain("pm-progress")
    expect(bar.className).toContain("custom-class")
  })
})
