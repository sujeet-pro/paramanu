import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { NProgress } from "./nprogress.js"

afterEach(cleanup)

describe("NProgress", () => {
  it("renders with role=progressbar", () => {
    render(<NProgress />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<NProgress />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-nprogress")
  })

  it("applies active class", () => {
    render(<NProgress active />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-nprogress--active")
  })

  it("sets bar width based on value", () => {
    const { container } = render(<NProgress value={0.5} />)
    const bar = container.querySelector(".pm-nprogress__bar") as HTMLElement
    expect(bar.style.width).toBe("50%")
  })

  it("sets aria-valuenow based on value", () => {
    render(<NProgress value={0.75} />)
    const progress = screen.getByRole("progressbar")
    expect(progress).toHaveAttribute("aria-valuenow", "75")
  })

  it("sets aria-valuemin and aria-valuemax", () => {
    render(<NProgress />)
    const progress = screen.getByRole("progressbar")
    expect(progress).toHaveAttribute("aria-valuemin", "0")
    expect(progress).toHaveAttribute("aria-valuemax", "100")
  })

  it("renders bar and peg elements", () => {
    const { container } = render(<NProgress />)
    expect(container.querySelector(".pm-nprogress__bar")).toBeInTheDocument()
    expect(container.querySelector(".pm-nprogress__peg")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let progressRef: HTMLDivElement | null = null
    render(<NProgress ref={(el) => (progressRef = el)} />)
    expect(progressRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<NProgress className="custom-class" />)
    const progress = screen.getByRole("progressbar")
    expect(progress.className).toContain("pm-nprogress")
    expect(progress.className).toContain("custom-class")
  })

  it("defaults value to 0", () => {
    const { container } = render(<NProgress />)
    const bar = container.querySelector(".pm-nprogress__bar") as HTMLElement
    expect(bar.style.width).toBe("0%")
  })
})
